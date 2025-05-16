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
    private List<String> campeurs;
    private boolean deleted;

    public static AssignementDTO toAssignementDTO(Assignement entity) {
        return AssignementDTO.builder()
                .id(entity.getId())
                .periode(entity.getPeriode())
                .activite(entity.getActivite())
                .campeurs(entity.getCampeurs())
                .deleted(entity.isDeleted())
                .build();
    }
}