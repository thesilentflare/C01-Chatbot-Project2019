package com.group8.search;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.annotation.PostConstruct;

import com.group8.search.indexer.WebCrawler;;

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
    
    @PostConstruct
    public void init() {
        try {
            File file = new File("./Chatbot Corpus.docx");
            FileInputStream fis = new FileInputStream(file.getAbsolutePath());
            WebCrawler wc = new WebCrawler();

            wc.crawlCorpus(fis);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.err.println("File not found");;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}