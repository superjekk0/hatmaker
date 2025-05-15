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
public class ActiviteMoniteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Options
    private String name;
    private String date;
    private boolean deleted;

    @ElementCollection
    private List<String> selectedPeriodes;

    @ElementCollection
    @CollectionTable(name = "activite_moniteur_cells", joinColumns = @JoinColumn(name = "activite_moniteur_id"))
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