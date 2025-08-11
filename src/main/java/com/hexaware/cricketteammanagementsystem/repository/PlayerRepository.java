package com.hexaware.cricketteammanagementsystem.repository;

import com.hexaware.cricketteammanagementsystem.entity.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{
	List<Player> findAllByOrderByJerseyNumberAsc();

}
