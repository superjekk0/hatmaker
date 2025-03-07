package com.hat.maker.model.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Embeddable
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Credentials implements UserDetails {
    protected String courriel;
    protected String motDePasse;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Override
    public String getPassword() {
        return this.motDePasse;
    }

    @Override
    public String getUsername() {
        return this.courriel;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }

}
