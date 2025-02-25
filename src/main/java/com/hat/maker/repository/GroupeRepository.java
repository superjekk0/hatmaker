package com.hat.maker.repository;

import com.hat.maker.model.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    @Query("SELECT " +
            "CASE WHEN COUNT(g) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM Groupe g " +
            "WHERE LOWER(g.nom) = LOWER(:nom)" +
            "AND g.deleted = FALSE")
    boolean existsByNomIgnoreCaseAndIsNotDeleted(@Param("nom") String nom);
}