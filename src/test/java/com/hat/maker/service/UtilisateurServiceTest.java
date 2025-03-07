package com.hat.maker.service;

import com.hat.maker.model.*;
import com.hat.maker.model.auth.Role;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.security.JwtTokenProvider;
import com.hat.maker.service.dto.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UtilisateurServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private DepartementService departementService;

    @Mock
    private MoniteurService moniteurService;

    @Mock
    private ResponsableService responsableService;

    @Mock
    private SpecialisteService specialistService;

    @InjectMocks
    private UtilisateurService utilisateurService;

    @Test
    public void authentificationReussi() {
        LoginDTO loginDTO = LoginDTO.builder()
                .courriel("leimpact@cc.com")
                .motDePasse("1")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDTO.getCourriel(), loginDTO.getMotDePasse());
        String expectedToken = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsZWltcGFjdEBjYy5jb20iLCJpYXQiOjE3Mzg5NDI5OTQsImV4cCI6MTczODk0NjU5NCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJFU1BPTlNBQkxFIn1dLCJpZCI6MX0.8_l_-iZ5KhG8_Zcw1fnIgyUeBKZZ2vaZpx7pZHBKUgty88FFEeEWYsjEDP2BJhD-";

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtTokenProvider.generateToken(authentication)).thenReturn(expectedToken);

        String actualToken = utilisateurService.connexionUtilisateur(loginDTO);
        assertEquals(expectedToken, actualToken);
    }

    @Test
    public void authentificationInvalide() {
        LoginDTO loginDTO = LoginDTO.builder()
                .courriel("invalid@gmail.com")
                .motDePasse("wrongpassword")
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Incorrect username or password"));

        assertThrows(RuntimeException.class, () -> {
            utilisateurService.connexionUtilisateur(loginDTO);
        });
    }

    @Test
    public void modifierRoleSpecialisteUtilisateurAvecSucces() {
        SpecialisteDTO utilisateurDTO = SpecialisteDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(1L)
                        .nom("prog")
                        .build())
                .role(Role.SPECIALISTE)
                .build();

        Moniteur utilisateurExistant = Moniteur.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("Vie de camp")
                        .build())
                .build();

        Specialiste utilisateurModifie = Specialiste.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("prog")
                        .build())
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);
        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(departementService.getDepartementById(any(Long.class))).thenReturn(Departement.builder()
                .id(1L)
                .nom("prog")
                .build());
        when(specialistService.createSpecialiste(any(SpecialisteCreeDTO.class))).thenReturn((SpecialisteDTO) SpecialisteDTO.toUtilisateurDTO(utilisateurModifie));

        UtilisateurDTO u = utilisateurService.modifierUtilisateur(utilisateurDTO);
        assertEquals(u.getId(), 1L);
        assertEquals(u.getNom(), "Le Impact");
        assertEquals(u.getCourriel(), "yo");
        assertEquals(u.getDepartement().getId(), 1L);
        assertEquals(u.getDepartement().getNom(), "prog");
        assertEquals(u.getRole(), Role.SPECIALISTE);
    }

    @Test
    public void modifierRoleMoniteureUtilisateurAvecSucces() {
        MoniteurDTO utilisateurDTO = MoniteurDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(1L)
                        .nom("Vie de camp")
                        .build())
                .role(Role.MONITEUR)
                .build();

        Specialiste utilisateurExistant = Specialiste.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("prog")
                        .build())
                .build();

        Moniteur utilisateurModifie = Moniteur.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("Vie de camp")
                        .build())
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);
        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(departementService.getDepartementById(any(Long.class))).thenReturn(Departement.builder()
                .id(1L)
                .nom("Vie de camp")
                .build());
        when(moniteurService.createMoniteur(any(MoniteurCreeDTO.class))).thenReturn((MoniteurDTO) MoniteurDTO.toUtilisateurDTO(utilisateurModifie));

        UtilisateurDTO u = utilisateurService.modifierUtilisateur(utilisateurDTO);
        assertEquals(u.getId(), 1L);
        assertEquals(u.getNom(), "Le Impact");
        assertEquals(u.getCourriel(), "yo");
        assertEquals(u.getDepartement().getId(), 1L);
        assertEquals(u.getDepartement().getNom(), "Vie de camp");
        assertEquals(u.getRole(), Role.MONITEUR);
    }

    @Test
    public void modifierRoleResponsableUtilisateurAvecSucces() {
        ResponsableDTO utilisateurDTO = ResponsableDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(1L)
                        .nom("respo")
                        .build())
                .role(Role.RESPONSABLE)
                .build();

        Specialiste utilisateurExistant = Specialiste.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("prog")
                        .build())
                .build();

        Responsable utilisateurModifie = Responsable.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("respo")
                        .build())
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);
        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(departementService.getDepartementById(any(Long.class))).thenReturn(Departement.builder()
                .id(1L)
                .nom("respo")
                .build());
        when(responsableService.createResponsable(any(ResponsableCreeDTO.class))).thenReturn((ResponsableDTO) ResponsableDTO.toUtilisateurDTO(utilisateurModifie));

        UtilisateurDTO u = utilisateurService.modifierUtilisateur(utilisateurDTO);
        assertEquals(u.getId(), 1L);
        assertEquals(u.getNom(), "Le Impact");
        assertEquals(u.getCourriel(), "yo");
        assertEquals(u.getDepartement().getId(), 1L);
        assertEquals(u.getDepartement().getNom(), "respo");
        assertEquals(u.getRole(), Role.RESPONSABLE);
    }

    @Test
    public void modifierUtilisateurAvecSucces() {
        MoniteurDTO utilisateurDTO = MoniteurDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(2L)
                        .nom("Moniteurs")
                        .build())
                .role(Role.MONITEUR)
                .build();

        Moniteur utilisateurExistant = Moniteur.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("Vie de camp")
                        .build())
                .build();

        Moniteur utilisateurModifie = Moniteur.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("Moniteurs")
                        .build())
                .build();

        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(false);
        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(departementService.getDepartementById(any(Long.class))).thenReturn(Departement.builder()
                .id(1L)
                .nom("Moniteurs")
                .build());
        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(utilisateurModifie);

        UtilisateurDTO u = utilisateurService.modifierUtilisateur(utilisateurDTO);
        assertEquals(u.getId(), 1L);
        assertEquals(u.getNom(), "Le Impact");
        assertEquals(u.getCourriel(), "yo");
        assertEquals(u.getDepartement().getId(), 2L);
        assertEquals(u.getDepartement().getNom(), "Moniteurs");
        assertEquals(u.getRole(), Role.MONITEUR);
    }

    @Test
    public void modifierUtilisateurAvecCourrielNULL() {
        MoniteurDTO utilisateurDTO = MoniteurDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel(null)
                .departement(DepartementDTO.builder()
                        .id(2L)
                        .nom("Moniteurs")
                        .build())
                .role(Role.MONITEUR)
                .build();

        assertThrows(IllegalArgumentException.class, () -> {
            utilisateurService.modifierUtilisateur(utilisateurDTO);
        });
    }

    @Test
    public void modifierUtilisateurAvecNomNull() {
        MoniteurDTO utilisateurDTO = MoniteurDTO.builder()
                .id(1L)
                .nom(null)
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(2L)
                        .nom("Moniteurs")
                        .build())
                .role(Role.MONITEUR)
                .build();

        assertThrows(IllegalArgumentException.class, () -> {
            utilisateurService.modifierUtilisateur(utilisateurDTO);
        });
    }

    @Test void modifierUtilisateurAvecCourrielDejaUtilise() {
        MoniteurDTO utilisateurDTO = MoniteurDTO.builder()
                .id(1L)
                .nom("Le Impact")
                .courriel("yo")
                .departement(DepartementDTO.builder()
                        .id(2L)
                        .nom("Moniteurs")
                        .build())
                .role(Role.MONITEUR)
                .build();

        Moniteur utilisateurExistant = Moniteur.builder()
                .id(2L)
                .nom("Azkaban")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("Vie de camp")
                        .build())
                .build();

        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(utilisateurRepository.existsByCourriel(any(String.class))).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> {
            utilisateurService.modifierUtilisateur(utilisateurDTO);
        });
    }

    @Test
    public void supprimerUtilisateurAvecSucces() {
        Moniteur utilisateurExistant = Moniteur.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("Vie de camp")
                        .build())
                .build();

        Moniteur utilisateurSupprime = Moniteur.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("Vie de camp")
                        .build())
                .deleted(true)
                .build();

        when(utilisateurRepository.findById(any(Long.class))).thenReturn(java.util.Optional.of(utilisateurExistant));
        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(utilisateurSupprime);

        UtilisateurDTO u = utilisateurService.supprimerUtilisateur(MoniteurDTO.toMoniteurDTO(utilisateurExistant));
        assertTrue(u.isDeleted());
    }

    @Test
    public void getAllUtilisateurs() {
        Moniteur moniteur = Moniteur.builder()
                .id(1L)
                .nom("Impact")
                .courriel("oy")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(2L)
                        .nom("Vie de camp")
                        .build())
                .build();

        Specialiste specialiste = Specialiste.builder()
                .id(2L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("prog")
                        .build())
                .build();

        Responsable responsable = Responsable.builder()
                .id(3L)
                .nom("Le Impact")
                .courriel("yo")
                .motDePasse("1")
                .departement(Departement.builder()
                        .id(1L)
                        .nom("prog")
                        .build())
                .build();

        when(utilisateurRepository.findAll()).thenReturn(java.util.List.of(moniteur, specialiste, responsable));

        assertEquals(utilisateurService.getAllUtilisateurs().size(), 3);
    }
}