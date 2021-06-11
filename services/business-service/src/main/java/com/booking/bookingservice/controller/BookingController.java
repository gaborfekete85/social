package com.booking.bookingservice.controller;

import com.booking.bookingservice.controller.domain.AvailabilityCheck;
import com.booking.bookingservice.controller.domain.DeleteRequest;
import com.booking.bookingservice.controller.domain.FilterRequest;
import com.booking.bookingservice.controller.domain.booking.BookingApi;
import com.booking.bookingservice.controller.domain.booking.BookingTime;
import com.booking.bookingservice.controller.domain.booking.Functionality;
import com.booking.bookingservice.controller.domain.booking.Service;
import com.booking.bookingservice.controller.exception.DeleteUnauthorizedException;
import com.booking.bookingservice.controller.util.EmailUtil;
import com.booking.bookingservice.model.User;
import com.booking.bookingservice.model.booking.Booking;
import com.booking.bookingservice.repository.BookingRepository;
import com.booking.bookingservice.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingRepository bookingRepository;

//    @Value("${app.publicEndpoint}")
//    private String publicEndpoint;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @PostMapping
    public BookingApi newBooking(@RequestBody BookingApi booking) {
        logger.info("Booking: {}", booking);
        AvailabilityCheck ac = new AvailabilityCheck();
        ac.setStart(booking.getBookingTime());
        ac.setLength(Long.valueOf(booking.getFunctionality().getLength()));
        ac.setGroupId(booking.getService().getId());
        if(this.findClashingBookings(ac).isEmpty()) {
            BookingApi toReturn = this.mapToApiResponse(bookingRepository.save(this.mapApiToModel(booking)));
            String[] to = { toReturn.getUser().getEmail() }; // list of recipient email addresses
            String subject = "Booking confirmation";
            String body = String.format("" +
                    "<div style=\"padding:30px; text-align: center;\">" +
                    "<h1><b>You have successfully booked !</b></h1><br/>" +
                    "<img style=\"width:250px; height: 250px\" src=\"https://images.vexels.com/media/users/3/129818/isolated/preview/de08e27e937857713fbd0dceb27c79dc-clock-circle-icon-by-vexels.png\" />" +
                    "</div><div style=\"padding:30px;\"><br/>Booking time: %s<hr/>" +
                    "<br/>Place: %s" +
                    "<br/>Selected Service: %s" +
                    "<br/>Address: %s" +
                    "<br/>Contact email: %s" +
                    "<br/>Contact phone: %s" +
                    "<br/>Web: %s" +
                    "<br/><br/>Wish the bests ! <br/>Booker Team !" +
                    "</div>", toReturn.getBookingTime().format(formatter), booking.getService().getName(), toReturn.getFunctionality().getName() + "(" + toReturn.getFunctionality().getLength() + " min, " + toReturn.getFunctionality().getPrice() + " " + toReturn.getFunctionality().getSymbol() + ")", toReturn.getService().getAddress(), booking.getService().getEmail(), toReturn.getService().getPhone(), toReturn.getService().getWeb());
            EmailUtil.sendFromGMail(to, subject, body);
            return toReturn;
        }
        throw new RuntimeException("This period is already booked. ");
    }

    @DeleteMapping
    public DeleteRequest remove(@RequestBody DeleteRequest deleteRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("Booking: {}", deleteRequest);
        Booking booking = bookingRepository.findById(UUID.fromString(deleteRequest.getId())).get();
        if(booking.getUserEmail().equals(userDetails.getUsername())) {
            bookingRepository.deleteById(UUID.fromString(deleteRequest.getId()));
        } else {
            throw new DeleteUnauthorizedException("You are not allowed to delete this item.");
        }
        return deleteRequest;
    }

    @PostMapping("/findByEmail")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> findByEmail(@RequestBody FilterRequest filterRequest) {
        logger.info("Request: {}", filterRequest);
        return bookingRepository.findByUserEmail(filterRequest.getId());
    }

    @PostMapping("/findByGroup")
    public List<BookingApi> findByGroup(@RequestBody FilterRequest filterRequest) {
        logger.info("Booking: {}", filterRequest);
        return bookingRepository.findByBookingGroupId(filterRequest.getId()).stream().map(x -> this.mapToApiResponse(x)).collect(Collectors.toList());
    }

    @PostMapping("/findClashingBookings")
    public List<Booking> findClashingBookings(@RequestBody AvailabilityCheck availabilityCheck) {
        logger.info("Booking: {}", availabilityCheck);
        availabilityCheck.setStart(availabilityCheck.getStart().withSecond(0));
        return bookingRepository.findClashingBookings(availabilityCheck.getStart(), availabilityCheck.getStart().plusMinutes(availabilityCheck.getLength()), availabilityCheck.getGroupId());
    }

    @PostMapping("/nextAvailable")
    public
    AvailabilityCheck findNextAvailable(@RequestBody AvailabilityCheck availabilityCheck) {
        logger.info("Booking: {}", availabilityCheck);
        availabilityCheck.setStart(availabilityCheck.getStart().withSecond(0));

        LocalDateTime nextAvailable = availabilityCheck.getStart();
        logger.info("Start: {}, End: {}", nextAvailable, nextAvailable.plusMinutes(availabilityCheck.getLength()));
        List<Booking> clashes = bookingRepository.findClashingBookings(nextAvailable, nextAvailable.plusMinutes(availabilityCheck.getLength()), availabilityCheck.getGroupId());

        while(clashes.size() != 0) {
            nextAvailable = clashes.get(0).getEnd();
            logger.info("Start: {}, End: {}", nextAvailable, nextAvailable.plusMinutes(availabilityCheck.getLength()));
            clashes = bookingRepository.findClashingBookings(nextAvailable, nextAvailable.plusMinutes(availabilityCheck.getLength()), availabilityCheck.getGroupId());
        }
        AvailabilityCheck toReturn = new AvailabilityCheck();
        toReturn.setStart(nextAvailable);
        toReturn.setWereClashing(!availabilityCheck.getStart().equals(nextAvailable));
        return toReturn;
    }

    private BookingApi mapToApiResponse(final Booking booking) {
        BookingTime bt = new BookingTime();
        if(booking.getStart() != null) {
            bt.setSeconds(booking.getStart().toEpochSecond(ZoneOffset.UTC));
            bt.setNanoseconds(0);
        }

        Functionality functionality = Functionality.builder().id(booking.getFunctionalityId()).length(booking.getLength()).name(booking.getName()).price(booking.getPrice()).serviceId(booking.getBookingGroupId()).symbol(booking.getSymbol()).build();

        User user = new User();
        if(booking.getUserId() != null) {
            user.setUserId(UUID.fromString(booking.getUserId()));
        }
        user.setEmail(booking.getUserEmail());
        user.setName(booking.getUserName());

        Service service = Service.builder().email(booking.getEmail()).address(booking.getAddress()).phone(booking.getPhone()).web(booking.getWeb()).furtherContact(booking.getFurtherContact()).build();

        return BookingApi.builder()
                .id(booking.getId().toString())
                .status(booking.getStatus())
                .bookingTime(booking.getStart()) // bt if epoc is preferred
                .functionality(functionality)
                .user(user)
                .service(service).build();
    }

    private Booking mapApiToModel(final BookingApi booking) {
        Booking bookingResponse = new Booking();
        bookingResponse.setFunctionalityId(booking.getFunctionality().getId());
        bookingResponse.setBookingGroupId(booking.getService().getId());
        // Booking name
        bookingResponse.setName(booking.getFunctionality().getName());
        // if epoch is given
        //LocalDateTime bookingStart = Instant.ofEpochMilli(booking.getBookingTime().getSeconds()).atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime bookingStart = booking.getBookingTime().withSecond(0);
        bookingResponse.setStart(bookingStart);
        // Functionality
        bookingResponse.setEnd(bookingStart.plusMinutes(booking.getFunctionality().getLength()));
        bookingResponse.setLength(booking.getFunctionality().getLength());
        bookingResponse.setPrice(booking.getFunctionality().getPrice());
        bookingResponse.setSymbol(booking.getFunctionality().getSymbol());
        bookingResponse.setStatus(booking.getStatus());
        // User data
        UserPrincipal principal = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        bookingResponse.setUserId(principal.getUserId().toString());
        bookingResponse.setUserName(principal.getName());
        bookingResponse.setUserEmail(principal.getEmail());
        // Service
        bookingResponse.setAddress(booking.getService().getAddress());
        bookingResponse.setPhone(booking.getService().getPhone());
        bookingResponse.setEmail(booking.getService().getEmail());
        bookingResponse.setWeb(booking.getService().getWeb());
        bookingResponse.setFurtherContact("");
        return bookingResponse;
    }
}
