package com.hat.maker.service;


import com.hat.maker.model.Departement;
import com.hat.maker.model.Specialiste;
import com.hat.maker.repository.SpecialisteRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.SpecialisteCreeDTO;
import com.hat.maker.service.dto.SpecialisteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpecialisteService {
    private final SpecialisteRepository specialisteRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public SpecialisteDTO createSpecialiste(SpecialisteCreeDTO specialisteCreeDTO) {
        ValidationService.validerSpecialisteFields(specialisteCreeDTO);

        if (utilisateurRepository.existsByCourriel(specialisteCreeDTO.getCourriel())) {
            ValidationService.throwCourrielDejaUtilise();
        }

        Specialiste specialiste = Specialiste.builder()
                .nom(specialisteCreeDTO.getNom())
                .courriel(specialisteCreeDTO.getCourriel())
                .motDePasse(passwordEncoder.encode(specialisteCreeDTO.getMotDePasse()))
                .departement(Departement.builder()
                        .id(specialisteCreeDTO.getDepartement().getId())
                        .nom(specialisteCreeDTO.getDepartement().getNom())
                        .build())
                .build();
        Specialiste specialisteRetour = specialisteRepository.save(specialiste);
        return (SpecialisteDTO) SpecialisteDTO.toUtilisateurDTO(specialisteRetour);
    }

    public SpecialisteDTO updateSpecialiste(SpecialisteCreeDTO specialisteCreeDTO) {
        Specialiste specialiste = Specialiste.builder()
                .nom(specialisteCreeDTO.getNom())
                .courriel(specialisteCreeDTO.getCourriel())
                .motDePasse(specialisteCreeDTO.getMotDePasse())
                .departement(Departement.builder()
                        .id(specialisteCreeDTO.getDepartement().getId())
                        .nom(specialisteCreeDTO.getDepartement().getNom())
                        .build())
                .build();
        return (SpecialisteDTO) SpecialisteDTO.toUtilisateurDTO(specialisteRepository.save(specialiste));
    }
}
