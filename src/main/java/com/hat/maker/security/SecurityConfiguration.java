package com.hat.maker.security;

import com.hat.maker.repository.UtilisateurRepository;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenProvider jwtTokenProvider;
    private final UtilisateurRepository utilisateurRepository;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(POST, "/modifier-utilisateur").hasAuthority("RESPONSABLE")
                        .requestMatchers(DELETE, "/supprimer-utilisateur").hasAuthority("RESPONSABLE")
                        .requestMatchers(GET, "/utilisateurs").hasAuthority("RESPONSABLE")
                        .requestMatchers(POST, "/specialiste/inscription").hasAnyAuthority("SPECIALISTE", "RESPONSABLE")
                        .requestMatchers(POST, "/responsable/inscription").hasAuthority("RESPONSABLE")
                        .requestMatchers(POST, "/moniteur/inscription").permitAll()
                        .requestMatchers("/etat").hasAuthority("RESPONSABLE")
                        .requestMatchers("/departement").hasAuthority("RESPONSABLE")
                        .requestMatchers("/activite").hasAuthority("RESPONSABLE")
                        .requestMatchers("/groupe").hasAuthority("RESPONSABLE")
                        .requestMatchers("/campeur").hasAuthority("RESPONSABLE")
                        .requestMatchers("/tente").hasAuthority("RESPONSABLE")
                        .requestMatchers(GET, "/tente/moniteur/{id}").hasAnyAuthority("MONITEUR", "RESPONSABLE")
                        .requestMatchers("/moniteurs").hasAuthority("RESPONSABLE")
                        .requestMatchers("/horaire-typique").hasAnyAuthority("RESPONSABLE")
                        .requestMatchers("/periode").hasAuthority("RESPONSABLE")
                        .requestMatchers("/connexion").permitAll()
                        .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                        .anyRequest().denyAll()
                )
                .sessionManagement((secuManagement) -> {
                    secuManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(configurer -> configurer.authenticationEntryPoint(authenticationEntryPoint))
        ;

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtTokenProvider, utilisateurRepository);
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}