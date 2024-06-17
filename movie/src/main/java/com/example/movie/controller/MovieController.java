package com.example.movie.controller;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import com.example.movie.service.IMovieService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/movie")
public class MovieController {

    @Autowired
    private IMovieService movieService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Movie> create(@RequestParam("item") String item,
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        MovieDto movieDto = objectMapper.readValue(item, MovieDto.class);
        Movie savedMovie;
        if (file != null && !file.isEmpty()) {
            savedMovie = movieService.addMovie(movieDto, file);
        } else {
            savedMovie = movieService.addMovie(movieDto, null); // Passing null for file when it's not provided
        }
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDto> getById(@PathVariable("id") Integer id) {
        Optional<MovieDto> existingItemOptional = Optional.ofNullable(movieService.getMovieById(id));

        return existingItemOptional.map(movieDto -> new ResponseEntity<>(movieDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<MovieDto>> getAll() {
        try {
            List<MovieDto> items = movieService.getAllMovie();

            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
