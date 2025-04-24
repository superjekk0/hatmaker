package com.hat.maker.repository;

import com.hat.maker.model.HoraireJournaliere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraireJournaliereRepository extends JpaRepository<HoraireJournaliere, Long> {
}