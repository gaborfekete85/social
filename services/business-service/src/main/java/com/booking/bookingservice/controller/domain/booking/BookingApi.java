package com.booking.bookingservice.controller.domain.booking;

import com.booking.bookingservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingApi {
    private String id;
    private LocalDateTime bookingTime;
    private Functionality functionality;
    private String status;
    private User user;
    private Service service;
}
