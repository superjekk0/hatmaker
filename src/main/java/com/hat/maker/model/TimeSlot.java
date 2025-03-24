package com.hat.maker.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Embeddable
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TimeSlot {
    private String startTime;
    private String endTime;
    private String periode;
}