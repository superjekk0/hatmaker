package com.hat.maker.repository;

import com.hat.maker.model.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepository extends JpaRepository<Departement, Long> {
    @Query("SELECT " +
            "CASE WHEN COUNT(d) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM Departement d " +
            "WHERE LOWER(d.nom) = LOWER(:nom)" +
            "AND d.deleted = FALSE")
    boolean existsByNomIgnoreCaseAndIsNotDeleted(@Param("nom") String nom);
}