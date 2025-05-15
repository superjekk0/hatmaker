package com.hat.maker.service;

import com.hat.maker.model.ActiviteMoniteur;
import com.hat.maker.repository.ActiviteMoniteurRepository;
import com.hat.maker.service.dto.ActiviteMoniteurDTO;
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
    private ActiviteMoniteurRepository activiteMoniteurRepository;

    private ActiviteMoniteur activiteMoniteur;
    private ActiviteMoniteurDTO activiteMoniteurDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        activiteMoniteur = ActiviteMoniteur.builder()
                .id(1L)
                .name("Test Activite")
                .selectedPeriodes(List.of("Morning", "Evening"))
                .selectedActivites(List.of("Activity1", "Activity2"))
                .build();

        activiteMoniteurDTO = ActiviteMoniteurDTO.builder()
                .id(1L)
                .name("Test Activite")
                .selectedPeriodes(List.of("Morning", "Evening"))
                .selectedActivites(List.of("Activity1", "Activity2"))
                .build();
    }

    @Test
    void testCreateActiviteMoniteur() {
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.createActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(result);
        assertEquals(activiteMoniteurDTO.getName(), result.getName());
        verify(activiteMoniteurRepository, times(1)).save(any(ActiviteMoniteur.class));
    }

    @Test
    void testGetActiviteMoniteurById() {
        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));

        ActiviteMoniteur result = activiteMoniteurService.getActiviteMoniteurById(1L);

        assertNotNull(result);
        assertEquals(activiteMoniteur.getName(), result.getName());
        verify(activiteMoniteurRepository, times(1)).findById(1L);
    }

    @Test
    void testModifierActiviteMoniteur() {
        when(activiteMoniteurRepository.findById(1L)).thenReturn(Optional.of(activiteMoniteur));
        when(activiteMoniteurRepository.save(any(ActiviteMoniteur.class))).thenReturn(activiteMoniteur);

        ActiviteMoniteurDTO result = activiteMoniteurService.modifierActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(result);
        assertEquals(activiteMoniteurDTO.getName(), result.getName());
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
                .selectedPeriodes(List.of())
                .selectedActivites(List.of())
                .build();

        assertThrows(IllegalArgumentException.class, () -> ValidationService.validerActiviteMoniteurFields(invalidActivite));
    }
}