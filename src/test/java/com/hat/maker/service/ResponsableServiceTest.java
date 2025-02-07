package com.hat.maker.service;

import com.hat.maker.model.Responsable;
import com.hat.maker.repository.ResponsableRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.ResponsableCreeDTO;
import com.hat.maker.service.dto.ResponsableDTO;
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
public class ResponsableServiceTest {

    @Mock
    private ResponsableRepository responsableRepository;
    @Mock
    private UtilisateurRepository utilisateurRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ResponsableService responsableService;

    @Test
    public void creeResponsableAvecSucces() {
        ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        Responsable responsableRetour = Responsable.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(responsableRepository.save(any(Responsable.class))).thenReturn(responsableRetour);
        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);

        ResponsableDTO r = responsableService.createResponsable(responsableCreeDTO);
        assertThat(r.getNom()).isEqualTo("Le Impact");
        assertThat(r.getId()).isEqualTo(1L);
        assertThat(r.getCourriel()).isEqualTo("leimpact@cc.com");
    }

    @Test
    public void creeResponsableAvecEmailExistant_DevraisLancerIllegalArgumentException() {
        ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> responsableService.createResponsable(responsableCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Courriel déjà utilisé");
    }

    @Test
    public void creerResponsableAvecCourrielNull_DevraisLancerIllegalArgumentException() {
        ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel(null)
                .motDePasse("1")
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            responsableService.createResponsable(responsableCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Courriel NULL");
    }

    @Test
    public void creeResponsableAvecNomNull_DevraisLancerIllegalArgumentException() {
        ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                .id(1L)
                .nom(null)
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();


        Exception exception = assertThrows(IllegalArgumentException.class, () -> responsableService.createResponsable(responsableCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Nom NULL");
    }

    @Test
    public void creeResponsableAvecMotDePasseNull_DevraisLancerIllegalArgumentException() {
        ResponsableCreeDTO responsableCreeDTO = ResponsableCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimapct@cc.com")
                .motDePasse(null)
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            responsableService.createResponsable(responsableCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Mot de pass NULL");
    }
}