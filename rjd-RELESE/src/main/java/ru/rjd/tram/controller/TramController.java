package ru.rjd.tram.controller;

import ru.rjd.tram.entity.Tram;
import ru.rjd.tram.exception.NoTramInDBException;
import ru.rjd.tram.service.TramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class TramController {
    @Autowired
    private TramService tramService;

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @GetMapping("/trams")
    public List<Tram> showAllTrams() {
        return tramService.getAllTrams();
    }

    @GetMapping("/trams/{id}")
    public Tram getTram(@PathVariable int id) {
        Tram tram = tramService.getTram(id);
        if(tram == null) {
            throw new NoTramInDBException("There is no Tram with ID = " + id + " in DataBase");
        }
        return tram;
    }

    @PostMapping("/trams")
    public Tram addNewTram(@RequestBody Tram tram) {
        tramService.saveTram(tram);
        return tram;
    }

    @PutMapping("/trams/{id}")
    public Tram updateTram(@RequestBody Tram tram) {
        tramService.saveTram(tram);
        return tram;
    }

    @DeleteMapping("/trams/{id}")
    public String deleteTram(@PathVariable int id) {
        Tram tram = tramService.getTram(id);
        if(tram == null) {
            throw new NoTramInDBException("There is no Tram with ID = " + id + " in DataBase");
        }
        tramService.deleteTram(id);
        return "Tram with ID = " + id + " was deleted";
    }
}
