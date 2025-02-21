package com.hat.maker.service;

import com.hat.maker.model.Etat;
import com.hat.maker.repository.EtatRespository;
import com.hat.maker.service.dto.EtatDTO;
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
public class EtatServiceTest {

    @Mock
    private EtatRespository etatRepository;

    @InjectMocks
    private EtatService etatService;

    @Test
    public void creeEtatAvecSucces() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom("ON")
                .build();

        Etat etatRetour = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.save(any(Etat.class))).thenReturn(etatRetour);

        EtatDTO e = etatService.createEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("ON");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void creeEtatAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom("ON")
                .build();

        when(etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.createEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("Un état avec ce nom existe déjà");
    }

    @Test
    public void creeEtatAvecNomExistantSupprime_DevraisReussir() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom("ON")
                .build();

        Etat etatRetour = Etat.builder()
                .id(1L)
                .nom("ON")
                .deleted(false)
                .build();

        when(etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(etatRepository.save(any(Etat.class))).thenReturn(etatRetour);

        EtatDTO e = etatService.createEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("ON");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierEtatAvecSucces() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("OFF")
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etatModifie = Etat.builder()
                .id(1L)
                .nom("OFF")
                .build();

        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));
        when(etatRepository.save(any(Etat.class))).thenReturn(etatModifie);

        EtatDTO e = etatService.modifierEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("OFF");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierEtatAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("OFF")
                .build();

        when(etatRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.modifierEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("L'état n'existe pas");
    }

    @Test
    public void modifierEtatAvecNomNull_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom(null)
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.modifierEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de l'état ne peut pas être vide");
    }

    @Test
    public void modifierEtatAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("OFF")
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.modifierEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("Un état avec ce nom existe déjà");
    }

    @Test
    public void modifierEtatAvecNomExistantSupprime_DevraisReussir() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("OFF")
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etatModifie = Etat.builder()
                .id(1L)
                .nom("OFF")
                .build();

        when(etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));
        when(etatRepository.save(any(Etat.class))).thenReturn(etatModifie);

        EtatDTO e = etatService.modifierEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("OFF");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierEtatAvecMemeNom_DevraisReussir() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));
        when(etatRepository.save(any(Etat.class))).thenReturn(etatExistant);

        EtatDTO e = etatService.modifierEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("ON");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void supprimerEtatAvecSuccess() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etatExistant = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etatSupprime = Etat.builder()
                .id(1L)
                .nom("ON")
                .deleted(true)
                .build();

        when(etatRepository.findById(1L)).thenReturn(Optional.of(etatExistant));
        when(etatRepository.save(any(Etat.class))).thenReturn(etatSupprime);

        EtatDTO e = etatService.supprimerEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("ON");
        assertThat(e.getId()).isEqualTo(1L);
        assertThat(e.isDeleted()).isTrue();
    }

    @Test
    public void supprimerEtatAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.supprimerEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("L'état n'existe pas");
    }

    @Test
    public void getAllEtatAvecSuccess() {
        Etat etat1 = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        Etat etat2 = Etat.builder()
                .id(2L)
                .nom("OFF")
                .build();

        when(etatRepository.findAll()).thenReturn(List.of(etat1, etat2));

        assertThat(etatService.getAllEtat().size()).isEqualTo(2);
    }

    @Test
    public void getAllEtatAvecAucunEtat_DevraisRetournerListeVide() {
        when(etatRepository.findAll()).thenReturn(List.of());

        assertThat(etatService.getAllEtat().size()).isEqualTo(0);
    }


}