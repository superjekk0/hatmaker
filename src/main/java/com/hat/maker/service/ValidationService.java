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
                throw new IllegalArgumentException("beNomNull");
            case COURRIEL:
                throw new IllegalArgumentException("beCourrielNull");
            case MOT_DE_PASSE:
                throw new IllegalArgumentException("beMotDePasseNull");
            default:
                throw new IllegalArgumentException("beChampNull");
        }
    }

    public static void throwCourrielDejaUtilise() {
        throw new IllegalArgumentException("beCourrielUnique");
    }
}
