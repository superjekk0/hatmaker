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
                .deleted(false)
                .build();
        Etat etatRetour = etatRespository.save(etat);
        return EtatDTO.toEtatDTO(etatRetour);
    }

    public EtatDTO modifierEtat(EtatDTO etatDTO) {
        ValidationService.validerEtatFields(etatDTO);
        Etat etat = getEtatById(etatDTO.getId());
        etat.setNom(etatDTO.getNom());
        return EtatDTO.toEtatDTO(etatRespository.save(etat));
    }

    public EtatDTO supprimerEtat(EtatDTO etatDTO) {
        Etat etat = getEtatById(etatDTO.getId());
        etat.setDeleted(true);
        return EtatDTO.toEtatDTO(etatRespository.save(etat));
    }

    public List<EtatDTO> getAllEtat() {
        return etatRespository.findAll().stream()
                .map(EtatDTO::toEtatDTO)
                .toList();
    }

    private Etat getEtatById(Long id) {
        return etatRespository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'état n'existe pas"));
    }
}
