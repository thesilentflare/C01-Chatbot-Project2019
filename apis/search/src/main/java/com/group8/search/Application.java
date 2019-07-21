package com.group8.search;

import java.io.IOException;
import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.group8.search.indexer.Indexer;

@SpringBootApplication
public class Application {

    /**
     * Start up Spring application
     * @param args String[] - given arguments
     */
    public static void main(String[] args) {
        //Indexer indexer = Indexer.getInstance();
        SpringApplication.run(Application.class, args);
    }
}