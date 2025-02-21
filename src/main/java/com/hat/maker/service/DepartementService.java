package com.hat.maker.service;

import com.hat.maker.model.Departement;
import com.hat.maker.repository.DepartementRespository;
import com.hat.maker.service.dto.DepartementDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartementService {
    private final DepartementRespository departementRespository;

    @Transactional
    public DepartementDTO createDepartement(DepartementDTO departementDTO) {
        if (departementRespository.existsByNomIgnoreCaseAndIsNotDeleted(departementDTO.getNom())) {
            throw new IllegalArgumentException("Un département avec ce nom existe déjà");
        }
        ValidationService.validerDepartementFields(departementDTO);

        Departement departement = Departement.builder()
                .nom(departementDTO.getNom())
                .deleted(false)
                .build();
        Departement departementRetour = departementRespository.save(departement);
        return DepartementDTO.toDepartementDTO(departementRetour);
    }

    public DepartementDTO modifierDepartement(DepartementDTO departementDTO) {
        if (departementRespository.existsByNomIgnoreCaseAndIsNotDeleted(departementDTO.getNom()) &&
            !departementDTO.getNom().equals(getDepartementById(departementDTO.getId()).getNom())) {
            throw new IllegalArgumentException("Un département avec ce nom existe déjà");
        }
        ValidationService.validerDepartementFields(departementDTO);

        Departement departement = getDepartementById(departementDTO.getId());
        departement.setNom(departementDTO.getNom());
        return DepartementDTO.toDepartementDTO(departementRespository.save(departement));
    }

    public DepartementDTO supprimerDepartement(DepartementDTO departementDTO) {
        Departement departement = getDepartementById(departementDTO.getId());
        departement.setDeleted(true);
        return DepartementDTO.toDepartementDTO(departementRespository.save(departement));
    }

    public List<DepartementDTO> getAllDepartement() {
        return departementRespository.findAll().stream()
                .map(DepartementDTO::toDepartementDTO)
                .toList();
    }

    private Departement getDepartementById(Long id) {
        return departementRespository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Le département n'existe pas"));
    }
}
