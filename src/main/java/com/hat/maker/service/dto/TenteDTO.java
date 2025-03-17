package com.hat.maker.service.dto;

import com.hat.maker.model.Tente;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@NoArgsConstructor
@SuperBuilder
public class TenteDTO {
    private Long id;
    private String nomTente;
    private List<CampeurDTO> campeurs;
    private List<MoniteurDTO> moniteurs;
    private boolean deleted;

    public static TenteDTO toTenteDTO(Tente tente) {
        if(tente == null) {throw new IllegalArgumentException("Tente est null !");}
        return TenteDTO.builder()
                .id(tente.getId())
                .nomTente(tente.getNomTente())
                .deleted(tente.isDeleted())
                .campeurs(CampeurDTO.toCampeurDTO(tente.getCampeurs()))
                .moniteurs(MoniteurDTO.toMoniteurDTO(tente.getMoniteurs()))
                .build();
    }
}
