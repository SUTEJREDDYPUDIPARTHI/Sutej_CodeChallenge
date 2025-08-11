package com.hexaware.cricketteammanagementsystem.controller;

import com.hexaware.cricketteammanagementsystem.dto.PlayerDTO;
import com.hexaware.cricketteammanagementsystem.service.IPlayerService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

	@Autowired
    private IPlayerService service;
    
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public PlayerDTO createPlayer(@Valid @RequestBody PlayerDTO dto) {
        return service.createPlayer(dto);
    }

    @GetMapping("/getall")
    public List<PlayerDTO> getAllPlayers() {
        return service.getAllPlayers();
    }

    @GetMapping("/getbyid/{playerId}")
    public PlayerDTO getPlayerById(@PathVariable Long playerId) {
        return service.getPlayerById(playerId);
    }
    
    @GetMapping("/name/{playerName}")
    public List<PlayerDTO> getPlayersByName(@PathVariable String playerName) {
        return service.getPlayersByName(playerName);
    }

    @PutMapping("/update/{playerId}")
    public PlayerDTO updatePlayer(@PathVariable Long playerId, @Valid @RequestBody PlayerDTO dto) {
        return service.updatePlayer(playerId, dto);
    }

    @DeleteMapping("/delete/{playerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlayer(@PathVariable Long playerId) {
        service.deletePlayer(playerId);
    }

}
