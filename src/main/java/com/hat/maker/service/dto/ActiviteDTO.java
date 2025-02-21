package com.hat.maker.service.dto;

import com.hat.maker.model.Activite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ActiviteDTO {
    private Long id;
    private String nom;
    private boolean deleted;

    public static ActiviteDTO toActiviteDTO(Activite activite) {
        return ActiviteDTO.builder()
            .id(activite.getId())
            .nom(activite.getNom())
            .deleted(activite.isDeleted())
            .build();
    }
}
