package com.hat.maker.service;

import com.hat.maker.model.Assignement;
import com.hat.maker.repository.AssignementRepository;
import com.hat.maker.service.dto.AssignementDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class AssignementServiceTest {
    @InjectMocks
    private AssignementService assignementService;

    @Mock
    private AssignementRepository assignementRepository;

    @Test
    void testSauvegarderAssignement_CreatesNewAssignement() {
        AssignementDTO assignementDTO = AssignementDTO.builder()
                .activite("Activity1")
                .periode("Morning")
                .campeurs(List.of("Campeur1", "Campeur2"))
                .build();

        Assignement assignement = Assignement.builder()
                .id(1L)
                .build();

        when(assignementRepository.save(any(Assignement.class))).thenReturn(assignement);

        Assignement result = assignementService.sauvegarderAssignement(assignementDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(assignementRepository).save(any(Assignement.class));
    }

    @Test
    void testSauvegarderAssignement_UpdatesExistingAssignement() {
        AssignementDTO assignementDTO = AssignementDTO.builder()
                .id(1L)
                .activite("UpdatedActivity")
                .periode("Afternoon")
                .campeurs(List.of("Campeur3"))
                .build();

        Assignement existingAssignement = Assignement.builder()
                .id(1L)
                .build();

        when(assignementRepository.findById(1L)).thenReturn(Optional.of(existingAssignement));
        when(assignementRepository.save(existingAssignement)).thenReturn(existingAssignement);

        Assignement result = assignementService.sauvegarderAssignement(assignementDTO);

        assertNotNull(result);
        assertEquals("UpdatedActivity", result.getActivite());
        assertEquals("Afternoon", result.getPeriode());
        verify(assignementRepository).findById(1L);
        verify(assignementRepository).save(existingAssignement);
    }

    @Test
    void testSauvegarderAssignement_ThrowsExceptionForInvalidData() {
        AssignementDTO assignementDTO = AssignementDTO.builder()
                .periode(null)
                .build();

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> assignementService.sauvegarderAssignement(assignementDTO));

        assertEquals("La période ne peut pas être vide", exception.getMessage());
    }
}
