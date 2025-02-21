package com.hat.maker.repository;

import com.hat.maker.model.Activite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiviteRespository extends JpaRepository<Activite, Long> {
    @Query("SELECT " +
            "CASE WHEN COUNT(a) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM Activite a " +
            "WHERE LOWER(a.nom) = LOWER(:nom)")
    boolean existsByNomIgnoreCase(@Param("nom") String nom);
}