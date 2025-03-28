package com.hat.maker.service;

import com.hat.maker.model.Campeur;
import com.hat.maker.model.Groupe;
import com.hat.maker.repository.CampeurRepository;
import com.hat.maker.repository.GroupeRepository;
import com.hat.maker.service.dto.CampeurDTO;
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
public class CampeurServiceTest {

    @Mock
    private CampeurRepository campeurRepository;
    @Mock
    private GroupeRepository groupeRepository;
    @Mock
    private GroupeService groupeService;

    @InjectMocks
    private CampeurService campeurService;

    @Test
    public void creeCampeurAvecSucces() {
        Groupe groupe = Groupe.builder()
                .id(1L)
                .nom("Inter")
                .deleted(false)
                .build();

        CampeurDTO campeurDTO = CampeurDTO.builder()
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .groupe(GroupeDTO.toGroupeDTO(groupe))
                .build();

        Campeur campeurRetour = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(groupe)
                .build();

        when(campeurRepository.save(any(Campeur.class))).thenReturn(campeurRetour);
        when(groupeRepository.findById(1L)).thenReturn(Optional.of(groupe));

        CampeurDTO c = campeurService.createCampeur(campeurDTO);
        assertThat(c.getNom()).isEqualTo("Doe");
        assertThat(c.getPrenom()).isEqualTo("John");
        assertThat(c.getGenre()).isEqualTo("Lune");
        assertThat(c.getInformation()).isEqualTo("Diabétique");
        assertThat(c.getGroupe().getNom()).isEqualTo("Inter");
        assertThat(c.getGroupe().getId()).isEqualTo(1L);
        assertThat(c.isDeleted()).isFalse();
        assertThat(c.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierCampeurAvecSucces() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Johnson")
                .prenom("Jack")
                .genre("Soleil")
                .information("Allergique")
                .groupe(GroupeDTO.builder()
                        .id(2L)
                        .nom("Benjamin")
                        .build())
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        Campeur campeurModifie = Campeur.builder()
                .id(1L)
                .nom("Johnson")
                .prenom("Jack")
                .genre("Soleil")
                .information("Allergique")
                .groupe(Groupe.builder()
                        .id(2L)
                        .nom("Benjamin")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));
        when(campeurRepository.save(any(Campeur.class))).thenReturn(campeurModifie);

        CampeurDTO c = campeurService.modifierCampeur(campeurDTO);
        assertThat(c.getNom()).isEqualTo("Johnson");
        assertThat(c.getPrenom()).isEqualTo("Jack");
        assertThat(c.getGenre()).isEqualTo("Soleil");
        assertThat(c.getInformation()).isEqualTo("Allergique");
        assertThat(c.getGroupe().getNom()).isEqualTo("Benjamin");
        assertThat(c.getGroupe().getId()).isEqualTo(2L);
        assertThat(c.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierCampeurAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .groupe(GroupeDTO.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.modifierCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le campeur n'existe pas");
    }

    @Test
    public void modifierCampeurAvecNomNull_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom(null)
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.modifierCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom du campeur ne peut pas être vide");
    }

    @Test
    public void modifierCampeurAvecPrenomNull_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom(null)
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.modifierCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le prénom du campeur ne peut pas être vide");
    }

    @Test
    public void modifierCampeurAvecGenreNull_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre(null)
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.modifierCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le genre du campeur ne peut pas être vide");
    }

    @Test
    public void modifierCampeurAvecGroupeNull_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .groupe(null)
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.modifierCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le groupe du campeur ne peut pas être vide");
    }

    @Test
    public void supprimerCampeurAvecSuccess() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(GroupeDTO.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        Campeur campeurExistant = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        Campeur campeurSupprime = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(true)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.of(campeurExistant));
        when(campeurRepository.save(any(Campeur.class))).thenReturn(campeurSupprime);

        CampeurDTO c = campeurService.supprimerCampeur(campeurDTO);
        assertThat(c.isDeleted()).isTrue();
    }

    @Test
    public void supprimerCampeurAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        CampeurDTO campeurDTO = CampeurDTO.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(false)
                .groupe(GroupeDTO.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        when(campeurRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                campeurService.supprimerCampeur(campeurDTO));

        assertThat(exception.getMessage()).isEqualTo("Le campeur n'existe pas");
    }

    @Test
    public void getAllCampeurAvecSuccess() {
        Campeur campeur1 = Campeur.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .genre("Lune")
                .information("Diabétique")
                .deleted(true)
                .groupe(Groupe.builder()
                        .id(1L)
                        .nom("Inter")
                        .build())
                .build();

        Campeur campeur2 = Campeur.builder()
                .id(2L)
                .nom("Johnson")
                .prenom("Jack")
                .genre("Soleil")
                .information("Allergique")
                .deleted(false)
                .groupe(Groupe.builder()
                        .id(2L)
                        .nom("Benjamin")
                        .build())
                .build();


        when(campeurRepository.findAll()).thenReturn(List.of(campeur1, campeur2));

        assertThat(campeurService.getAllCampeur().size()).isEqualTo(2);
    }

    @Test
    public void getAllCampeurAvecAucunEtat_DevraisRetournerListeVide() {
        when(campeurRepository.findAll()).thenReturn(List.of());

        assertThat(campeurService.getAllCampeur().size()).isEqualTo(0);
    }


}