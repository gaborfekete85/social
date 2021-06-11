package com.booking.bookingservice.controller;

import com.booking.bookingservice.controller.domain.FilterRequest;
import com.booking.bookingservice.model.booking.Booking;
import com.booking.bookingservice.repository.BookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SampleController {

    private static final Logger logger = LoggerFactory.getLogger(SampleController.class);

    @Autowired
    private BookingRepository bookingRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @PostMapping("/test")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> test(@RequestBody FilterRequest filterRequest) {
        logger.info("Request: {}", filterRequest);
        return bookingRepository.findByUserEmail(filterRequest.getId());
    }
}
