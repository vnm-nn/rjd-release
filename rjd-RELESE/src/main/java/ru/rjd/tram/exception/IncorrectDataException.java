package ru.rjd.tram.exception;

import lombok.Data;

@Data
public class IncorrectDataException {
    private String info;
    public IncorrectDataException() {}
}
