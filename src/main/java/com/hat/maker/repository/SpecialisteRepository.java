package com.hat.maker.repository;

import com.hat.maker.model.Specialiste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialisteRepository extends JpaRepository<Specialiste, Long> {
}
