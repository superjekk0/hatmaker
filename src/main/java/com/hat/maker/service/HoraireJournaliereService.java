package com.hat.maker.service;

import com.hat.maker.model.HoraireJournaliere;
import com.hat.maker.repository.HoraireJournaliereRepository;
import com.hat.maker.service.dto.HoraireJournaliereDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HoraireJournaliereService {
    private final HoraireJournaliereRepository horaireJournaliereRepository;

    public HoraireJournaliereDTO createHoraireJournaliere(HoraireJournaliereDTO horaireJournaliereDTO) {
        ValidationService.validerHoraireJournaliereFields(horaireJournaliereDTO);
        HoraireJournaliere horaireJournaliere = HoraireJournaliere.builder()
                .name(horaireJournaliereDTO.getName())
                .startDate(horaireJournaliereDTO.getStartDate())
                .endDate(horaireJournaliereDTO.getEndDate())
                .infos(horaireJournaliereDTO.getInfos())
                .selectedType(horaireJournaliereDTO.getSelectedType())
                .selectedDepartements(horaireJournaliereDTO.getSelectedDepartements())
                .selectedPeriodes(horaireJournaliereDTO.getSelectedPeriodes())
                .cells(horaireJournaliereDTO.getCells())
                .build();
        HoraireJournaliere savedHoraire = horaireJournaliereRepository.save(horaireJournaliere);
        return HoraireJournaliereDTO.toHoraireJournaliereDTO(savedHoraire);
    }

    public HoraireJournaliereDTO modifierHoraireJournaliere(HoraireJournaliereDTO horaireJournaliereDTO) {
        ValidationService.validerHoraireJournaliereFields(horaireJournaliereDTO);

        HoraireJournaliere horaireJournaliere = getHoraireJournaliereById(horaireJournaliereDTO.getId());
        horaireJournaliere.setName(horaireJournaliereDTO.getName());
        horaireJournaliere.setStartDate(horaireJournaliereDTO.getStartDate());
        horaireJournaliere.setEndDate(horaireJournaliereDTO.getEndDate());
        horaireJournaliere.setInfos(horaireJournaliereDTO.getInfos());
        horaireJournaliere.setSelectedType(horaireJournaliereDTO.getSelectedType());
        horaireJournaliere.setSelectedDepartements(horaireJournaliereDTO.getSelectedDepartements());
        horaireJournaliere.setSelectedPeriodes(horaireJournaliereDTO.getSelectedPeriodes());
        horaireJournaliere.setCells(horaireJournaliereDTO.getCells());

        return HoraireJournaliereDTO.toHoraireJournaliereDTO(horaireJournaliereRepository.save(horaireJournaliere));
    }

    public HoraireJournaliereDTO supprimerHoraireJournaliere(HoraireJournaliereDTO horaireJournaliereDTO) {
        HoraireJournaliere horaireJournaliere = getHoraireJournaliereById(horaireJournaliereDTO.getId());
        horaireJournaliere.setDeleted(true);
        return HoraireJournaliereDTO.toHoraireJournaliereDTO(horaireJournaliereRepository.save(horaireJournaliere));
    }

    public List<HoraireJournaliereDTO> getAllHoraireJournaliere() {
        return horaireJournaliereRepository.findAll().stream()
                .map(HoraireJournaliereDTO::toHoraireJournaliereDTO)
                .collect(Collectors.toList());
    }

    private HoraireJournaliere getHoraireJournaliereById(Long id) {
        return horaireJournaliereRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'horaire journalière n'existe pas"));
    }
}