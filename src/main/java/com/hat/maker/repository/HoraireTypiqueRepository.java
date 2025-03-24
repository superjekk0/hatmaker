package com.hat.maker.repository;

import com.hat.maker.model.HoraireTypique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraireTypiqueRepository extends JpaRepository<HoraireTypique, Long> {
}
