package com.hat.maker.service;

import com.hat.maker.model.Activite;
import com.hat.maker.repository.ActiviteRespository;
import com.hat.maker.service.dto.ActiviteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActiviteService {
    private final ActiviteRespository activiteRepository;

    public ActiviteDTO createActivite(ActiviteDTO activiteDTO) {
        if (activiteRepository.existsByNomIgnoreCaseAndIsNotDeleted(activiteDTO.getNom())) {
            throw new IllegalArgumentException("Une activité avec ce nom existe déjà");
        }
        ValidationService.validerActiviteFields(activiteDTO);

        Activite activite = Activite.builder()
                .nom(activiteDTO.getNom())
                .deleted(false)
                .build();
        Activite activiteRetour = activiteRepository.save(activite);
        return ActiviteDTO.toActiviteDTO(activiteRetour);
    }

    public ActiviteDTO modifierActivite(ActiviteDTO activiteDTO) {
        if (activiteRepository.existsByNomIgnoreCaseAndIsNotDeleted(activiteDTO.getNom()) &&
            !activiteDTO.getNom().equals(getActiviteById(activiteDTO.getId()).getNom())) {
            throw new IllegalArgumentException("Une activité avec ce nom existe déjà");
        }
        ValidationService.validerActiviteFields(activiteDTO);

        Activite activite = getActiviteById(activiteDTO.getId());
        activite.setNom(activiteDTO.getNom());
        return ActiviteDTO.toActiviteDTO(activiteRepository.save(activite));
    }

    public ActiviteDTO supprimerActivite(ActiviteDTO activiteDTO) {
        Activite activite = getActiviteById(activiteDTO.getId());
        activite.setDeleted(true);
        return ActiviteDTO.toActiviteDTO(activiteRepository.save(activite));
    }

    public List<ActiviteDTO> getAllActivite() {
        return activiteRepository.findAll().stream()
                .map(ActiviteDTO::toActiviteDTO)
                .toList();
    }

    private Activite getActiviteById(Long id) {
        return activiteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'activité n'existe pas"));
    }
}