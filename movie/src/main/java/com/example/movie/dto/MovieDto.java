package com.example.movie.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    private Integer movieId;

    // @NotBlank(message = "Movie title can not blank")
    private String title;

    private String director;

    private String studio;

    private Integer releaseYear;

    private String poster;

    private String posterUrl;

    private Set<String> movieCast;

    private Set<String> genre;
}
