package com.example.movie.service.impl;

import com.example.movie.service.IFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileServiceImpl implements IFileService {

    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {

        String fileName = Objects.requireNonNull(file.getOriginalFilename()).replaceAll("\\s+", "");

        String filePath = path + File.separator + fileName;

        File f = new File(path);
        if (!f.exists()) {
            f.mkdir();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    @Override
    public InputStream getResourceFile(String path, String fileName) throws FileNotFoundException {
        String filePath = path + File.separator + fileName;

        return new FileInputStream(filePath);
    }

    @Override
    public String getFilePath(String path, String fileName) {
        return path + File.separator + fileName;
    }
}
