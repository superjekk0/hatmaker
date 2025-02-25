package com.hat.maker.service.dto;

import com.hat.maker.model.Groupe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class GroupeDTO {
    private Long id;
    private String nom;
    private boolean deleted;

    public static GroupeDTO toGroupeDTO(Groupe groupe) {
        return GroupeDTO.builder()
            .id(groupe.getId())
            .nom(groupe.getNom())
            .deleted(groupe.isDeleted())
            .build();
    }
}
