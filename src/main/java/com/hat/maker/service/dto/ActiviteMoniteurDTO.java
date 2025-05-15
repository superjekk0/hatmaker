package com.hat.maker.service.dto;

import com.hat.maker.model.ActiviteMoniteur;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActiviteMoniteurDTO {
    private Long id;
    private String name;
    private List<String> selectedPeriodes;
    private List<String> selectedActivites;
    private List<ActiviteMoniteur.CellData> cells;
    private boolean deleted;

    public static ActiviteMoniteurDTO toActiviteMoniteurDTO(ActiviteMoniteur entity) {
        return ActiviteMoniteurDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .selectedPeriodes(entity.getSelectedPeriodes())
                .selectedActivites(entity.getSelectedActivites())
                .cells(entity.getCells())
                .deleted(entity.isDeleted())
                .build();
    }
}