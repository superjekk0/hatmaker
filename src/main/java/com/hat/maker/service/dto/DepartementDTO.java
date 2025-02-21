package com.hat.maker.service.dto;

import com.hat.maker.model.Departement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DepartementDTO {
    private Long id;
    private String nom;
    private boolean deleted;

    public static DepartementDTO toDepartementDTO(Departement departement) {
        return DepartementDTO.builder()
            .id(departement.getId())
            .nom(departement.getNom())
            .deleted(departement.isDeleted())
            .build();
    }
}
