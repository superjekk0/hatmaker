package com.hat.maker.service;

import com.hat.maker.model.Assignement;
import com.hat.maker.repository.AssignementRepository;
import com.hat.maker.service.dto.AssignementDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignementService {
    private final AssignementRepository assignementRepository;

    public Assignement sauvegarderAssignement(AssignementDTO assignementDTO) {
        ValidationService.validerAssignementFields(assignementDTO);

        Assignement assignement;
        if (assignementDTO.getId() != null) {
            assignement = assignementRepository.findById(assignementDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Assignement not found with id: " + assignementDTO.getId()));

            assignement.setActivite(assignementDTO.getActivite());
            assignement.setPeriode(assignementDTO.getPeriode());
            assignement.setCampeurs(assignementDTO.getCampeurs());
            assignement.setDeleted(assignementDTO.isDeleted());
        } else {
            assignement = Assignement.builder()
                    .activite(assignementDTO.getActivite())
                    .periode(assignementDTO.getPeriode())
                    .campeurs(assignementDTO.getCampeurs())
                    .deleted(assignementDTO.isDeleted())
                    .build();
        }

        return assignementRepository.save(assignement);
    }
}