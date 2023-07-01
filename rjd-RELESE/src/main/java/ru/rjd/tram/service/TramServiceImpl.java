package ru.rjd.tram.service;

import ru.rjd.tram.dao.TramRepository;
import ru.rjd.tram.entity.Tram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TramServiceImpl implements TramService {
    @Autowired
    private TramRepository tramRepository;

    @Override
    public List<Tram> getAllTrams() {
        return tramRepository.findAll();
    }

    @Override
    public void saveTram(Tram tram) {
        tramRepository.save(tram);
    }

    @Override
    public Tram getTram(int id) {
        Optional<Tram> tram = tramRepository.findById(id);
        return tram.orElse(null);
    }

    @Override
    public void deleteTram(int id) {
        tramRepository.deleteById(id);
    }
}
