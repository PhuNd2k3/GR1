package com.example.movie.service.impl;

import com.example.movie.dto.MovieDto;
import com.example.movie.entity.Movie;
import com.example.movie.mapper.MovieMapper;
import com.example.movie.repository.IMovieRepository;
import com.example.movie.service.IFileService;
import com.example.movie.service.IMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements IMovieService {
    @Autowired
    private IMovieRepository movieRepository;

    @Autowired
    private IFileService fileService;

    @Autowired
    private MovieMapper movieMapper;

    @Value("${project.poster}")
    private String path;

    @Override
    public Movie addMovie(MovieDto movieDto, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String uploadedFileName = fileService.uploadFile(path, file);
            movieDto.setPoster(uploadedFileName);
        }
        return movieRepository.save(movieMapper.toMovie(movieDto));
    }

    @Override
    public List<MovieDto> getAllMovie() {
        List<Movie> listMovie = movieRepository.findAll();
        List<MovieDto> result = new ArrayList<>();
        for (Movie it : listMovie) {
            result.add(movieMapper.toMovieDto(it));
        }
        return result;
    }

    @Override
    public MovieDto getMovieById(Integer id) {
        Optional<Movie> existingItemOptional = movieRepository.findById(id);
        if (existingItemOptional.isPresent()) {
            Movie movie = existingItemOptional.get();
            return movieMapper.toMovieDto(movie);
        } else {
            return null;
        }
    }
}
