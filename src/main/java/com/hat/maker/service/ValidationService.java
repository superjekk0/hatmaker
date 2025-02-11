package com.hat.maker.service;

import com.hat.maker.service.dto.*;
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

    public static void validerSpecialisteFields(SpecialisteCreeDTO specialisteCreeDTO) {
        if (specialisteCreeDTO.getMotDePasse() == null) {
            throwFieldValidationException(UtilisateurFields.MOT_DE_PASSE);
        }
        validerSpecialiste(specialisteCreeDTO);
    }


    public static void validerMoniteurFields(MoniteurCreeDTO moniteurCreeDTO) {
        if (moniteurCreeDTO.getMotDePasse() == null) {
            throwFieldValidationException(UtilisateurFields.MOT_DE_PASSE);
        }
        validerMoniteur(moniteurCreeDTO);
    }

    private static void validerResponsable(ResponsableDTO responsableDTO) {
        validerUtilisateurFields(responsableDTO);
    }

    private static void validerSpecialiste(SpecialisteDTO specialisteDTO) {
        validerUtilisateurFields(specialisteDTO);
    }


    private static void validerMoniteur(MoniteurDTO moniteurDTO) {
        validerUtilisateurFields(moniteurDTO);
    }


    private static void validerUtilisateurFields(UtilisateurDTO utilisateurDTO) {
        if (utilisateurDTO.getNom() == null) {
            throwFieldValidationException(UtilisateurFields.NOM);
        }
        if (utilisateurDTO.getCourriel() == null) {
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
