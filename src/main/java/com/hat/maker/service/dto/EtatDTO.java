package com.hat.maker.service.dto;

import com.hat.maker.model.Etat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class EtatDTO {
    private Long id;
    private String nom;

    public static EtatDTO toEtatDTO(Etat etat) {
        return EtatDTO.builder()
            .id(etat.getId())
            .nom(etat.getNom())
            .build();
    }
}
