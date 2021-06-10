package com.booking.bookingservice.model.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id")
    private UUID id;

    @Column(name="functionality_id")
    private String functionalityId;

    @Column(name="booking_group_id")
    private String bookingGroupId;

    @Column(name="name")
    private String name;

    @Column(name="start_booking")
    private LocalDateTime start;

    @Column(name="end_booking")
    private LocalDateTime end;

    @Column(name="length")
    private int length;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="symbol")
    private String symbol;

    @Column(name="status")
    private String status;

    @Column(name="user_id")
    private String userId;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_name")
    private String userName;

    @Column(name="address")
    private String address;

    @Column(name="phone")
    private String phone;

    @Column(name="email")
    private String email;

    @Column(name="web")
    private String web;

    @Column(name="further_contact")
    private String furtherContact;

}
