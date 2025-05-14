package com.hat.maker.service;

import com.hat.maker.model.HoraireJournaliere;
import com.hat.maker.repository.HoraireJournaliereRepository;
import com.hat.maker.service.dto.HoraireJournaliereDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class HoraireJournaliereServiceTest {

    @InjectMocks
    private HoraireJournaliereService horaireJournaliereService;

    @Mock
    private HoraireJournaliereRepository horaireJournaliereRepository;

    private HoraireJournaliere horaireJournaliere;
    private HoraireJournaliereDTO horaireJournaliereDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        horaireJournaliere = HoraireJournaliere.builder()
                .id(1L)
                .name("Test Horaire")
                .startDate("2023-01-01")
                .endDate("2023-01-02")
                .build();

        horaireJournaliereDTO = HoraireJournaliereDTO.builder()
                .id(1L)
                .name("Test Horaire")
                .startDate("2023-01-01")
                .endDate("2023-01-02")
                .build();
    }

    @Test
    void testCreateHoraireJournaliere() {
        horaireJournaliere.setSelectedType("Patrouille");
        horaireJournaliere.setSelectedPeriodes(List.of("Matin", "Soir"));
        horaireJournaliereDTO.setSelectedType("Patrouille");
        horaireJournaliereDTO.setSelectedPeriodes(List.of("Matin", "Soir"));

        when(horaireJournaliereRepository.save(any(HoraireJournaliere.class))).thenReturn(horaireJournaliere);

        HoraireJournaliereDTO result = horaireJournaliereService.createHoraireJournaliere(horaireJournaliereDTO);

        assertNotNull(result);
        assertEquals(horaireJournaliereDTO.getName(), result.getName());
        verify(horaireJournaliereRepository, times(1)).save(any(HoraireJournaliere.class));
    }

    @Test
    void testGetHoraireJournaliereById() {
        when(horaireJournaliereRepository.findById(1L)).thenReturn(Optional.of(horaireJournaliere));

        HoraireJournaliere result = horaireJournaliereService.getHoraireJournaliereById(1L);

        assertNotNull(result);
        assertEquals(horaireJournaliere.getName(), result.getName());
        verify(horaireJournaliereRepository, times(1)).findById(1L);
    }

    @Test
    void testModifierHoraireJournaliere() {
        horaireJournaliere.setSelectedType("Patrouille");
        horaireJournaliere.setSelectedPeriodes(List.of("Matin", "Soir"));
        horaireJournaliereDTO.setSelectedType("Patrouille");
        horaireJournaliereDTO.setSelectedPeriodes(List.of("Matin", "Soir"));

        when(horaireJournaliereRepository.findById(1L)).thenReturn(Optional.of(horaireJournaliere));
        when(horaireJournaliereRepository.save(any(HoraireJournaliere.class))).thenReturn(horaireJournaliere);

        HoraireJournaliereDTO result = horaireJournaliereService.modifierHoraireJournaliere(horaireJournaliereDTO);

        assertNotNull(result);
        assertEquals(horaireJournaliereDTO.getName(), result.getName());
        verify(horaireJournaliereRepository, times(1)).save(any(HoraireJournaliere.class));
    }

    @Test
    void testSupprimerHoraireJournaliere() {
        when(horaireJournaliereRepository.findById(1L)).thenReturn(Optional.of(horaireJournaliere));
        when(horaireJournaliereRepository.save(any(HoraireJournaliere.class))).thenReturn(horaireJournaliere);

        HoraireJournaliereDTO result = horaireJournaliereService.supprimerHoraireJournaliere(horaireJournaliereDTO);

        assertNotNull(result);
        assertTrue(result.isDeleted());
        verify(horaireJournaliereRepository, times(1)).save(any(HoraireJournaliere.class));
    }

    @Test
    void testInvalidHoraireJournaliereFields() {
        HoraireJournaliereDTO invalidHoraire = HoraireJournaliereDTO.builder()
                .name("")
                .startDate("")
                .endDate("")
                .infos(null)
                .selectedType("")
                .selectedDepartements(List.of())
                .selectedPeriodes(List.of())
                .build();

        assertThrows(IllegalArgumentException.class, () -> ValidationService.validerHoraireJournaliereFields(invalidHoraire));
    }
}