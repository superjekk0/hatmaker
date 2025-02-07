package com.hat.maker.service;

import com.hat.maker.security.JwtTokenProvider;
import com.hat.maker.service.dto.LoginDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UtilisateurServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

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
}