package com.hat.maker.service;

import com.hat.maker.model.Etat;
import com.hat.maker.repository.EtatRepository;
import com.hat.maker.service.dto.EtatDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EtatService {
    private final EtatRepository etatRepository;

    public EtatDTO createEtat(EtatDTO etatDTO) {
        if (etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(etatDTO.getNom())) {
            throw new IllegalArgumentException("Un état avec ce nom existe déjà");
        }
        ValidationService.validerEtatFields(etatDTO);

        Etat etat = Etat.builder()
                .nom(etatDTO.getNom())
                .deleted(false)
                .build();
        Etat etatRetour = etatRepository.save(etat);
        return EtatDTO.toEtatDTO(etatRetour);
    }

    public EtatDTO modifierEtat(EtatDTO etatDTO) {
        if (etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(etatDTO.getNom()) &&
            !etatDTO.getNom().equals(getEtatById(etatDTO.getId()).getNom())) {
            throw new IllegalArgumentException("Un état avec ce nom existe déjà");
        }
        ValidationService.validerEtatFields(etatDTO);

        Etat etat = getEtatById(etatDTO.getId());
        etat.setNom(etatDTO.getNom());
        return EtatDTO.toEtatDTO(etatRepository.save(etat));
    }

    public EtatDTO supprimerEtat(EtatDTO etatDTO) {
        Etat etat = getEtatById(etatDTO.getId());
        etat.setDeleted(true);
        return EtatDTO.toEtatDTO(etatRepository.save(etat));
    }

    public List<EtatDTO> getAllEtat() {
        return etatRepository.findAll().stream()
                .map(EtatDTO::toEtatDTO)
                .toList();
    }

    private Etat getEtatById(Long id) {
        return etatRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'état n'existe pas"));
    }
}
