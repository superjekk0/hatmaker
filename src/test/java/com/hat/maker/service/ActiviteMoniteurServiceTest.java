package com.hat.maker.service;

import com.hat.maker.model.ActiviteMoniteur;
import com.hat.maker.model.Assignement;
import com.hat.maker.repository.ActiviteMoniteurRepository;
import com.hat.maker.repository.AssignementRepository;
import com.hat.maker.service.dto.ActiviteMoniteurDTO;
import com.hat.maker.service.dto.AssignementDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ActiviteMoniteurServiceTest {

    @InjectMocks
    private ActiviteMoniteurService activiteMoniteurService;

    @Mock
    private AssignementService assignementService;
    @Mock
    private ActiviteMoniteurRepository activiteMoniteurRepository;
    @Mock
    private AssignementRepository assignementRepository;

    private ActiviteMoniteur activiteMoniteur;
    private ActiviteMoniteurDTO activiteMoniteurDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        activiteMoniteur = ActiviteMoniteur.builder()
                .id(1L)
                .name("Test Activite")
                .date("2023-10-01")
                .selectedPeriodes(List.of("Morning", "Evening"))
                .build();

        activiteMoniteurDTO = ActiviteMoniteurDTO.builder()
                .id(1L)
                .name("Test Activite")
                .date("2023-10-01")
                .selectedPeriodes(List.of("Morning", "Evening"))
                .build();
    }

    @Test
    void testCreateActiviteMoniteur() {
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.createActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(result);
        assertEquals(activiteMoniteurDTO.getName(), result.getName());
        assertEquals(activiteMoniteurDTO.getDate(), result.getDate());
        verify(activiteMoniteurRepository, times(1)).save(any(ActiviteMoniteur.class));
    }

    @Test
    void testGetActiviteMoniteurById() {
        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));

        ActiviteMoniteur result = activiteMoniteurService.getActiviteMoniteurById(1L);

        assertNotNull(result);
        assertEquals(activiteMoniteur.getName(), result.getName());
        assertEquals(activiteMoniteur.getDate(), result.getDate());
        verify(activiteMoniteurRepository, times(1)).findById(1L);
    }

    @Test
    void testModifierActiviteMoniteur() {
        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.modifierActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(result);
        assertEquals(activiteMoniteurDTO.getName(), result.getName());
        assertEquals(activiteMoniteurDTO.getDate(), result.getDate());
        verify(activiteMoniteurRepository, times(1)).save(any(ActiviteMoniteur.class));
    }

    @Test
    void testSupprimerActiviteMoniteur() {
        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.supprimerActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(result);
        assertTrue(result.isDeleted());
        verify(activiteMoniteurRepository, times(1)).save(any(ActiviteMoniteur.class));
    }

    @Test
    void testInvalidActiviteMoniteurFields() {
        ActiviteMoniteurDTO invalidActivite = ActiviteMoniteurDTO.builder()
                .name("")
                .date("")
                .selectedPeriodes(List.of())
                .build();

        assertThrows(IllegalArgumentException.class, () -> ValidationService.validerActiviteMoniteurFields(invalidActivite));
    }

    @Test
    void testSauvegarderAssignement_CreatesNewAssignements() {
        ActiviteMoniteurDTO activiteMoniteurDTO = ActiviteMoniteurDTO.builder()
                .id(1L)
                .assignements(List.of(
                        AssignementDTO.builder()
                                .activite("Activity1")
                                .periode("Morning")
                                .campeurs(List.of("Campeur1", "Campeur2"))
                                .limite(2)
                                .build(),
                        AssignementDTO.builder()
                                .activite("Activity2")
                                .periode("Afternoon")
                                .campeurs(List.of("Campeur3", "Campeur4"))
                                .limite(2)
                                .build()
                ))
                .build();

        ActiviteMoniteur activiteMoniteur = ActiviteMoniteur.builder()
                .id(1L)
                .build();

        List<Assignement> assignements = List.of(
                Assignement.builder()
                        .id(1L)
                        .activite("Activity1")
                        .periode("Morning")
                        .campeurs(List.of("Campeur1", "Campeur2"))
                        .build(),
                Assignement.builder()
                        .id(2L)
                        .activite("Activity2")
                        .periode("Afternoon")
                        .campeurs(List.of("Campeur3", "Campeur4"))
                        .build()
        );

        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));
        when(assignementService.sauvegarderAssignements(activiteMoniteurDTO.getAssignements())).thenReturn(assignements);
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.sauvegarderAssignement(activiteMoniteurDTO);

        assertNotNull(result);
        verify(assignementService).sauvegarderAssignements(activiteMoniteurDTO.getAssignements());
        verify(activiteMoniteurRepository).save(activiteMoniteur);
    }
}