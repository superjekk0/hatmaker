package com.hat.maker.service.dto;

import com.hat.maker.model.Specialiste;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class SpecialisteDTO extends UtilisateurDTO {

    public static SpecialisteDTO toSpecialisteDTO(Specialiste specialiste) {
        if(specialiste == null) {throw new IllegalArgumentException("Specialiste est null !");}
        return SpecialisteDTO.builder()
                .id(specialiste.getId())
                .nom(specialiste.getNom())
                .courriel(specialiste.getCourriel())
                .role(specialiste.getCredentials().getRole())
                .deleted(specialiste.isDeleted())
                .build();
    }
}
