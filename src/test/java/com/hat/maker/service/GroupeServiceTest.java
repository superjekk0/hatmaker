package com.hat.maker.service;

import com.hat.maker.model.Groupe;
import com.hat.maker.repository.GroupeRepository;
import com.hat.maker.service.dto.GroupeDTO;
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
public class GroupeServiceTest {
    @Mock
    private GroupeRepository groupeRepository;

    @InjectMocks
    private GroupeService groupeService;

    @Test
    public void creeGroupeAvecSucces() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .nom("Junior")
                .build();

        Groupe groupeRetour = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeRetour);

        GroupeDTO g = groupeService.createGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Junior");
        assertThat(g.getId()).isEqualTo(1L);
    }

    @Test
    public void creeGroupeAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .nom("ON")
                .build();

        when(groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                groupeService.createGroupe(groupeDTO));

        assertThat(exception.getMessage()).isEqualTo("Un groupe avec ce nom existe déjà");
    }

    @Test
    public void creeGroupeAvecNomExistantSupprime_DevraisReussir() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .nom("Junior")
                .build();

        Groupe groupeRetour = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .deleted(false)
                .build();

        when(groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeRetour);

        GroupeDTO g = groupeService.createGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Junior");
        assertThat(g.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierGroupeAvecSucces() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Inter")
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupeModifie = Groupe.builder()
                .id(1L)
                .nom("Inter")
                .build();

        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));
        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeModifie);

        GroupeDTO g = groupeService.modifierGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Inter");
        assertThat(g.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierGroupeAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Inter")
                .build();

        when(groupeRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                groupeService.modifierGroupe(groupeDTO));

        assertThat(exception.getMessage()).isEqualTo("Le groupe n'existe pas");
    }

    @Test
    public void modifierGroupeAvecNomNull_DevraisLancerIllegalArgumentException() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom(null)
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                groupeService.modifierGroupe(groupeDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom du groupe ne peut pas être vide");
    }

    @Test
    public void modifierGroupeAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Inter")
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        when(groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                groupeService.modifierGroupe(groupeDTO));

        assertThat(exception.getMessage()).isEqualTo("Un groupe avec ce nom existe déjà");
    }

    @Test
    public void modifierGroupeAvecNomExistantSupprime_DevraisReussir() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Inter")
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupeModifie = Groupe.builder()
                .id(1L)
                .nom("Inter")
                .build();

        when(groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));
        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeModifie);

        GroupeDTO g = groupeService.modifierGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Inter");
        assertThat(g.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierGroupeAvecMemeNom_DevraisReussir() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        when(groupeRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));
        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeExistant);

        GroupeDTO g = groupeService.modifierGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Junior");
        assertThat(g.getId()).isEqualTo(1L);
    }

    @Test
    public void supprimerGroupeAvecSuccess() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupeExistant = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupeSupprime = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .deleted(true)
                .build();

        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupeExistant));
        when(groupeRepository.save(any(Groupe.class))).thenReturn(groupeSupprime);

        GroupeDTO g = groupeService.supprimerGroupe(groupeDTO);
        assertThat(g.getNom()).isEqualTo("Junior");
        assertThat(g.getId()).isEqualTo(1L);
        assertThat(g.isDeleted()).isTrue();
    }

    @Test
    public void supprimerGroupeAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        GroupeDTO groupeDTO = GroupeDTO.builder()
                .id(1L)
                .nom("Junior")
                .build();

        when(groupeRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                groupeService.supprimerGroupe(groupeDTO));

        assertThat(exception.getMessage()).isEqualTo("Le groupe n'existe pas");
    }

    @Test
    public void getAllGroupeAvecSuccess() {
        Groupe groupe1 = Groupe.builder()
                .id(1L)
                .nom("Junior")
                .build();

        Groupe groupe2 = Groupe.builder()
                .id(2L)
                .nom("Inter")
                .build();

        when(groupeRepository.findAll()).thenReturn(List.of(groupe1, groupe2));

        assertThat(groupeService.getAllGroupe().size()).isEqualTo(2);
    }

    @Test
    public void getAllGroupeAvecAucunGroupe_DevraisRetournerListeVide() {
        when(groupeRepository.findAll()).thenReturn(List.of());

        assertThat(groupeService.getAllGroupe().size()).isEqualTo(0);
    }
}