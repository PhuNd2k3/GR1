package com.example.movie.entity;

import java.sql.Date;
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
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actorId;

    @Column(nullable = false) // This specifies the column cannot be null
    private String fullName;

    @Column
    private Date DOB;

    @Column
    private String gender;

    @Column
    private String contactNumber;

    @ManyToMany
    @JsonBackReference
    Set<Movie> castedMovies;
}
