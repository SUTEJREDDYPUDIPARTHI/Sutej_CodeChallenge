package com.hexaware.cricketteammanagementsystem.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cricketteammanagementsystem.dto.PlayerDTO;
import com.hexaware.cricketteammanagementsystem.entity.Player;
import com.hexaware.cricketteammanagementsystem.exception.PlayerNotFoundException;
import com.hexaware.cricketteammanagementsystem.repository.PlayerRepository;

@Service
public class PlayerServiceImpl implements IPlayerService {

	@Autowired
    private PlayerRepository repository;

    private PlayerDTO toDTO(Player p) {
        PlayerDTO dto = new PlayerDTO();
        dto.setPlayerId(p.getPlayerId());
        dto.setPlayerName(p.getPlayerName());
        dto.setJerseyNumber(p.getJerseyNumber());
        dto.setRole(p.getRole());
        dto.setTotalMatches(p.getTotalMatches());
        dto.setTeamName(p.getTeamName());
        dto.setCountry(p.getCountry());
        dto.setDescription(p.getDescription());
        return dto;
    }

    private Player toEntity(PlayerDTO dto) {
        Player p = new Player();
        p.setPlayerName(dto.getPlayerName());
        p.setJerseyNumber(dto.getJerseyNumber());
        p.setRole(dto.getRole());
        p.setTotalMatches(dto.getTotalMatches());
        p.setTeamName(dto.getTeamName());
        p.setCountry(dto.getCountry());
        p.setDescription(dto.getDescription());
        return p;
    }
    
    @Override
    public PlayerDTO createPlayer(PlayerDTO dto) {
        Player p = toEntity(dto);
        Player saved = repository.save(p);
        return toDTO(saved);
    }

    @Override
    public List<PlayerDTO> getAllPlayers() {
        List<Player> players = repository.findAll();
        List<PlayerDTO> dtos = new ArrayList<>();
        for (Player p : players) {
            dtos.add(toDTO(p));
        }
        return dtos;
    }

    @Override
    public PlayerDTO getPlayerById(Long id) {
        Player p = repository.findById(id)
                .orElseThrow(() -> new 	PlayerNotFoundException("Player not found with id: " + id));
        return toDTO(p);
    }

    @Override
    public PlayerDTO updatePlayer(Long id, PlayerDTO dto) {
        Player existing = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + id));

        existing.setPlayerName(dto.getPlayerName());
        existing.setJerseyNumber(dto.getJerseyNumber());
        existing.setRole(dto.getRole());
        existing.setTotalMatches(dto.getTotalMatches());
        existing.setTeamName(dto.getTeamName());
        existing.setCountry(dto.getCountry());
        existing.setDescription(dto.getDescription());

        Player updated = repository.save(existing);
        return toDTO(updated);
    }

    @Override
    public void deletePlayer(Long id) {
        Player existing = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + id));
        repository.delete(existing);
    }
    
    @Override
    public List<PlayerDTO> getAllPlayersSortedByJerseyNumber() {
        List<Player> players = repository.findAllByOrderByJerseyNumberAsc();
        List<PlayerDTO> dtoList = new ArrayList<>();
        
        for (Player player : players) {
            PlayerDTO dto = new PlayerDTO();
            dto.setPlayerId(player.getPlayerId());
            dto.setPlayerName(player.getPlayerName());
            dto.setJerseyNumber(player.getJerseyNumber());
            dto.setRole(player.getRole());
            dto.setTotalMatches(player.getTotalMatches());
            dto.setTeamName(player.getTeamName());
            dto.setCountry(player.getCountry());
            dto.setDescription(player.getDescription());
            dtoList.add(dto);
        }

        return dtoList;
    }
}
