package com.hat.maker.service.dto;

import com.hat.maker.model.HoraireJournaliere;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HoraireJournaliereDTO {
    private Long id;
    private String name;
    private String startDate;
    private String endDate;
    private String selectedType;
    private List<String> infos;
    private List<String> selectedDepartements;
    private List<String> selectedPeriodes;
    private List<HoraireJournaliere.CellData> cells;
    private boolean deleted;

    public static HoraireJournaliereDTO toHoraireJournaliereDTO(HoraireJournaliere entity) {
        return HoraireJournaliereDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .infos(entity.getInfos())
                .selectedType(entity.getSelectedType())
                .selectedDepartements(entity.getSelectedDepartements())
                .selectedPeriodes(entity.getSelectedPeriodes())
                .cells(entity.getCells())
                .deleted(entity.isDeleted())
                .build();
    }
}