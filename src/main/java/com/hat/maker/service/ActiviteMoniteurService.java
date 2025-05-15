package com.hat.maker.service;

import com.hat.maker.model.ActiviteMoniteur;
import com.hat.maker.repository.ActiviteMoniteurRepository;
import com.hat.maker.service.dto.ActiviteMoniteurDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActiviteMoniteurService {
    private final ActiviteMoniteurRepository activiteMoniteurRepository;

    public ActiviteMoniteurDTO createActiviteMoniteur(ActiviteMoniteurDTO activiteMoniteurDTO) {
        ValidationService.validerActiviteMoniteurFields(activiteMoniteurDTO);
        ActiviteMoniteur activiteMoniteur = ActiviteMoniteur.builder()
                .name(activiteMoniteurDTO.getName())
                .selectedPeriodes(activiteMoniteurDTO.getSelectedPeriodes())
                .selectedActivites(activiteMoniteurDTO.getSelectedActivites())
                .cells(activiteMoniteurDTO.getCells())
                .deleted(activiteMoniteurDTO.isDeleted())
                .build();
        ActiviteMoniteur savedActiviteMoniteur = activiteMoniteurRepository.save(activiteMoniteur);
        return ActiviteMoniteurDTO.toActiviteMoniteurDTO(savedActiviteMoniteur);
    }

    public ActiviteMoniteurDTO modifierActiviteMoniteur(ActiviteMoniteurDTO activiteMoniteurDTO) {
        ValidationService.validerActiviteMoniteurFields(activiteMoniteurDTO);

        ActiviteMoniteur activiteMoniteur = getActiviteMoniteurById(activiteMoniteurDTO.getId());
        activiteMoniteur.setName(activiteMoniteurDTO.getName());
        activiteMoniteur.setSelectedPeriodes(activiteMoniteurDTO.getSelectedPeriodes());
        activiteMoniteur.setSelectedActivites(activiteMoniteurDTO.getSelectedActivites());
        activiteMoniteur.setCells(activiteMoniteurDTO.getCells());
        activiteMoniteur.setDeleted(activiteMoniteurDTO.isDeleted());

        return ActiviteMoniteurDTO.toActiviteMoniteurDTO(activiteMoniteurRepository.save(activiteMoniteur));
    }

    public ActiviteMoniteurDTO supprimerActiviteMoniteur(ActiviteMoniteurDTO activiteMoniteurDTO) {
        ActiviteMoniteur activiteMoniteur = getActiviteMoniteurById(activiteMoniteurDTO.getId());
        activiteMoniteur.setDeleted(true);
        return ActiviteMoniteurDTO.toActiviteMoniteurDTO(activiteMoniteurRepository.save(activiteMoniteur));
    }

    public List<ActiviteMoniteurDTO> getAllActiviteMoniteur() {
        return activiteMoniteurRepository.findAll().stream()
                .map(ActiviteMoniteurDTO::toActiviteMoniteurDTO)
                .collect(Collectors.toList());
    }

    public ActiviteMoniteur getActiviteMoniteurById(Long id) {
        return activiteMoniteurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'activité moniteur n'existe pas"));
    }
}