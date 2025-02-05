package com.hat.maker;

import com.hat.maker.service.ResponsableService;
import com.hat.maker.service.dto.ResponsableCreeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class MakerApplication implements CommandLineRunner {
	private final ResponsableService responsableService;

	public static void main(String[] args) {
		SpringApplication.run(MakerApplication.class, args);
	}

	public void run(String... args) {
		ResponsableCreeDTO responsableDTO = ResponsableCreeDTO.builder()
				.id(1L)
				.nom("Le Impact")
				.courriel("leimpact@cc.com")
				.motDePasse("1")
				.build();
		responsableService.createResponsable(responsableDTO);
	}
}
