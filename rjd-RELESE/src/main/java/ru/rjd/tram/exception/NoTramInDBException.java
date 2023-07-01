package ru.rjd.tram.exception;

public class NoTramInDBException extends RuntimeException {
    public NoTramInDBException(String message) {
        super(message);
    }
}
