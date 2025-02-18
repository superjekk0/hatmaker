package com.hat.maker.service;


import com.hat.maker.model.Moniteur;
import com.hat.maker.repository.MoniteurRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.MoniteurCreeDTO;
import com.hat.maker.service.dto.MoniteurDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MoniteurService {
    private final MoniteurRepository moniteurRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public MoniteurDTO createMoniteur(MoniteurCreeDTO moniteurCreeDTO) {
        ValidationService.validerMoniteurFields(moniteurCreeDTO);

        if (utilisateurRepository.existsByCourriel(moniteurCreeDTO.getCourriel())) {
            ValidationService.throwCourrielDejaUtilise();
        }

        Moniteur moniteur = Moniteur.builder()
                .nom(moniteurCreeDTO.getNom())
                .courriel(moniteurCreeDTO.getCourriel())
                .motDePasse(passwordEncoder.encode(moniteurCreeDTO.getMotDePasse()))
                .build();
        Moniteur moniteurRetour = moniteurRepository.save(moniteur);
        return (MoniteurDTO) MoniteurDTO.toUtilisateurDTO(moniteurRetour);
    }
}
