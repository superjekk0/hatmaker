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
    private List<String> selectedDepartements;
    private List<String> selectedPeriodes;
    private List<String> dates;
    private List<HoraireJournaliere.RowData> rows;

    public static HoraireJournaliereDTO toHoraireJournaliereDTO(HoraireJournaliere entity) {
        return HoraireJournaliereDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .selectedType(entity.getSelectedType())
                .selectedDepartements(entity.getSelectedDepartements())
                .selectedPeriodes(entity.getSelectedPeriodes())
                .dates(entity.getDates())
                .rows(entity.getRows())
                .build();
    }
}