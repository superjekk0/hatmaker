package com.hat.maker.service;


import com.hat.maker.model.Responsable;
import com.hat.maker.repository.ResponsableRepository;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.service.dto.ResponsableCreeDTO;
import com.hat.maker.service.dto.ResponsableDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResponsableService {
    private final ResponsableRepository responsableRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponsableDTO createResponsable(ResponsableCreeDTO responsableCreeDTO) {
        ValidationService.validerResponsableFields(responsableCreeDTO);

        if (utilisateurRepository.existsByCourriel(responsableCreeDTO.getCourriel())) {
            ValidationService.throwCourrielDejaUtilise();
        }

        Responsable responsable = Responsable.builder()
                .nom(responsableCreeDTO.getNom())
                .courriel(responsableCreeDTO.getCourriel())
                .motDePasse(passwordEncoder.encode(responsableCreeDTO.getMotDePasse()))
                .build();
        Responsable responsableRetour = responsableRepository.save(responsable);
        return ResponsableDTO.toResponsableDTO(responsableRetour);
    }
}
