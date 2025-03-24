package com.hat.maker.service;

import com.hat.maker.model.HoraireTypique;
import com.hat.maker.model.TimeSlot;
import com.hat.maker.repository.HoraireTypiqueRepository;
import com.hat.maker.service.dto.HoraireTypiqueDTO;
import com.hat.maker.service.dto.TimeSlotDTO;
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
public class HoraireTypiqueServiceTest {

    @Mock
    private HoraireTypiqueRepository horaireTypiqueRepository;

    @InjectMocks
    private HoraireTypiqueService horaireTypiqueService;

    @Test
    public void createHoraireTypiqueWithSuccess() {
        TimeSlotDTO timeSlotDTO = TimeSlotDTO.builder()
                .startTime("08:00")
                .endTime("10:00")
                .build();

        HoraireTypiqueDTO horaireTypiqueDTO = HoraireTypiqueDTO.builder()
                .timeSlots(List.of(timeSlotDTO))
                .build();

        TimeSlot timeSlot = TimeSlot.builder()
                .startTime("08:00")
                .endTime("10:00")
                .build();

        HoraireTypique horaireTypiqueRetour = HoraireTypique.builder()
                .id(1L)
                .timeSlots(List.of(timeSlot))
                .build();

        when(horaireTypiqueRepository.save(any(HoraireTypique.class))).thenReturn(horaireTypiqueRetour);

        HoraireTypiqueDTO h = horaireTypiqueService.createHoraireTypique(horaireTypiqueDTO);
        assertThat(h.getId()).isEqualTo(1L);
        assertThat(h.getTimeSlots().getFirst().getStartTime()).isEqualTo("08:00");
    }

    @Test
    public void supprimerHoraireTypiqueWithSuccess() {
        HoraireTypique horaireTypique = HoraireTypique.builder()
                .id(1L)
                .timeSlots(List.of())
                .build();

        HoraireTypique horaireTypiqueSupprime = HoraireTypique.builder()
                .id(1L)
                .timeSlots(List.of())
                .deleted(true)
                .build();

        when(horaireTypiqueRepository.findById(1L)).thenReturn(Optional.of(horaireTypique));
        when(horaireTypiqueRepository.save(any(HoraireTypique.class))).thenReturn(horaireTypiqueSupprime);

        HoraireTypiqueDTO h = horaireTypiqueService.supprimerHoraireTypique(HoraireTypiqueDTO.toHoraireTypiqueDTO(horaireTypique));
        assertThat(h.getId()).isEqualTo(1L);
        assertThat(h.isDeleted()).isTrue();
    }

    @Test
    public void supprimerHoraireTypiqueWithNonExistentId_ShouldThrowIllegalArgumentException() {
        HoraireTypiqueDTO horaireTypiqueDTO = HoraireTypiqueDTO.builder()
                .id(1L)
                .build();

        when(horaireTypiqueRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                horaireTypiqueService.supprimerHoraireTypique(horaireTypiqueDTO));

        assertThat(exception.getMessage()).isEqualTo("L'horaire typique n'existe pas");
    }

    @Test
    public void getAllHoraireTypiqueWithSuccess() {
        HoraireTypique horaireTypique1 = HoraireTypique.builder()
                .id(1L)
                .timeSlots(List.of())
                .build();

        HoraireTypique horaireTypique2 = HoraireTypique.builder()
                .id(2L)
                .timeSlots(List.of())
                .build();

        when(horaireTypiqueRepository.findAll()).thenReturn(List.of(horaireTypique1, horaireTypique2));

        assertThat(horaireTypiqueService.getAllHoraireTypique().size()).isEqualTo(2);
    }

    @Test
    public void getAllHoraireTypiqueWithNoHoraireTypique_ShouldReturnEmptyList() {
        when(horaireTypiqueRepository.findAll()).thenReturn(List.of());

        assertThat(horaireTypiqueService.getAllHoraireTypique().size()).isEqualTo(0);
    }
}