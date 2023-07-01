package ru.rjd.tram.dao;

import ru.rjd.tram.entity.Tram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TramRepository extends JpaRepository <Tram, Integer> {

}
