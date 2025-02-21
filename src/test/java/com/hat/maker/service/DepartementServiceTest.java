package com.hat.maker.service;

import com.hat.maker.model.Departement;
import com.hat.maker.repository.DepartementRespository;
import com.hat.maker.service.dto.DepartementDTO;
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
public class DepartementServiceTest {

    @Mock
    private DepartementRespository departementRepository;

    @InjectMocks
    private DepartementService departementService;

    @Test
    public void creeDepartementAvecSucces() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .nom("Prog")
                .build();

        Departement departementRetour = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        when(departementRepository.save(any(Departement.class))).thenReturn(departementRetour);

        DepartementDTO d = departementService.createDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("Prog");
        assertThat(d.getId()).isEqualTo(1L);
    }

    @Test
    public void creeDepartementAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .nom("Prog")
                .build();

        when(departementRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                departementService.createDepartement(departementDTO));

        assertThat(exception.getMessage()).isEqualTo("Un département avec ce nom existe déjà");
    }

    @Test
    public void creeDepartementAvecNomExistantSupprime_DevraisReussir() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .nom("Prog")
                .build();

        Departement departementRetour = Departement.builder()
                .id(1L)
                .nom("Prog")
                .deleted(false)
                .build();

        when(departementRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(departementRepository.save(any(Departement.class))).thenReturn(departementRetour);

        DepartementDTO d = departementService.createDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("Prog");
        assertThat(d.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierDepartementAvecSucces() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departementModifie = Departement.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));
        when(departementRepository.save(any(Departement.class))).thenReturn(departementModifie);

        DepartementDTO d = departementService.modifierDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("Vie de camp");
        assertThat(d.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierDepartementAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        when(departementRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                departementService.modifierDepartement(departementDTO));

        assertThat(exception.getMessage()).isEqualTo("Le département n'existe pas");
    }

    @Test
    public void modifierDepartementAvecNomNull_DevraisLancerIllegalArgumentException() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom(null)
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                departementService.modifierDepartement(departementDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom du département ne peut pas être vide");
    }

    @Test
    public void modifierDepartementAvecNomExistantNonSupprime_DevraisLancerIllegalArgumentException() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        when(departementRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                departementService.modifierDepartement(departementDTO));

        assertThat(exception.getMessage()).isEqualTo("Un département avec ce nom existe déjà");
    }

    @Test
    public void modifierDepartementAvecNomExistantSupprime_DevraisReussir() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departementModifie = Departement.builder()
                .id(1L)
                .nom("Vie de camp")
                .build();

        when(departementRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(false);
        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));
        when(departementRepository.save(any(Departement.class))).thenReturn(departementModifie);

        DepartementDTO d = departementService.modifierDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("Vie de camp");
        assertThat(d.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierDepartementAvecMemeNom_DevraisReussir() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        when(departementRepository.existsByNomIgnoreCaseAndIsNotDeleted(any(String.class))).thenReturn(true);
        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));
        when(departementRepository.save(any(Departement.class))).thenReturn(departementExistant);

        DepartementDTO d = departementService.modifierDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("Prog");
        assertThat(d.getId()).isEqualTo(1L);
    }

    @Test
    public void supprimerDepartementAvecSuccess() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departementExistant = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departementSupprime = Departement.builder()
                .id(1L)
                .nom("Prog")
                .deleted(true)
                .build();

        when(departementRepository.findById(1L)).thenReturn(Optional.of(departementExistant));
        when(departementRepository.save(any(Departement.class))).thenReturn(departementSupprime);

        DepartementDTO d = departementService.supprimerDepartement(departementDTO);
        assertThat(d.getNom()).isEqualTo("ON");
        assertThat(d.getId()).isEqualTo(1L);
        assertThat(d.isDeleted()).isTrue();
    }

    @Test
    public void supprimerDepartementAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        DepartementDTO departementDTO = DepartementDTO.builder()
                .id(1L)
                .nom("Prog")
                .build();

        when(departementRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                departementService.supprimerDepartement(departementDTO));

        assertThat(exception.getMessage()).isEqualTo("Le département n'existe pas");
    }

    @Test
    public void getAllDepartementAvecSuccess() {
        Departement departement1 = Departement.builder()
                .id(1L)
                .nom("Prog")
                .build();

        Departement departement2 = Departement.builder()
                .id(2L)
                .nom("Vie de camp")
                .build();

        when(departementRepository.findAll()).thenReturn(List.of(departement1, departement2));

        assertThat(departementService.getAllDepartement().size()).isEqualTo(2);
    }

    @Test
    public void getAllDepartementAvecAucunDepartement_DevraisRetournerListeVide() {
        when(departementRepository.findAll()).thenReturn(List.of());

        assertThat(departementService.getAllDepartement().size()).isEqualTo(0);
    }
}