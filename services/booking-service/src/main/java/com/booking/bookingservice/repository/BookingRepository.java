package com.booking.bookingservice.repository;

import com.booking.bookingservice.model.booking.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByEmail(String email);
    List<Booking> findByUserEmail(String email);
    List<Booking> findByBookingGroupId(String email);
    @Query("SELECT b FROM Booking b WHERE b.bookingGroupId = :bookingGroupId AND (b.end > :begin OR b.start < :end) AND b.start < :end AND b.end > :begin order by b.start desc")
    List<Booking> findClashingBookings(@Param("begin") LocalDateTime begin, @Param("end") LocalDateTime end, @Param("bookingGroupId") String bookingGroupId);
}
