package com.hat.maker.service.dto;

import com.hat.maker.model.Assignement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignementDTO {
    private Long id;
    private String periode;
    private String activite;
    private int limite;
    private List<String> campeurs;

    public static List<AssignementDTO> toAssignementsDTO(List<Assignement> entity) {
        return entity.stream()
                .map(assignement -> AssignementDTO.builder()
                        .id(assignement.getId())
                        .periode(assignement.getPeriode())
                        .activite(assignement.getActivite())
                        .campeurs(assignement.getCampeurs())
                        .limite(assignement.getLimite())
                        .build())
                .toList();
    }
}