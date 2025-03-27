package com.hat.maker.service;

import com.hat.maker.model.HoraireTypique;
import com.hat.maker.model.TimeSlot;
import com.hat.maker.repository.HoraireTypiqueRepository;
import com.hat.maker.service.dto.HoraireTypiqueDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HoraireTypiqueService {
    private final HoraireTypiqueRepository horaireTypiqueRepository;

    public HoraireTypiqueDTO createHoraireTypique(HoraireTypiqueDTO horaireTypiqueDTO) {
        ValidationService.validerHoraireTypiqueFields(horaireTypiqueDTO);
        HoraireTypique horaireTypique = HoraireTypique.builder()
                .nom(horaireTypiqueDTO.getNom())
                .timeSlots(getTimeSlots(horaireTypiqueDTO))
                .build();
        HoraireTypique horaireTypiqueRetour = horaireTypiqueRepository.save(horaireTypique);
        return HoraireTypiqueDTO.toHoraireTypiqueDTO(horaireTypiqueRetour);
    }

    public HoraireTypiqueDTO supprimerHoraireTypique(HoraireTypiqueDTO horaireTypiqueDTO) {
        HoraireTypique horaireTypique = getHoraireTypiqueById(horaireTypiqueDTO.getId());
        horaireTypique.setDeleted(true);
        return HoraireTypiqueDTO.toHoraireTypiqueDTO(horaireTypiqueRepository.save(horaireTypique));
    }

    public List<HoraireTypiqueDTO> getAllHoraireTypique() {
        return horaireTypiqueRepository.findAll().stream()
                .map(HoraireTypiqueDTO::toHoraireTypiqueDTO)
                .toList();
    }

    private HoraireTypique getHoraireTypiqueById(Long id) {
        return horaireTypiqueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'horaire typique n'existe pas"));
    }

    private List<TimeSlot> getTimeSlots(HoraireTypiqueDTO horaireTypiqueDTO) {
        return horaireTypiqueDTO.getTimeSlots().stream()
                .map(timeSlotDTO -> TimeSlot.builder()
                        .startTime(timeSlotDTO.getStartTime())
                        .endTime(timeSlotDTO.getEndTime())
                        .periode(timeSlotDTO.getPeriode())
                        .build())
                .collect(Collectors.toList());
    }
}
