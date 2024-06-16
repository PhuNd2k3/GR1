package com.example.movie.mapper;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class MovieMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.poster}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public MovieDto toMovieDto(Movie movie) {
        MovieDto movieDto = modelMapper.map(movie, MovieDto.class);
        movieDto.setPosterUrl(baseUrl + "/api/file/" + URLEncoder.encode(movie.getPoster(), StandardCharsets.UTF_8));
        return movieDto;
    }

    public Movie toMovie(MovieDto movieDto) {
        return modelMapper.map(movieDto, Movie.class);
    }
}
