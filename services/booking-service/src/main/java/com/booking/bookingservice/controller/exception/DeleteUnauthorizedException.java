package com.booking.bookingservice.controller.exception;

public class DeleteUnauthorizedException extends RuntimeException {
    String description;

    public DeleteUnauthorizedException(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
