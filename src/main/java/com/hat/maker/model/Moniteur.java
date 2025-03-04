package com.hat.maker.model;

import com.hat.maker.model.auth.Credentials;
import com.hat.maker.model.auth.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("M")
public class Moniteur extends Utilisateur {
    @Builder
    public Moniteur(Long id, String nom, String courriel, String motDePasse, Departement departement) {
        super(id, nom, Credentials.builder()
                .courriel(courriel)
                .motDePasse(motDePasse)
                .role(Role.MONITEUR).build(), false, departement);
    }
}
