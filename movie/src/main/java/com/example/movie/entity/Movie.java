package com.example.movie.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    @Column
    private String title;

    @Column
    private String studio;

    @Column
    private Integer releaseYear;

    @Column
    private String poster;

    @ManyToMany
    @JsonBackReference
    Set<Actor> actors;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "director_id")
    private Director director;

    @ManyToMany
    @JsonBackReference
    Set<Genre> genres;
}
