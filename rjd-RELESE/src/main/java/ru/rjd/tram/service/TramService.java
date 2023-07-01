package ru.rjd.tram.service;

import ru.rjd.tram.entity.Tram;
import java.util.List;

public interface TramService {
    List<Tram> getAllTrams();

    void saveTram(Tram tram);

    Tram getTram(int id);

    void deleteTram(int id);
}
