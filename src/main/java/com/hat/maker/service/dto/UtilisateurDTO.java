
package com.hat.maker.service.dto;

import com.hat.maker.model.Moniteur;
import com.hat.maker.model.Responsable;
import com.hat.maker.model.Specialiste;
import com.hat.maker.model.Utilisateur;
import com.hat.maker.model.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class UtilisateurDTO {
    protected Long id;
    protected String nom;
    protected String courriel;
    protected Role role;
    protected DepartementDTO departement;
    protected boolean deleted;

    public static UtilisateurDTO toUtilisateurDTO(Utilisateur utilisateur) {
        return switch (utilisateur.getClass().getSimpleName()) {
            case "Responsable" -> ResponsableDTO.toResponsableDTO((Responsable) utilisateur);
            case "Specialiste" -> SpecialisteDTO.toSpecialisteDTO((Specialiste) utilisateur);
            case "Moniteur" -> MoniteurDTO.toMoniteurDTO((Moniteur) utilisateur);
            default -> throw new IllegalArgumentException("Type d'utilisateur inconnu");
        };
    }
}
