package com.hat.maker.controller;

import com.hat.maker.service.UtilisateurService;
import com.hat.maker.service.dto.JWTAuthResponse;
import com.hat.maker.service.dto.LoginDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {
    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping("/connexion")
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDTO login) {
        try {
            String token = utilisateurService.connexionUtilisateur(login);
            final JWTAuthResponse jwtAuthResponse = new JWTAuthResponse(token);
            return ResponseEntity.accepted()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jwtAuthResponse);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
