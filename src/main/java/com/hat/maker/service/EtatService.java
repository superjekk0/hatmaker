package com.hat.maker.service;

import com.hat.maker.model.Etat;
import com.hat.maker.repository.EtatRespository;
import com.hat.maker.service.dto.EtatDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EtatService {
    private final EtatRespository etatRespository;

    public EtatDTO createEtat(EtatDTO etatDTO) {
        if (etatRespository.existsByNomIgnoreCase(etatDTO.getNom())) {
            throw new IllegalArgumentException("Un état avec ce nom existe déjà");
        }
        ValidationService.validerEtatFields(etatDTO);

        Etat etat = Etat.builder()
                .nom(etatDTO.getNom())
                .build();
        Etat etatRetour = etatRespository.save(etat);
        return EtatDTO.toEtatDTO(etatRetour);
    }

    public List<EtatDTO> getAllEtat() {
        return etatRespository.findAll().stream()
                .map(EtatDTO::toEtatDTO)
                .toList();
    }
}
