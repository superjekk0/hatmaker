package com.hat.maker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Campeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String nom;
    protected String prenom;
    protected String information;
    protected String genre;
    protected boolean deleted;

    @ManyToOne
    protected Groupe groupe;

}
