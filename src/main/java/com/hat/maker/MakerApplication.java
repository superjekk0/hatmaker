package com.hat.maker;

import com.hat.maker.service.EtatService;
import com.hat.maker.service.ResponsableService;
import com.hat.maker.service.SpecialisteService;
import com.hat.maker.service.dto.EtatDTO;
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
	private final EtatService etatService;

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

		EtatDTO etatDTO = EtatDTO.builder()
				.id(1L)
				.nom("ON")
				.build();
		EtatDTO etatDTO2 = EtatDTO.builder()
				.id(2L)
				.nom("OFF")
				.build();
		etatService.createEtat(etatDTO2);
		etatService.createEtat(etatDTO);
	}
}
