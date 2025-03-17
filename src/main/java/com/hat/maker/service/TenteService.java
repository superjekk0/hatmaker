package com.hat.maker.service;

import com.hat.maker.model.*;
import com.hat.maker.repository.TenteRepository;
import com.hat.maker.service.dto.TenteDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TenteService {
    private final TenteRepository tenteRepository;

    public TenteDTO createTente(TenteDTO tenteDTO) {
        if (tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(tenteDTO.getNomTente())) {
            throw new IllegalArgumentException("Une tente avec ce nom existe déjà");
        }
        ValidationService.validerTenteFields(tenteDTO);

        Tente etat = Tente.builder()
                .nomTente(tenteDTO.getNomTente())
                .campeurs(getCampeurs(tenteDTO))
                .moniteurs(getMoniteurs(tenteDTO))
                .deleted(false)
                .build();
        Tente tenteRetour = tenteRepository.save(etat);
        return TenteDTO.toTenteDTO(tenteRetour);
    }

    public TenteDTO modifierTente(TenteDTO tenteDTO) {
        if (tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(tenteDTO.getNomTente()) &&
            !tenteDTO.getNomTente().equals(getTenteById(tenteDTO.getId()).getNomTente())) {
            throw new IllegalArgumentException("Une tente avec ce nom existe déjà");
        }
        ValidationService.validerTenteFields(tenteDTO);

        Tente tente = getTenteById(tenteDTO.getId());
        tente.setNomTente(tenteDTO.getNomTente());
        tente.setCampeurs(getCampeurs(tenteDTO));
        tente.setMoniteurs(getMoniteurs(tenteDTO));
        Tente tenteRetour = tenteRepository.save(tente);
        return TenteDTO.toTenteDTO(tenteRetour);
    }

    public TenteDTO supprimerTente(TenteDTO tenteDTO) {
        Tente tente = getTenteById(tenteDTO.getId());
        tente.setDeleted(true);
        return TenteDTO.toTenteDTO(tenteRepository.save(tente));
    }

    public List<TenteDTO> getAllTente() {
        return tenteRepository.findAll().stream()
                .map(TenteDTO::toTenteDTO)
                .toList();
    }

    private List<Campeur> getCampeurs(TenteDTO tenteDTO) {
        return tenteDTO.getCampeurs().stream()
                .map(campeurDTO -> Campeur.builder()
                        .id(campeurDTO.getId())
                        .nom(campeurDTO.getNom())
                        .prenom(campeurDTO.getPrenom())
                        .information(campeurDTO.getInformation())
                        .genre(campeurDTO.getGenre())
                        .groupe(Groupe.builder()
                                .id(campeurDTO.getGroupe().getId())
                                .nom(campeurDTO.getGroupe().getNom())
                                .build())
                        .build())
                .collect(Collectors.toList());
    }

    private List<Moniteur> getMoniteurs(TenteDTO tenteDTO) {
        return tenteDTO.getMoniteurs().stream()
                .map(moniteurDTO -> Moniteur.builder()
                        .id(moniteurDTO.getId())
                        .nom(moniteurDTO.getNom())
                        .courriel(moniteurDTO.getCourriel())
                        .departement(Departement.builder()
                                .id(moniteurDTO.getDepartement().getId())
                                .nom(moniteurDTO.getDepartement().getNom())
                                .build())
                        .build())
                .collect(Collectors.toList());
    }

    private Tente getTenteById(Long id) {
        return tenteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("La tente n'existe pas"));
    }

}
