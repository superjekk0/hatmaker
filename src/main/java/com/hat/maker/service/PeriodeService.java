package com.hat.maker.service;

import com.hat.maker.model.Periode;
import com.hat.maker.repository.PeriodeRepository;
import com.hat.maker.service.dto.PeriodeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeriodeService {
    private final PeriodeRepository periodeRepository;

    public PeriodeDTO createPeriode(PeriodeDTO periodeDTO) {
        ValidationService.validerPeriodeFields(periodeDTO);

        Periode periode = Periode.builder()
                .periode(periodeDTO.getPeriode())
                .startTime(periodeDTO.getStartTime())
                .endTime(periodeDTO.getEndTime())
                .build();
        Periode periodeRetour = periodeRepository.save(periode);
        return PeriodeDTO.toPeriodeDTO(periodeRetour);
    }

    public PeriodeDTO modifierPeriode(PeriodeDTO periodeDTO) {
        ValidationService.validerPeriodeFields(periodeDTO);

        Periode periode = getPeriodeById(periodeDTO.getId());
        periode.setPeriode(periodeDTO.getPeriode());
        periode.setStartTime(periodeDTO.getStartTime());
        periode.setEndTime(periodeDTO.getEndTime());

        return PeriodeDTO.toPeriodeDTO(periodeRepository.save(periode));
    }

    public PeriodeDTO supprimerPeriode(PeriodeDTO periodeDTO) {
        Periode periode = getPeriodeById(periodeDTO.getId());
        periode.setDeleted(true);
        return PeriodeDTO.toPeriodeDTO(periodeRepository.save(periode));
    }

    public List<PeriodeDTO> getAllPeriode() {
        return periodeRepository.findAll().stream()
                .map(PeriodeDTO::toPeriodeDTO)
                .toList();
    }

    private Periode getPeriodeById(Long id) {
        return periodeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("La période n'existe pas"));
    }

}
