package com.hat.maker.repository;

import com.hat.maker.model.Campeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampeurRespository extends JpaRepository<Campeur, Long> {

}
