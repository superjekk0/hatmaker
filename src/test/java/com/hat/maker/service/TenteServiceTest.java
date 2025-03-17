package com.hat.maker.service;

import com.hat.maker.model.*;
import com.hat.maker.repository.TenteRepository;
import com.hat.maker.service.dto.CampeurDTO;
import com.hat.maker.service.dto.MoniteurDTO;
import com.hat.maker.service.dto.TenteDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class TenteServiceTest {

    @Mock
    private TenteRepository tenteRepository;

    @InjectMocks
    private TenteService tenteService;

    TenteDTO tenteDTO;
    Tente tente;

    @BeforeEach
    void setup() {
        List<Moniteur> moniteurs = List.of(
                Moniteur.builder()
                        .id(1L)
                        .nom("Moniteur1")
                        .departement(Departement.builder()
                                .id(1L)
                                .nom("Departement1")
                                .build())
                        .build(),
                Moniteur.builder()
                        .id(2L)
                        .nom("Moniteur2")
                        .departement(Departement.builder()
                                .id(2L)
                                .nom("Departement2")
                                .build())
                        .build()
        );

        List<Campeur> campeurs = List.of(
                Campeur.builder()
                        .id(1L)
                        .nom("Campeur1")
                        .prenom("Prenom1")
                        .genre("M")
                        .information("Information1")
                        .groupe(Groupe.builder()
                                .id(1L)
                                .nom("Groupe1")
                                .build())
                        .build(),
                Campeur.builder()
                        .id(2L)
                        .nom("Campeur2")
                        .prenom("Prenom2")
                        .genre("F")
                        .information("Information2")
                        .groupe(Groupe.builder()
                                .id(2L)
                                .nom("Groupe2")
                                .build())
                        .build()
        );

        List<MoniteurDTO> moniteursDTO = moniteurs.stream()
                .map(MoniteurDTO::toMoniteurDTO)
                .toList();

        List<CampeurDTO> campeursDTO = campeurs.stream()
                .map(CampeurDTO::toCampeurDTO)
                .toList();

        tenteDTO = TenteDTO.builder()
                .id(1L)
                .nomTente("1")
                .moniteurs(moniteursDTO)
                .campeurs(campeursDTO)
                .build();

        tente = Tente.builder()
                .id(1L)
                .nomTente("1")
                .moniteurs(moniteurs)
                .campeurs(campeurs)
                .build();
    }

    @Test
    public void creeTenteAvecSucces() {
        when(tenteRepository.save(any(Tente.class))).thenReturn(tente);

        TenteDTO e = tenteService.createTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("1");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void creeTenteAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        when(tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                tenteService.createTente(tenteDTO));

        assertThat(exception.getMessage()).isEqualTo("Une tente avec ce nom existe déjà");
    }

    @Test
    public void creeTenteAvecNomExistantSupprime_DevraisReussir() {
        // deleted tente
        when(tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(tenteRepository.save(any(Tente.class))).thenReturn(tente);

        TenteDTO e = tenteService.createTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("1");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierTenteAvecSucces() {
        Tente tenteModifie = tente;
        tenteModifie.setNomTente("2");
        tenteDTO.setNomTente("2");

        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));
        when(tenteRepository.save(any(Tente.class))).thenReturn(tenteModifie);

        TenteDTO e = tenteService.modifierTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("2");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierTenteAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        tente.setId(2L);
        when(tenteRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                tenteService.modifierTente(tenteDTO));

        assertThat(exception.getMessage()).isEqualTo("La tente n'existe pas");
    }

    @Test
    public void modifierTenteAvecNomNull_DevraisLancerIllegalArgumentException() {
        tenteDTO.setNomTente(null);
        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                tenteService.modifierTente(tenteDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de la tente ne peut pas être vide");
    }

    @Test
    public void modifierTenteAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        tenteDTO.setNomTente("NomExistant");

        when(tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                tenteService.modifierTente(tenteDTO));

        assertThat(exception.getMessage()).isEqualTo("Une tente avec ce nom existe déjà");
    }

    @Test
    public void modifierTenteAvecNomExistantSupprime_DevraisReussir() {
        tente.setNomTente("1");
        tente.setDeleted(true);

        when(tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));
        when(tenteRepository.save(any(Tente.class))).thenReturn(tente);

        TenteDTO e = tenteService.modifierTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("1");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierTenteAvecMemeNom_DevraisReussir() {
        tente.setNomTente("1");

        when(tenteRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));
        when(tenteRepository.save(any(Tente.class))).thenReturn(tente);

        TenteDTO e = tenteService.modifierTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("1");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void supprimerTenteAvecSuccess() {
        Tente tenteSupprime = tente;
        tenteSupprime.setDeleted(true);

        when(tenteRepository.findById(1L)).thenReturn(Optional.of(tente));
        when(tenteRepository.save(any(Tente.class))).thenReturn(tenteSupprime);

        TenteDTO e = tenteService.supprimerTente(tenteDTO);
        assertThat(e.getNomTente()).isEqualTo("1");
        assertThat(e.getId()).isEqualTo(1L);
        assertThat(e.isDeleted()).isTrue();
    }

    @Test
    public void supprimerTenteAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        when(tenteRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                tenteService.supprimerTente(tenteDTO));

        assertThat(exception.getMessage()).isEqualTo("La tente n'existe pas");
    }

    @Test
    public void getAllTenteAvecSuccess() {
        Tente tente2 = Tente.builder()
                .id(2L)
                .nomTente("2")
                .moniteurs(List.of())
                .campeurs(List.of())
                .build();

        when(tenteRepository.findAll()).thenReturn(List.of(tente, tente2));

        assertThat(tenteService.getAllTente().size()).isEqualTo(2);
    }

    @Test
    public void getAllTenteAvecAucunTente_DevraisRetournerListeVide() {
        when(tenteRepository.findAll()).thenReturn(List.of());

        assertThat(tenteService.getAllTente().size()).isEqualTo(0);
    }
}