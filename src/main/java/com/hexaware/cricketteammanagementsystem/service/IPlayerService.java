package com.hexaware.cricketteammanagementsystem.service;

import com.hexaware.cricketteammanagementsystem.dto.PlayerDTO;

import java.util.List;

public interface IPlayerService {
    List<PlayerDTO> getAllPlayers();
    PlayerDTO createPlayer(PlayerDTO dto);
    PlayerDTO getPlayerById(Long id);
    PlayerDTO updatePlayer(Long id, PlayerDTO dto);
    void deletePlayer(Long id);
    List<PlayerDTO> getAllPlayersSortedByJerseyNumber();
}
