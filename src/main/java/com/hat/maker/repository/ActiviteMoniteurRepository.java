package com.hat.maker.repository;

import com.hat.maker.model.ActiviteMoniteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiviteMoniteurRepository extends JpaRepository<ActiviteMoniteur, Long> {
}
