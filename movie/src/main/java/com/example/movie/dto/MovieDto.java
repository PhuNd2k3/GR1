package com.example.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    private Integer movieId;

    private String title;

    private String director;

    private String studio;

    private Set<String> movieCast;

    private Integer releaseYear;

    private String poster;

    private String posterUrl;
}
