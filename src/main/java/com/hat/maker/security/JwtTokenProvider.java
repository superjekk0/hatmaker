package com.hat.maker.security;

import com.hat.maker.model.Utilisateur;
import com.hat.maker.repository.UtilisateurRepository;
import com.hat.maker.security.exception.InvalidJwtTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtTokenProvider {

	@Value("${application.security.jwt.expiration}")
	private int expirationInMs;

	@Value("${application.security.jwt.secret-key}")
	private final String jwtSecret = "2B7E151628AED2A6ABF7158809CF4F3C2B7E151628AED2A6ABF7158809CF4F3C";

	private final UtilisateurRepository utilisateurRepository;

	public JwtTokenProvider(UtilisateurRepository utilisateurRepository) {
		this.utilisateurRepository = utilisateurRepository;
	}

	public String generateToken(Authentication authentication) {
		Object principal = authentication.getPrincipal();
		Long id = null;

		if (principal instanceof String) {
			String courriel = (String) principal;
			Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findUtilisateurByCourriel(courriel);
			if (utilisateurOpt.isPresent()) {
				Utilisateur utilisateur = utilisateurOpt.get();
				id = utilisateur.getId();
			}
		}

		long nowMillis = System.currentTimeMillis();

		JwtBuilder builder = Jwts.builder()
				.setSubject(authentication.getName())
				.setIssuedAt(new Date(nowMillis))
				.setExpiration(new Date(nowMillis + expirationInMs))
				.claim("authorities", authentication.getAuthorities())
				.claim("id", id)
				.signWith(key());
		return builder.compact();
	}

	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	public String getEmailFromJWT(String token) {
		return Jwts.parser()
				.setSigningKey(key())
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}

	public void validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(key()).build().parseClaimsJws(token);
		} catch (SecurityException ex) {
			throw new InvalidJwtTokenException(HttpStatus.BAD_REQUEST, "Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			throw new InvalidJwtTokenException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			throw new InvalidJwtTokenException(HttpStatus.BAD_REQUEST, "Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			throw new InvalidJwtTokenException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			throw new InvalidJwtTokenException(HttpStatus.BAD_REQUEST, "JWT claims string is empty");
		}
	}
}