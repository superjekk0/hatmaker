package com.hat.maker.service;

import com.hat.maker.model.Groupe;
import com.hat.maker.repository.GroupeRepository;
import com.hat.maker.service.dto.GroupeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupeService {
    private final GroupeRepository groupeRepository;

    public GroupeDTO createGroupe(GroupeDTO groupeDTO) {
        if (groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(groupeDTO.getNom())) {
            throw new IllegalArgumentException("Un groupe avec ce nom existe déjà");
        }
        ValidationService.validerGroupeFields(groupeDTO);

        Groupe groupe = Groupe.builder()
                .nom(groupeDTO.getNom())
                .deleted(false)
                .build();
        Groupe groupeRetour = groupeRepository.save(groupe);
        return GroupeDTO.toGroupeDTO(groupeRetour);
    }

    public GroupeDTO modifierGroupe(GroupeDTO groupeDTO) {
        if (groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(groupeDTO.getNom()) &&
            !groupeDTO.getNom().equals(getGroupeById(groupeDTO.getId()).getNom())) {
            throw new IllegalArgumentException("Un groupe avec ce nom existe déjà");
        }
        ValidationService.validerGroupeFields(groupeDTO);

        Groupe groupe = getGroupeById(groupeDTO.getId());
        groupe.setNom(groupeDTO.getNom());
        return GroupeDTO.toGroupeDTO(groupeRepository.save(groupe));
    }

    public GroupeDTO supprimerGroupe(GroupeDTO groupeDTO) {
        Groupe groupe = getGroupeById(groupeDTO.getId());
        groupe.setDeleted(true);
        return GroupeDTO.toGroupeDTO(groupeRepository.save(groupe));
    }

    public List<GroupeDTO> getAllGroupe() {
        return groupeRepository.findAll().stream()
                .map(GroupeDTO::toGroupeDTO)
                .toList();
    }

    public Groupe getGroupeById(Long id) {
        return groupeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Le groupe n'existe pas"));
    }
}
