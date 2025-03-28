package com.hat.maker.service.dto;

import com.hat.maker.model.Periode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PeriodeDTO {
    private Long id;
    private String startTime;
    private String endTime;
    private String periode;
    private boolean deleted;

    public static PeriodeDTO toPeriodeDTO(Periode periode) {
        return PeriodeDTO.builder()
                .id(periode.getId())
                .startTime(periode.getStartTime())
                .endTime(periode.getEndTime())
                .periode(periode.getPeriode())
                .deleted(periode.isDeleted())
                .build();
    }
}
