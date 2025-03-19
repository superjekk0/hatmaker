package com.hat.maker.service;

import com.hat.maker.model.*;
import com.hat.maker.repository.TenteRepository;
import com.hat.maker.service.dto.TenteDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TenteService {
    private final TenteRepository tenteRepository;
    private final UtilisateurService utilisateurService;

    public TenteDTO createTente(TenteDTO tenteDTO) {
        if (tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(tenteDTO.getNomTente())) {
            throw new IllegalArgumentException("Une tente avec ce nom existe déjà");
        }
        ValidationService.validerTenteFields(tenteDTO);

        Tente tente = Tente.builder()
                .nomTente(tenteDTO.getNomTente())
                .campeurs(getCampeurs(tenteDTO))
                .moniteurs(getMoniteurs(tenteDTO))
                .deleted(tenteDTO.isDeleted())
                .build();

        try {
            return TenteDTO.toTenteDTO(tenteRepository.save(tente));
        } catch (Exception e) {
            throw new IllegalArgumentException("Le moniteur ou le campeur est déjà associé à une tente");
        }
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

    @Transactional
    public TenteDTO supprimerTente(TenteDTO tenteDTO) {
        Tente tente = getTenteById(tenteDTO.getId());
        tente.setDeleted(true);
        tente.setCampeurs(List.of());
        tente.setMoniteurs(List.of());
        tenteRepository.delete(tente);

        return createTente(TenteDTO.toTenteDTO(tente));
    }

    public List<TenteDTO> getAllTente() {
        return tenteRepository.findAll().stream()
                .map(TenteDTO::toTenteDTO)
                .toList();
    }

    public TenteDTO getTenteByMoniteurId(Long id) {
        Moniteur moniteur = (Moniteur) utilisateurService.getUtilisateurById(id);

        List<TenteDTO> tentes = tenteRepository.findAll().stream()
                .filter(tente -> tente.getMoniteurs().contains(moniteur))
                .map(TenteDTO::toTenteDTO)
                .toList();

        return tentes.isEmpty() ? null : tentes.getFirst();
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

    private List<Moniteur> getMoniteurs(TenteDTO tenteDTO) throws IllegalArgumentException {
        try {
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
        } catch (NullPointerException e) {
            throw new IllegalArgumentException(
                    "Les moniteurs doivent être associés à un département pour faire partie d'une tente");
        }
    }

    private Tente getTenteById(Long id) {
        return tenteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("La tente n'existe pas"));
    }

}
