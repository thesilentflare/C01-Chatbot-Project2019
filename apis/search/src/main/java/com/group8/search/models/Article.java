package com.group8.search.models;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexableField;

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
    private Double frequency;

    @Transient
    private String[] KEYS = {"name", "url", "keywords", "text", "frequency"};
    @Transient
    private Map<String, Object> values = new HashMap<String, Object>();

    /**
     * Constructs a new empty Article object
     */
    public Article() {
        // Initialize instance fields
        this.name = null;
        this.url = null;
        this.keywords = null;
        this.text = null;
        this.frequency = null;
    }

    /**
     * Construts a new Article object with name, url, keywords, and text
     * @param name String - the name of this Article
     * @param url String - the url of this Article
     * @param keywords String - the keywords that can identify this Article
     * @param text String - the keywords that this Article contains
     * @param freq Double - the frequency count for this Aritcle
     */
    public Article(String name, String url, String keywords,
                   String text, Double freq) {
        // Initialize instance fields
        this.name = name;
        this.url = url;
        this.keywords = keywords;
        this.text = text;
        this.frequency = freq;

        // Set dictionary
        this.values.put(KEYS[0], name);
        this.values.put(KEYS[1], url);
        this.values.put(KEYS[2], keywords);
        this.values.put(KEYS[3], text);
        this.values.put(KEYS[4], freq);

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
     * Get the frequency count for this Article
     * @return Double - the frequency count
     */
    public Double getFrequency() {
        return this.frequency;
    }

    /**
     * Set a new frequency count for this Article
     * @param freq Double - the new frequency count to be set
     */
    public void setFrequency(Double freq) {
        this.frequency = freq;
        this.values.put(KEYS[4], freq);
    }

    /**
     * If the frequency is not null, then increment the frequency count by 1
     * @return Double - the updated frequency count for this Article
     */
    public Double incrementFrequency() {
        if (this.frequency != null) {
            this.frequency++;
        }

        return this.frequency;
    }

    /**
     * Get the name for the attibutes of this Aticle object
     * @return String[] - names
     */
    public String[] getKeys() {
        return this.KEYS;
    }

    /**
     * Given a Lucene Document object convert to an Atricle Object
     * @param doc Document - the Luccene Docuemnt to be converted
     * @return Article - the resulting Articel representation
     */
    public Article convertToArticle(Document doc) {
        System.out.println("-------------" + doc.getFields().toString() + "\n\n");
        this.setName(doc.get(this.KEYS[0]));
        this.setUrl(doc.get(this.KEYS[1]));
        this.setKeywords(doc.get(this.KEYS[2]));
        this.setText(doc.get(this.KEYS[3]));
        try {
            IndexableField freqField = doc.getField(this.KEYS[4]);
            Number freqCount = freqField.numericValue();
            this.setFrequency(freqCount.doubleValue());
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
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
                this.text.equals(other.text) &&
                this.frequency.equals(other.frequency));
    }

    @Override
    public String toString() {
        return ("{" + "'name':'" + this.getName() + "'" + ", 'url':'" +
                this.getUrl() + "'" + ", 'keywords':'" + this.getKeywords() +
                "'" + ", 'text':'" + this.getText() + "'" + 
                ", 'frequency':'" + this.getFrequency() + "'" + "}");
    }

    public boolean isEmpty() {
        return (this.name == null && this.url == null &&
                this.keywords == null && this.text == null &&
                this.frequency == null);
    }

    /**
     * Get an iterator to move though the Article valules
     * @return Iterator - iterate through Article
     */
    public Iterator<Object> getIterator() {
        return new ArticleIterator(this);
    }

    public class ArticleIterator implements Iterator<Object> {

        // Instance fields
        private Map<String, Object> values;
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
         * @return Object - the next field
         */
        public Object next() {
            Object res = null;
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
         * @return Object - current val being pointed too
         */
        public Object currentValue() {
            Object res;
            try {
                res = this.values.get(this.keys[this.index]);
            } catch (IndexOutOfBoundsException ex) {
                res = null;
            }
            
            return res;
        }

    }

}
