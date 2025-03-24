package com.hat.maker.service.dto;

import com.hat.maker.model.TimeSlot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TimeSlotDTO {
    private String startTime;
    private String endTime;
    private List<String> periode;

    public static TimeSlotDTO toTimeSlotDTO(TimeSlot timeSlot) {
        return TimeSlotDTO.builder()
            .startTime(timeSlot.getStartTime())
            .endTime(timeSlot.getEndTime())
            .periode(timeSlot.getPeriode())
            .build();
    }

    public static List<TimeSlotDTO> toTimeSlotDTO(List<TimeSlot> timeSlots) {
        return timeSlots.stream()
                .map(TimeSlotDTO::toTimeSlotDTO)
                .collect(Collectors.toList());
    }
}
