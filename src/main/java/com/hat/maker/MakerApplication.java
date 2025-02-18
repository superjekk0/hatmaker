package com.hat.maker;

import com.hat.maker.service.ResponsableService;
import com.hat.maker.service.SpecialisteService;
import com.hat.maker.service.dto.ResponsableCreeDTO;
import com.hat.maker.service.dto.SpecialisteCreeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class MakerApplication implements CommandLineRunner {
	private final ResponsableService responsableService;
	private final SpecialisteService specialisteService;

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

		SpecialisteCreeDTO specialisteDTO = SpecialisteCreeDTO.builder()
				.id(1L)
				.nom("Azkaban")
				.courriel("azkaban@cc.com")
				.motDePasse("1")
				.build();
		specialisteService.createSpecialiste(specialisteDTO);
	}
}
