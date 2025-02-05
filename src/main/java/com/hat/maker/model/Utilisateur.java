package com.hat.maker.model;

import com.hat.maker.model.auth.Credentials;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "utilisateur_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String nom;
    protected Credentials credentials;

    public String getCourriel(){
        return credentials.getUsername();
    }

    public String getMotDePasse(){
        return credentials.getPassword();
    }

    public Collection<? extends GrantedAuthority> getAuthorities(){
        return credentials.getAuthorities();
    }
}
