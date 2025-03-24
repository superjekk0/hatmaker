package com.hat.maker.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Embeddable
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TimeSlot {
    private String startTime;
    private String endTime;

    @ElementCollection
    private List<String> periode;
}