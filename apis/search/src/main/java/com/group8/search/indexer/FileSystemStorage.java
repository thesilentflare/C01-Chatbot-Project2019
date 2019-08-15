package com.group8.search.indexer;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemStorage implements Storage {

    private Path location;
    private final String PATH_NAME = "./uploads/";

    @Autowired
    public FileSystemStorage() {
        this.location = Paths.get(PATH_NAME);
    }

    public Path getLocation() {
        return this.location;
    }

    public void setLocation(Path location) {
        this.location = location;
    }

    
    public void store(MultipartFile file) throws IOException {
        // Clean file name
        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        // Check for an empty file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Failed to store empty file " + filename);
        }

        // Check for a relative path
        if (filename.contains("..")) {
            // This is a security check
            throw new IllegalArgumentException(
                    "Cannot store file with relative path outside current directory "
                            + filename);
        }
        
        // Store file
        InputStream inputStream = file.getInputStream();
        Files.copy(inputStream, this.getLocation().resolve(filename),
                   StandardCopyOption.REPLACE_EXISTING);
    }

    
    // public Stream<Path> loadAll() {
    //     try {
    //         return Files.walk(this.getLocation(), 1)
    //             .filter(path -> !path.equals(this.getLocation()))
    //             .map(this.rootLocation::relativize);
    //     }
    //     catch (IOException e) {
    //         throw new StorageException("Failed to read stored files", e);
    //     }

    // }

    
    public Path load(String filename) {
        return this.getLocation().resolve(filename);
    }

    
    /**
     * Given a name of a file, generate a Resource, otherwise
     * return null is not possible
     * @param filename String - the name of the file
     * @return Resource
     */
    public Resource loadAsResource(String filename) {
        Resource res;
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                res = resource;
            } else {
                res = null;
            }
        }
        catch (MalformedURLException e) {
            e.printStackTrace();
            res = null;
        }

        return res;
    }

   
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(this.getLocation().toFile());
    }

}