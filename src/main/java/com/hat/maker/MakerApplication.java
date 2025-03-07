package com.hat.maker;

import com.hat.maker.service.DepartementService;
import com.hat.maker.service.ResponsableService;
import com.hat.maker.service.SpecialisteService;
import com.hat.maker.service.dto.DepartementDTO;
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
	private final DepartementService departementService;

	public static void main(String[] args) {
		SpringApplication.run(MakerApplication.class, args);
	}

	public void run(String... args) {
		DepartementDTO departementDTO = DepartementDTO.builder()
				.nom("Programmation")
				.build();
		DepartementDTO departementDTO2 = DepartementDTO.builder()
				.nom("Vie de camp")
				.build();
		DepartementDTO departementRetour = departementService.createDepartement(departementDTO);
		DepartementDTO departementRetour2 = departementService.createDepartement(departementDTO2);

		ResponsableCreeDTO responsableDTO = ResponsableCreeDTO.builder()
				.nom("Le Impact")
				.courriel("leimpact@cc.com")
				.motDePasse("1")
				.departement(departementRetour)
				.build();
		responsableService.createResponsable(responsableDTO);

		SpecialisteCreeDTO specialisteDTO = SpecialisteCreeDTO.builder()
				.nom("Azkaban")
				.courriel("azkaban@cc.com")
				.motDePasse("1")
				.departement(departementRetour2)
				.build();
		specialisteService.createSpecialiste(specialisteDTO);
	}
}
