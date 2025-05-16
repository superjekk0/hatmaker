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
    void testSauvegarderAssignements_CreatesNewAssignements() {
        List<AssignementDTO> assignementDTOs = List.of(
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
        );

        Assignement assignement1 = Assignement.builder()
                .id(1L)
                .activite("Activity1")
                .periode("Morning")
                .campeurs(List.of("Campeur1", "Campeur2"))
                .limite(2)
                .build();

        Assignement assignement2 = Assignement.builder()
                .id(2L)
                .activite("Activity2")
                .periode("Afternoon")
                .campeurs(List.of("Campeur3", "Campeur4"))
                .limite(2)
                .build();

        when(assignementRepository.save(any(Assignement.class)))
                .thenReturn(assignement1)
                .thenReturn(assignement2);

        List<Assignement> result = assignementService.sauvegarderAssignements(assignementDTOs);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(assignementRepository, times(2)).save(any(Assignement.class));
    }
}
