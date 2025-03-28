package com.hat.maker.service;

import com.hat.maker.model.Periode;
import com.hat.maker.repository.PeriodeRepository;
import com.hat.maker.service.dto.PeriodeDTO;
import org.junit.jupiter.api.BeforeEach;
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
public class PeriodeServiceTest {

    @Mock
    private PeriodeRepository periodeRepository;

    @InjectMocks
    private PeriodeService periodeService;

    PeriodeDTO periodeDTO;
    Periode periode;

    @BeforeEach
    void setup() {
        periodeDTO = PeriodeDTO.builder()
                .id(1L)
                .periode("Activité 1")
                .startTime("10:00")
                .endTime("12:00")
                .build();

        periode = Periode.builder()
                .id(1L)
                .periode("Activité 1")
                .startTime("10:00")
                .endTime("12:00")
                .build();
    }


    @Test
    public void creePeriodeAvecSucces() {
        when(periodeRepository.save(any(Periode.class))).thenReturn(periode);

        PeriodeDTO p = periodeService.createPeriode(periodeDTO);

        assertThat(p.getPeriode()).isEqualTo("Activité 1");
        assertThat(p.getStartTime()).isEqualTo("10:00");
        assertThat(p.getEndTime()).isEqualTo("12:00");
        assertThat(p.getId()).isEqualTo(1L);
    }

    @Test
    public void creePeriodeAvecPeriodeNull_DevraisLancerIllegalArgumentException() {
        periodeDTO.setPeriode(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.createPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de la période ne peut pas être vide");
    }

    @Test
    public void creePeriodeAvecStartTimeNull_DevraisLancerIllegalArgumentException() {
        periodeDTO.setStartTime(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.createPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("L'heure de début de la période ne peut pas être vide");
    }


    @Test
    public void modifierPeriodeAvecSucces() {
        periodeDTO.setPeriode("Activité 2");
        periodeDTO.setStartTime("12:00");
        periodeDTO.setEndTime("14:00");

        Periode periodeModifier = Periode.builder()
                .id(1L)
                .periode("Activité 2")
                .startTime("12:00")
                .endTime("14:00")
                .build();

        when(periodeRepository.findById(1L)).thenReturn(Optional.of(periode));
        when(periodeRepository.save(any(Periode.class))).thenReturn(periodeModifier);

        PeriodeDTO p = periodeService.modifierPeriode(periodeDTO);
        assertThat(p.getPeriode()).isEqualTo("Activité 2");
        assertThat(p.getStartTime()).isEqualTo("12:00");
        assertThat(p.getEndTime()).isEqualTo("14:00");
        assertThat(p.getId()).isEqualTo(1L);
    }

    @Test
    public void modifierEtatAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        when(periodeRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.modifierPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("La période n'existe pas");
    }

    @Test
    public void modifierPeriodeAvecPeriodeNull_DevraisLancerIllegalArgumentException() {
        periodeDTO.setPeriode(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.modifierPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de la période ne peut pas être vide");
    }

    @Test
    public void modifierPeriodeAvecStartTimeNull_DevraisLancerIllegalArgumentException() {
        periodeDTO.setStartTime(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.modifierPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("L'heure de début de la période ne peut pas être vide");
    }

    @Test
    public void supprimerPeriodeAvecSuccess() {
        Periode periodeSupprime = periode;
        periodeSupprime.setDeleted(true);

        when(periodeRepository.findById(1L)).thenReturn(Optional.of(periode));
        when(periodeRepository.save(any(Periode.class))).thenReturn(periodeSupprime);

        PeriodeDTO p = periodeService.supprimerPeriode(periodeDTO);
        assertThat(p.isDeleted()).isTrue();
    }

    @Test
    public void supprimerPeriodeAvecIdInexistant_DevraisLancerIllegalArgumentException() {
        when(periodeRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                periodeService.supprimerPeriode(periodeDTO));

        assertThat(exception.getMessage()).isEqualTo("La période n'existe pas");
    }

    @Test
    public void getPeriodeEtatAvecSuccess() {
        Periode periode2 = Periode.builder()
                .id(2L)
                .periode("Activité 2")
                .startTime("12:00")
                .endTime("14:00")
                .build();

        when(periodeRepository.findAll()).thenReturn(List.of(periode, periode2));

        assertThat(periodeService.getAllPeriode().size()).isEqualTo(2);
    }

    @Test
    public void getAllEtatAvecAucunEtat_DevraisRetournerListeVide() {
        when(periodeRepository.findAll()).thenReturn(List.of());

        assertThat(periodeService.getAllPeriode().size()).isEqualTo(0);
    }


}