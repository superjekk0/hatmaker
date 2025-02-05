package com.hat.maker.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class LoginDTO {
    private String courriel;
    private String motDePasse;
}
