package com.hat.maker.service;

import com.hat.maker.model.Etat;
import com.hat.maker.repository.EtatRespository;
import com.hat.maker.service.dto.EtatDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EtatServiceTest {

    @Mock
    private EtatRespository etatRepository;

    @InjectMocks
    private EtatService etatService;

    @Test
    public void creeEtatAvecSucces() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom("ON")
                .build();

        Etat etatRetour = Etat.builder()
                .id(1L)
                .nom("ON")
                .build();

        when(etatRepository.save(any(Etat.class))).thenReturn(etatRetour);

        EtatDTO e = etatService.createEtat(etatDTO);
        assertThat(e.getNom()).isEqualTo("ON");
        assertThat(e.getId()).isEqualTo(1L);
    }

    @Test
    public void creeEtatAvecNomExistant_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom("ON")
                .build();

        when(etatRepository.existsByNomIgnoreCase(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                etatService.createEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("Un état avec ce nom existe déjà");
    }

    @Test
    public void creerEtatAvecNomNull_DevraisLancerIllegalArgumentException() {
        EtatDTO etatDTO = EtatDTO.builder()
                .nom(null)
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
            etatService.createEtat(etatDTO));

        assertThat(exception.getMessage()).isEqualTo("Le nom de l'état ne peut pas être vide");
    }
}