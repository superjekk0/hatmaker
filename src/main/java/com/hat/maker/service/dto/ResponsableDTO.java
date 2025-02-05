package com.hat.maker.service.dto;

import com.hat.maker.model.Responsable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class ResponsableDTO extends UtilisateurDTO {

    public static ResponsableDTO toResponsableDTO(Responsable responsable) {
        if(responsable == null) {throw new IllegalArgumentException("Responsable est null !");}
        return ResponsableDTO.builder()
                .id(responsable.getId())
                .nom(responsable.getNom())
                .courriel(responsable.getCourriel())
                .departement(responsable.getDepartement())
                .role(responsable.getCredentials().getRole())
                .build();
    }
}
