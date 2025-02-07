package com.hat.maker.service;


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
                .build();
        Specialiste specialisteRetour = specialisteRepository.save(specialiste);
        return SpecialisteDTO.toSpecialisteDTO(specialisteRetour);
    }
}
