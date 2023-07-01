package ru.rjd.tram.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "trams")
public class Tram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int Id;

    @Column(name = "code")
    private String Code;

    @Column(name = "name")
    private String Name;
}
