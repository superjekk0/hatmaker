package com.hat.maker.service;

import com.hat.maker.model.Specialiste;
import com.hat.maker.repository.SpecialisteRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.SpecialisteCreeDTO;
import com.hat.maker.service.dto.SpecialisteDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SpecialisteServiceTest {

    @Mock
    private SpecialisteRepository specialisteRepository;
    @Mock
    private UtilisateurRepository utilisateurRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private SpecialisteService specialisteService;

    @Test
    public void creeSpecialisteAvecSucces() {
        SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        Specialiste specialisteRetour = Specialiste.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(specialisteRepository.save(any(Specialiste.class))).thenReturn(specialisteRetour);
        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);

        SpecialisteDTO s = specialisteService.createSpecialiste(specialisteCreeDTO);
        assertThat(s.getNom()).isEqualTo("Le Impact");
        assertThat(s.getId()).isEqualTo(1L);
        assertThat(s.getCourriel()).isEqualTo("leimpact@cc.com");
    }

    @Test
    public void creeSpecialisteAvecEmailExistant_DevraisLancerIllegalArgumentException() {
        SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> specialisteService.createSpecialiste(specialisteCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Courriel déjà utilisé");
    }

    @Test
    public void creerSpecialisteAvecCourrielNull_DevraisLancerIllegalArgumentException() {
        SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel(null)
                .motDePasse("1")
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            specialisteService.createSpecialiste(specialisteCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Courriel NULL");
    }

    @Test
    public void creeSpecialisteAvecNomNull_DevraisLancerIllegalArgumentException() {
        SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                .id(1L)
                .nom(null)
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();


        Exception exception = assertThrows(IllegalArgumentException.class, () -> specialisteService.createSpecialiste(specialisteCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Nom NULL");
    }

    @Test
    public void creeSpecialisteAvecMotDePasseNull_DevraisLancerIllegalArgumentException() {
        SpecialisteCreeDTO specialisteCreeDTO = SpecialisteCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimapct@cc.com")
                .motDePasse(null)
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            specialisteService.createSpecialiste(specialisteCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Mot de pass NULL");
    }
}