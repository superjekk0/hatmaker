package com.hat.maker.service;

import com.hat.maker.service.dto.ResponsableCreeDTO;
import com.hat.maker.service.dto.ResponsableDTO;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ValidationService {
    private enum UtilisateurFields {
        NOM, COURRIEL, MOT_DE_PASSE
    }

    public static void validerResponsableFields(ResponsableCreeDTO responsableCreeDTO) {
        if (responsableCreeDTO.getMotDePasse() == null) {
            throwFieldValidationException(UtilisateurFields.MOT_DE_PASSE);
        }
        validerResponsable(responsableCreeDTO);
    }

    private static void validerResponsable(ResponsableDTO responsableDTO) {
        validerUtilisateurFields(responsableDTO);
    }

    private static void validerUtilisateurFields(ResponsableDTO responsableDTO) {
        if (responsableDTO.getNom() == null) {
            throwFieldValidationException(UtilisateurFields.NOM);
        }
        if (responsableDTO.getCourriel() == null) {
            throwFieldValidationException(UtilisateurFields.COURRIEL);
        }
    }

    private static void throwFieldValidationException(UtilisateurFields field) {
        switch (field) {
            case NOM:
                throw new IllegalArgumentException("Nom NULL");
            case COURRIEL:
                throw new IllegalArgumentException("Courriel NULL");
            case MOT_DE_PASSE:
                throw new IllegalArgumentException("Mot de pass NULL");
            default:
                throw new IllegalArgumentException("Champ NULL");
        }
    }

    public static void throwCourrielDejaUtilise() {
        throw new IllegalArgumentException("Courriel déjà utilisé");
    }
}
