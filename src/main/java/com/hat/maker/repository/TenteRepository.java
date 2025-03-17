package com.hat.maker.repository;

import com.hat.maker.model.Tente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TenteRepository extends JpaRepository<Tente, Long> {
    @Query("SELECT " +
            "CASE WHEN COUNT(t) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM Tente t " +
            "WHERE LOWER(t.nomTente) = LOWER(:nom)" +
            "AND t.deleted = FALSE")
    boolean existsByNomIgnoreCaseAndIsNotDeleted(@Param("nom") String nom);

}
