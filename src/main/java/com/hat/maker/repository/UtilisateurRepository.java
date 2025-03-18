package com.hat.maker.repository;

import com.hat.maker.model.Moniteur;
import com.hat.maker.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    @Query("select u from Utilisateur u where trim(lower(u.credentials.courriel)) = :courriel and not u.deleted")
    Optional<Utilisateur> findUtilisateurByCourriel(@Param("courriel") String courriel);

    @Query("select count(u) > 0 from Utilisateur u where trim(lower(u.credentials.courriel)) = :courriel and not u.deleted")
    Boolean existsByCourriel(String courriel);

    @Query("select u from Utilisateur u where not u.deleted and u.credentials.role = 'MONITEUR'")
    List<Moniteur> findAllByCredentialsMoniteur();

}
