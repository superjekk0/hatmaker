package com.hat.maker.controler;

import com.hat.maker.service.SpecialisteService;
import com.hat.maker.service.dto.SpecialisteCreeDTO;
import com.hat.maker.service.dto.SpecialisteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/specialiste")
@RequiredArgsConstructor
public class SpecialisteController {

    private final SpecialisteService specialisteService;

    @PostMapping("/inscription")
    public ResponseEntity<SpecialisteDTO> createEmployeur(@RequestBody SpecialisteCreeDTO specialisteCreeDTO) {
        SpecialisteDTO specialisteSauvegarde;
        try {
            specialisteSauvegarde = specialisteService.createSpecialiste(specialisteCreeDTO);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());

        }
        return ResponseEntity.ok(specialisteSauvegarde);
    }
}