package com.example.movie.service;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IMovieService {
    Movie addMovie(MovieDto movieDto, MultipartFile file) throws IOException;

    List<MovieDto> getAllMovie();

    MovieDto getMovieById(Integer id);
}
