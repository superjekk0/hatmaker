package com.hat.maker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class HoraireJournaliere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Options
    private String name;

    private String startDate;

    private String endDate;

    private String selectedType;

    @ElementCollection
    private List<String> selectedDepartements;

    @ElementCollection
    private List<String> selectedPeriodes;

    @ElementCollection
    @CollectionTable(name = "horaire_rows", joinColumns = @JoinColumn(name = "horaire_id"))
    private List<RowData> rows;

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RowData {
        private String cellData;
        private String info;
    }
}