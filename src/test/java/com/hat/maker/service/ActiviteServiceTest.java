package com.hat.maker.service;

import com.hat.maker.model.Activite;
import com.hat.maker.repository.ActiviteRespository;
import com.hat.maker.service.dto.ActiviteDTO;
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
public class ActiviteServiceTest {
    @Mock
    private ActiviteRespository activiteRepository;

    @InjectMocks
    private ActiviteService activiteService;

    @Test
    public void creeActiviteAvecSucces() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .nom("Tir")
                .build();

        Activite activiteRetour = Activite.builder()
                .id(1L)
                .nom("Tir")
                .build();

        when(activiteRepository.save(any(Activite.class))).thenReturn(activiteRetour);

        ActiviteDTO a = activiteService.createActivite(activiteDTO);
        assertThat(a.getNom()).isEqualTo("Tir");
        assertThat(a.getId()).isEqualTo(1L);
    }

    @Test
    public void creeActiviteAvecNomExistant_DevraisLancerIllegalArgumentException() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .nom("Tir")
                .build();

        when(activiteRepository.existsByNomIgnoreCase(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                activiteService.createActivite(activiteDTO));

        assertThat(exception.getMessage()).isEqualTo("Une activité avec ce nom existe déjà");
    }

    @Test
    public void creerActiviteAvecNomNull_DevraisLancerIllegalArgumentException() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .nom(null)
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                activiteService.createActivite(activiteDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de l'activité ne peut pas être vide");
    }

    @Test
    public void modifierActiviteAvecSucces() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .id(1L)
                .nom("Kayak")
                .build();

        Activite activiteExistant = Activite.builder()
                .id(1L)
                .nom("Tir")
                .build();

        Activite activiteModifie = Activite.builder()
                .id(1L)
                .nom("Kayak")
                .build();

        when(activiteRepository.findById(1L)).thenReturn(Optional.of(activiteExistant));
        when(activiteRepository.save(any(Activite.class))).thenReturn(activiteModifie);

        ActiviteDTO a = activiteService.modifierActivite(activiteDTO);
        assertThat(a.getNom()).isEqualTo("Kayak");
        assertThat(a.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierActiviteAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .id(1L)
                .nom("Kayak")
                .build();

        when(activiteRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                activiteService.modifierActivite(activiteDTO));

        assertThat(exception.getMessage()).isEqualTo("L'activité n'existe pas");
    }

    @Test
    public void modifierActiviteAvecNomNull_DevraisLancerIllegalArgumentException() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .id(1L)
                .nom(null)
                .build();

        Activite activiteExistant = Activite.builder()
                .id(1L)
                .nom("Tir")
                .build();

        when(activiteRepository.findById(1L)).thenReturn(Optional.of(activiteExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                activiteService.modifierActivite(activiteDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de l'activité ne peut pas être vide");
    }

    @Test
    public void supprimerActiviteAvecSuccess() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .id(1L)
                .nom("Tir")
                .build();

        Activite activiteExistant = Activite.builder()
                .id(1L)
                .nom("Tir")
                .build();

        Activite activiteSupprime = Activite.builder()
                .id(1L)
                .nom("Tir")
                .deleted(true)
                .build();

        when(activiteRepository.findById(1L)).thenReturn(Optional.of(activiteExistant));
        when(activiteRepository.save(any(Activite.class))).thenReturn(activiteSupprime);

        ActiviteDTO a = activiteService.supprimerActivite(activiteDTO);
        assertThat(a.getNom()).isEqualTo("Tir");
        assertThat(a.getId()).isEqualTo(1L);
        assertThat(a.isDeleted()).isTrue();
    }

    @Test
    public void supprimerActiviteAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        ActiviteDTO activiteDTO = ActiviteDTO.builder()
                .id(1L)
                .nom("Tir")
                .build();

        when(activiteRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                activiteService.supprimerActivite(activiteDTO));

        assertThat(exception.getMessage()).isEqualTo("L'activité n'existe pas");
    }

    @Test
    public void getAllActiviteAvecSuccess() {
        Activite activite1 = Activite.builder()
                .id(1L)
                .nom("Tir")
                .build();

        Activite activite2 = Activite.builder()
                .id(2L)
                .nom("Kayak")
                .build();

        when(activiteRepository.findAll()).thenReturn(List.of(activite1, activite2));

        assertThat(activiteService.getAllActivite().size()).isEqualTo(2);
    }

    @Test
    public void getAllActiviteAvecAucunActivite_DevraisRetournerListeVide() {
        when(activiteRepository.findAll()).thenReturn(List.of());

        assertThat(activiteService.getAllActivite().size()).isEqualTo(0);
    }
}