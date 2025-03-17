package com.hat.maker.service.dto;

import com.hat.maker.model.Campeur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CampeurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String information;
    private String genre;
    private boolean deleted;
    private GroupeDTO groupe;

    public static CampeurDTO toCampeurDTO(Campeur campeur) {
        if(campeur == null) {throw new IllegalArgumentException("Campeur est null !");}
        return CampeurDTO.builder()
                .id(campeur.getId())
                .nom(campeur.getNom())
                .prenom(campeur.getPrenom())
                .information(campeur.getInformation())
                .genre(campeur.getGenre())
                .deleted(campeur.isDeleted())
                .groupe(GroupeDTO.toGroupeDTO(campeur.getGroupe()))
                .build();
    }

    public static List<CampeurDTO> toCampeurDTO(List<Campeur> campeurs) {
        return campeurs.stream()
                .map(CampeurDTO::toCampeurDTO)
                .toList();
    }
}
