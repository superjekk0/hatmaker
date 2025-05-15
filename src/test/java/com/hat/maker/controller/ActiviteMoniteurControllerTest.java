package com.hat.maker.controller;

import com.hat.maker.service.ActiviteMoniteurService;
import com.hat.maker.service.dto.ActiviteMoniteurDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ActiviteMoniteurControllerTest {

    @InjectMocks
    private ActiviteMoniteurController activiteMoniteurController;

    @Mock
    private ActiviteMoniteurService activiteMoniteurService;

    private ActiviteMoniteurDTO activiteMoniteurDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        activiteMoniteurDTO = ActiviteMoniteurDTO.builder()
                .id(1L)
                .name("Test Activite")
                .selectedPeriodes(List.of("Morning", "Afternoon"))
                .selectedActivites(List.of("Activity1", "Activity2"))
                .build();
    }

    @Test
    void testCreateActiviteMoniteur() {
        when(activiteMoniteurService.createActiviteMoniteur(any(ActiviteMoniteurDTO.class)))
                .thenReturn(activiteMoniteurDTO);

        ResponseEntity<ActiviteMoniteurDTO> response = activiteMoniteurController.createActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(response);
        assertEquals(activiteMoniteurDTO.getName(), Objects.requireNonNull(response.getBody()).getName());
        verify(activiteMoniteurService, times(1)).createActiviteMoniteur(any(ActiviteMoniteurDTO.class));
    }

    @Test
    void testGetAllActiviteMoniteurs() {
        when(activiteMoniteurService.getAllActiviteMoniteur()).thenReturn(List.of(activiteMoniteurDTO));

        ResponseEntity<List<ActiviteMoniteurDTO>> response = activiteMoniteurController.getAllActiviteMoniteurs();

        assertNotNull(response);
        assertFalse(Objects.requireNonNull(response.getBody()).isEmpty());
        verify(activiteMoniteurService, times(1)).getAllActiviteMoniteur();
    }

    @Test
    void testModifierActiviteMoniteur() {
        when(activiteMoniteurService.modifierActiviteMoniteur(any(ActiviteMoniteurDTO.class)))
                .thenReturn(activiteMoniteurDTO);

        ResponseEntity<ActiviteMoniteurDTO> response = activiteMoniteurController.modifierActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(response);
        assertEquals(activiteMoniteurDTO.getName(), Objects.requireNonNull(response.getBody()).getName());
        verify(activiteMoniteurService, times(1)).modifierActiviteMoniteur(any(ActiviteMoniteurDTO.class));
    }

    @Test
    void testSupprimerActiviteMoniteur() {
        when(activiteMoniteurService.supprimerActiviteMoniteur(any(ActiviteMoniteurDTO.class)))
                .thenReturn(activiteMoniteurDTO);

        ResponseEntity<ActiviteMoniteurDTO> response = activiteMoniteurController.supprimerActiviteMoniteur(activiteMoniteurDTO);

        assertNotNull(response);
        assertEquals(activiteMoniteurDTO.getName(), Objects.requireNonNull(response.getBody()).getName());
        verify(activiteMoniteurService, times(1)).supprimerActiviteMoniteur(any(ActiviteMoniteurDTO.class));
    }
}