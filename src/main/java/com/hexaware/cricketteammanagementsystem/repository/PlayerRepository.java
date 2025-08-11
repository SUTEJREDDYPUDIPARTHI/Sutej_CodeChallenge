package com.hexaware.cricketteammanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cricketteammanagementsystem.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{
	

}
