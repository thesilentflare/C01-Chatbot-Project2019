package com.group8.search.models;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.lucene.document.Document;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
@Table(name = "Article")
public class Article {
    // Fields
    @Id
    private String name;
    private String url;
    private String keywords;
    private String text;

    @Transient
    private String[] KEYS = {"name", "url", "keywords", "text"};
    @Transient
    private Map<String, String> values = new HashMap<String, String>();

    /**
     * Constructs a new empty Article object
     */
    public Article() {
        // Initialize instance fields
        this.name = null;
        this.url = null;
        this.keywords = null;
        this.text = null;
    }

    /**
     * Construts a new Article object with name, url, keywords, and text
     * @param name String - the name of this Article
     * @param url String - the url of this Article
     * @param keywords String - the keywords that can identify this Article
     * @param text String - the keywords that this Article contains
     */
    public Article(String name, String url, String keywords, String text) {
        // Initialize instance fields
        this.url = url;
        this.keywords = keywords;
        this.text = text;

        // Set dictionary
        this.values.put(KEYS[0], name);
        this.values.put(KEYS[1], url);
        this.values.put(KEYS[2], keywords);
        this.values.put(KEYS[3], text);

    }

    /**
     * Get the name of this Article
     * @return String - the same
     */
    public String getName() {
        return this.name;
    }

    /**
     * Set a new name for this Article
     * @param name String - the new name to be set
     */
    public void setName(String name) {
        this.name = name;
        this.values.put(KEYS[0], name);
    }

    /**
     * Get the url for this Article
     * @return String - the url
     */
    public String getUrl() {
        return this.url;
    }

    /**
     * Set a new url for this Article
     * @param url String - the new url to be set
     */
    public void setUrl(String url) {
        this.url = url;
        this.values.put(KEYS[1], url);
    }

    /**
     * Get the keywords for this Article
     * @return String - the keywords
     */
    public String getKeywords() {
        return this.keywords;
    }

    /**
     * Set a new string of keywords for this Article
     * @param keywords String - the new string of keywords to be set
     */
    public void setKeywords(String keywords) {
        this.keywords = keywords;
        this.values.put(KEYS[2], keywords);
    }

    /**
     * Get the text for this Article
     * @return String - the text
     */
    public String getText() {
        return this.text;
    }

    /**
     * Set a new text for this Article
     * @param text String - the new text to be set
     */
    public void setText(String text) {
        this.text = text;
        this.values.put(KEYS[3], text);
    }

    /**
     * Given a Lucene Document object convert to an Atricle Object
     * @param doc Document - the Luccene Docuemnt to be converted
     * @return Article - the resulting Articel representation
     */
    public Article convertToArticle(Document doc) {
        this.setName(doc.get(this.KEYS[0]));
        this.setUrl(doc.get(this.KEYS[1]));
        this.setKeywords(doc.get(this.KEYS[2]));
        this.setText(doc.get(this.KEYS[3]));
        return this;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;
        if (!(obj instanceof Article)) {
            return false;
        }
        Article other = (Article) obj;
        return (this.name.equals(other.name) &&
                this.url.equals(other.url) &&
                this.keywords.equals(other.keywords) &&
                this.text.equals(other.text));
    }

    @Override
    public String toString() {
        return "{" + "'name':'" + getName() + "'" + ", 'url':'" +
                getUrl() + "'" + ", 'keywords':'" + getKeywords() +
                "'" + ", 'text':'" + getText() + "'" + "}";
    }

    public boolean isEmpty() {
        return (this.name == null && this.url == null &&
                this.keywords == null && this.text == null);
    }

    /**
     * Get an iterator to move though the Article valules
     * @return Iterator - iterate through Article
     */
    public Iterator<String> getIterator() {
        return new ArticleIterator(this);
    }

    public class ArticleIterator implements Iterator<String> {

        // Instance fields
        private Map<String, String> values;
        private String[] keys;
        private int index;


        /**
         * Constrcuts a ArticleIterator object
         * @param art Article - the Article to be iterated over 
         */
        public ArticleIterator(Article art) {
            this.values = art.values;
            this.keys = art.KEYS;
            this.index = 0;
        }

        /**
         * Check if this Article has another field to iterate
         * @return boolean - true if there is another field, otherwise false
         */
        public boolean hasNext() {
            return this.index < this.keys.length;
        }

        /**
         * Get the next field of this Article to be iterated
         * @return String - the next field
         */
        public String next() {
            String res = null;
            // Check if there is another field for this Article
            if (this.hasNext()) {
                // Get the next field for this Article
                res = this.values.get(this.keys[this.index]);
                this.index++;
            }
            return res;
        }

        /**
         * Get the current value being pointed too in the Artile row
         * 
         * @return String - current val being pointed too
         */
        public String currentValue() {
            String res;
            try {
                res = this.values.get(this.keys[this.index]);
            } catch (IndexOutOfBoundsException ex) {
                res = null;
            }
            
            return res;
        }

    }

}
