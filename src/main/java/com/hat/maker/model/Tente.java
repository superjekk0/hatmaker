package com.hat.maker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Tente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String nomTente;
    protected boolean deleted;

    @OneToMany(mappedBy = "tente")
    protected List<Campeur> campeurs;
    @OneToMany(mappedBy = "tente")
    protected List<Moniteur> moniteurs;

}
