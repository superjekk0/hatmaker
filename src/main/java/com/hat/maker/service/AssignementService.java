package com.hat.maker.service;

import com.hat.maker.model.Assignement;
import com.hat.maker.repository.AssignementRepository;
import com.hat.maker.service.dto.AssignementDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignementService {
    private final AssignementRepository assignementRepository;

    public List<Assignement> sauvegarderAssignements(List<AssignementDTO> assignementsDTO) {
        List<Assignement> assignements = new ArrayList<>();

        for (AssignementDTO assignementDTO : assignementsDTO) {
            Assignement assignement;

            if (assignementDTO.getId() != null) {
                assignement = assignementRepository.findById(assignementDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Assignement not found with id: " + assignementDTO.getId()));

                assignement.setActivite(assignementDTO.getActivite());
                assignement.setPeriode(assignementDTO.getPeriode());
                assignement.setCampeurs(assignementDTO.getCampeurs());
                assignement.setLimite(assignementDTO.getLimite());
            } else {
                assignement = Assignement.builder()
                        .activite(assignementDTO.getActivite())
                        .periode(assignementDTO.getPeriode())
                        .campeurs(assignementDTO.getCampeurs())
                        .limite(assignementDTO.getLimite())
                        .build();
            }
            assignements.add(assignementRepository.save(assignement));
        }

        return assignements;
    }
}