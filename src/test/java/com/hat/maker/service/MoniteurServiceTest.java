package com.hat.maker.service;

import com.hat.maker.model.Moniteur;
import com.hat.maker.repository.MoniteurRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.MoniteurCreeDTO;
import com.hat.maker.service.dto.MoniteurDTO;
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
public class MoniteurServiceTest {

    @Mock
    private MoniteurRepository moniteurRepository;
    @Mock
    private UtilisateurRepository utilisateurRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MoniteurService moniteurService;

    @Test
    public void creeMoniteurAvecSucces() {
        MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        Moniteur moniteurRetour = Moniteur.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(moniteurRepository.save(any(Moniteur.class))).thenReturn(moniteurRetour);
        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);

        MoniteurDTO m = moniteurService.createMoniteur(moniteurCreeDTO);
        assertThat(m.getNom()).isEqualTo("Le Impact");
        assertThat(m.getId()).isEqualTo(1L);
        assertThat(m.getCourriel()).isEqualTo("leimpact@cc.com");
    }

    @Test
    public void creeMoniteurAvecEmailExistant_DevraisLancerIllegalArgumentException() {
        MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> moniteurService.createMoniteur(moniteurCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Courriel déjà utilisé");
    }

    @Test
    public void creerMoniteurAvecCourrielNull_DevraisLancerIllegalArgumentException() {
        MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel(null)
                .motDePasse("1")
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            moniteurService.createMoniteur(moniteurCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Courriel NULL");
    }

    @Test
    public void creeMoniteurAvecNomNull_DevraisLancerIllegalArgumentException() {
        MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                .id(1L)
                .nom(null)
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();


        Exception exception = assertThrows(IllegalArgumentException.class, () -> moniteurService.createMoniteur(moniteurCreeDTO));

        assertThat(exception.getMessage()).isEqualTo("Nom NULL");
    }

    @Test
    public void creeMoniteurAvecMotDePasseNull_DevraisLancerIllegalArgumentException() {
        MoniteurCreeDTO moniteurCreeDTO = MoniteurCreeDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("leimapct@cc.com")
                .motDePasse(null)
                .build();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            moniteurService.createMoniteur(moniteurCreeDTO);
        });

        assertThat(exception.getMessage()).isEqualTo("Mot de pass NULL");
    }
}