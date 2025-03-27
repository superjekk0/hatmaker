package com.hat.maker.service.dto;

import com.hat.maker.model.HoraireTypique;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class HoraireTypiqueDTO {
    private Long id;
    private String nom;
    private boolean deleted;
    List<TimeSlotDTO> timeSlots = new ArrayList<>();

    public static HoraireTypiqueDTO toHoraireTypiqueDTO(HoraireTypique horaireTypique) {
        return HoraireTypiqueDTO.builder()
            .id(horaireTypique.getId())
            .nom(horaireTypique.getNom())
            .deleted(horaireTypique.isDeleted())
            .timeSlots(TimeSlotDTO.toTimeSlotDTO(horaireTypique.getTimeSlots()))
            .build();
    }

}
