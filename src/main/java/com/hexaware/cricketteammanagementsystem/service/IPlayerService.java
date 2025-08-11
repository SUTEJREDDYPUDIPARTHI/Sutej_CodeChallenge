package com.hexaware.cricketteammanagementsystem.service;

import java.util.List;

import com.hexaware.cricketteammanagementsystem.dto.PlayerDTO;

public interface IPlayerService {
    List<PlayerDTO> getAllPlayers();
    PlayerDTO createPlayer(PlayerDTO dto);
    PlayerDTO getPlayerById(Long id);
    List<PlayerDTO> getPlayersByName(String playerName);
    PlayerDTO updatePlayer(Long id, PlayerDTO dto);
    void deletePlayer(Long id);
}
