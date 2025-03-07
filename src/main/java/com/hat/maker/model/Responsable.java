package com.hat.maker.model;

import com.hat.maker.model.auth.Credentials;
import com.hat.maker.model.auth.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("R")
public class Responsable extends Utilisateur {
    @Builder
    public Responsable(Long id, String nom, String courriel, String motDePasse, boolean deleted, Departement departement) {
        super(id, nom, Credentials.builder()
                .courriel(courriel)
                .motDePasse(motDePasse)
                .role(Role.RESPONSABLE).build(), deleted, departement);
    }
}
