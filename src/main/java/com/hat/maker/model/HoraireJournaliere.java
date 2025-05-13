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
    private boolean deleted;

    @ElementCollection
    private List<String> selectedDepartements;

    @ElementCollection
    private List<String> selectedPeriodes;

    @ElementCollection
    private List<String> infos;

    @ElementCollection
    @CollectionTable(name = "horaire_cells", joinColumns = @JoinColumn(name = "horaire_id"))
    private List<CellData> cells;

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CellData {
        private int indexCol;
        private int indexRow;
        private String cellData;
    }
}