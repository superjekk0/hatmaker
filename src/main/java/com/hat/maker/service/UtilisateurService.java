package com.hat.maker.service;

import com.hat.maker.model.Utilisateur;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.security.JwtTokenProvider;
import com.hat.maker.service.dto.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilisateurService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UtilisateurRepository utilisateurRepository;

    private final DepartementService departementService;
    private final MoniteurService moniteurService;
    private final ResponsableService responsableService;
    private final SpecialisteService specialistService;

    public String connexionUtilisateur(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getCourriel(), loginDTO.getMotDePasse()));
        return jwtTokenProvider.generateToken(authentication);
    }

    @Transactional
    public UtilisateurDTO modifierUtilisateur(UtilisateurDTO utilisateurDTO) {
        ValidationService.validerUtilisateurFields(utilisateurDTO);
        Utilisateur utilisateur = getUtilisateurById(utilisateurDTO.getId());

        if (utilisateurRepository.existsByCourriel(utilisateurDTO.getCourriel()) &&
            !utilisateurDTO.getCourriel().equals(utilisateur.getCredentials().getCourriel())) {
            ValidationService.throwCourrielDejaUtilise();
        }

        utilisateur.setNom(utilisateurDTO.getNom());
        utilisateur.getCredentials().setCourriel(utilisateurDTO.getCourriel());
        utilisateur.setDepartement(departementService.getDepartementById(utilisateurDTO.getDepartement().getId()));
        if (utilisateurDTO.getRole() != utilisateur.getCredentials().getRole()) {
            utilisateur.getCredentials().setRole(utilisateurDTO.getRole());
            return changerRole(utilisateur);
        }

        return UtilisateurDTO.toUtilisateurDTO(utilisateurRepository.save(utilisateur));
    }

    public UtilisateurDTO supprimerUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = getUtilisateurById(utilisateurDTO.getId());
        utilisateur.setDeleted(true);
        return UtilisateurDTO.toUtilisateurDTO(utilisateurRepository.save(utilisateur));
    }

    public List<UtilisateurDTO> getAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(UtilisateurDTO::toUtilisateurDTO)
                .toList();
    }

    public List<MoniteurDTO> getMoniteurs() {
        return utilisateurRepository.findAllByCredentialsMoniteur().stream()
                .map(MoniteurDTO::toMoniteurDTO)
                .toList();
    }

    private Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'utilisateur n'existe pas"));
    }

    private UtilisateurDTO changerRole(Utilisateur utilisateur) {
        utilisateurRepository.delete(utilisateur);

        switch (utilisateur.getCredentials().getRole()) {
            case MONITEUR -> {
                MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                        .nom(utilisateur.getNom())
                        .courriel(utilisateur.getCredentials().getCourriel())
                        .motDePasse(utilisateur.getCredentials().getMotDePasse())
                        .departement(DepartementDTO.toDepartementDTO(utilisateur.getDepartement()))
                        .build();
                return moniteurService.updateMoniteur(moniteurCreeDTO);
            }
            case RESPONSABLE -> {
                ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                        .nom(utilisateur.getNom())
                        .courriel(utilisateur.getCredentials().getCourriel())
                        .motDePasse(utilisateur.getCredentials().getMotDePasse())
                        .departement(DepartementDTO.toDepartementDTO(utilisateur.getDepartement()))
                        .build();
                return responsableService.updateResponsable(responsableCreeDTO);
            }
            case SPECIALISTE -> {
                SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                        .nom(utilisateur.getNom())
                        .courriel(utilisateur.getCredentials().getCourriel())
                        .motDePasse(utilisateur.getCredentials().getMotDePasse())
                        .departement(DepartementDTO.toDepartementDTO(utilisateur.getDepartement()))
                        .build();
                return specialistService.updateSpecialiste(specialisteCreeDTO);
            }
        }

        return null;
    }
}

