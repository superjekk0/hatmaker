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
@DiscriminatorValue("S")
public class Specialiste extends Utilisateur {
    @Builder
    public Specialiste(Long id, String nom, String courriel, String motDePasse){
        super(id, nom, Credentials.builder()
                .courriel(courriel)
                .motDePasse(motDePasse)
                .role(Role.SPECIALISTE).build(), false);
    }
}
