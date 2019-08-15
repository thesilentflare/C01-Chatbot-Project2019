package com.group8.search.indexer;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.group8.search.models.Article;
import com.group8.search.models.ArticleDAO;
import com.group8.search.models.ArticleDAOImpl;
import com.ibm.cloud.sdk.core.service.security.IamOptions;
import com.ibm.watson.natural_language_understanding.v1.NaturalLanguageUnderstanding;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import com.ibm.watson.natural_language_understanding.v1.model.AnalyzeOptions;
import com.ibm.watson.natural_language_understanding.v1.model.Features;
import com.ibm.watson.natural_language_understanding.v1.model.KeywordsOptions;
import com.ibm.watson.natural_language_understanding.v1.model.KeywordsResult;
import com.ibm.watson.speech_to_text.v1.model.KeywordResult;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFHyperlink;
import org.apache.poi.xwpf.usermodel.XWPFHyperlinkRun;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

public class WebCrawler {
	private HashSet<String> visitedLinks;
	public final static String CORPUS_LOCATION = "./Chatbot Corpus.docx";
	private int corpusQuestionNum = 0;
	
    public WebCrawler() {
        visitedLinks = new HashSet<String>();
    }
    
    public void crawlCorpus(InputStream is) throws IOException {
            XWPFDocument document = new XWPFDocument(is);

            String text = "";
            String question = "";
            String answer = "";
            String questionPattern = "(^\\d+\\. .*)";
            ArrayList<String> answerLinks = new ArrayList<String>();
        	Iterator<XWPFParagraph> iter = document.getParagraphsIterator();
        	while(iter.hasNext()) {
        		XWPFParagraph paragraph = iter.next();
        		text = paragraph.getText().trim();
        		Pattern p = Pattern.compile(questionPattern);
        		Matcher m = p.matcher(text);
        		if(m.find()) {
        			addToDatabase(question, answer, answerLinks);
        			answerLinks = new ArrayList<String>();
        			question =  m.group(1);
        			answer = (text.substring(question.length(),text.length())).trim();   
            	} else {
            		if(question != "") {
            			answer += " "+ text;
                        for(XWPFRun run : paragraph.getRuns()) {
                            if(run instanceof XWPFHyperlinkRun) {
                                XWPFHyperlink link = ((XWPFHyperlinkRun)run).getHyperlink(document);
                                if(link != null) {
                                    answerLinks.add(link.getURL());
                                }
                            }
                        }
            		}
            	}
        	}  
			addToDatabase(question, answer, answerLinks);
            is.close();
            document.close();
    }
    
    public void addToDatabase(String question, String answer, ArrayList<String> answerLinks) {
    	if(question != "") {
    		System.out.println("Question: " + question);
			System.out.println("Answer: "+answer);
			Double initFrequency = 0.0;
			// Get keywords
			List<String> texts = new ArrayList<String>();
			texts.add(question);
			texts.add(answer);
			String keywords = this.getKeywords(texts);
			String articleLink = "None";
    		for(String link: answerLinks) {
				if (articleLink.equals("None")) {
					articleLink = link;
				}
    			System.out.println("Hyperlink:"+link);
    			crawl(question, link, 0);
    			//Article article = new Article("q"+(corpusQuestionNum+1),question,link);
			}
			System.out.println("NAME: " + question + "\n\n\n");
			// Create Article
			Article article = new Article(question, articleLink, keywords, answer, initFrequency);
    		//System.out.println("Article(q"+(corpusQuestionNum+1) + ", "+question +", "+((answerLinks.size()==0) ? "":answerLinks.get(0))+", "+answer+")");
    		System.out.println("------------------------------------------------------------------------------------");
    		//Article article = new Article("q"+(corpusQuestionNum+1),question,(answerLinks.size()==0)? "":answerLinks.get(0),answer);
			ArticleDAO dao = new ArticleDAOImpl();
			System.out.println("ARTICLE: " + article.toString());
			if (dao.doesExist(article.getName())) {
				dao.update(article);
			} else {
				dao.create(article);
			}
    		corpusQuestionNum++;
    	}
    }
    
    public boolean crawl(String question, String seedURL, int depth) {
		boolean res = true;
        if (!visitedLinks.contains(seedURL)) {
            try {
                visitedLinks.add(seedURL);
                Document document = Jsoup.connect(seedURL).get();
            	//System.out.println(seedURL);
            	String text = (document.body()).text();
                String cleanedDocument = clean(text);
                //add to Index
                if(depth!=0) {
                	Elements linksOnPage = document.select("a[href]");
                    for (Element linkElement : linksOnPage) {
                    	String subURL = linkElement.attr("abs:href");
                        crawl(question, subURL, depth-1);
                    }
                }
            } catch (IOException e) {
				System.err.println("Crawl Error on url:" + seedURL);
				res = false;
            }
		} else {
			res = false;
		}
		
		return res;
    }
    
    public String clean(String htmlString) throws IOException{
    	List<String> stopWords = Files.readAllLines(Paths.get("stop_words.txt"));
    	String stopWordsPattern = String.join("|", stopWords);
    	Pattern pattern = Pattern.compile("\\b(?:" + stopWordsPattern + ")\\b\\s*", Pattern.CASE_INSENSITIVE);
    	Matcher matcher = pattern.matcher(htmlString);
    	htmlString = matcher.replaceAll("");
    	System.out.println(htmlString);
    	return htmlString;
    }
    
    public static void main(String[] args) {
		WebCrawler test = new WebCrawler();
		File file = new File(CORPUS_LOCATION);
		InputStream is;
		try {
			is = new FileInputStream(file.getAbsolutePath());
			test.crawlCorpus(is);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	//test.crawl(null, "https://www.cbc.ca/news/canada/manitoba/manhunt-northern-manitoba-mcleod-schmegelsky-1.5225295", 0);
	}
	
	/**
	 * Extract keywords using IBM NLP from a list of String texts
	 * @param texts List<String> - list of texts to extract keywords from
	 * @return String - comma sperated string of keywords
	 */
	public String getKeywords(List<String> texts) {
		StringBuilder keywords = new StringBuilder();

		// Loop through the given texts to extract keywords
		for (String text : texts) {
			IamOptions options = new IamOptions.Builder()
				.apiKey("sMpi-ZodP2Tf_uULnoga9mHWo9v_T_xfdwd4D11Vxtct")
				.build();

			NaturalLanguageUnderstanding naturalLanguageUnderstanding = new NaturalLanguageUnderstanding("2019-07-12", options);
			naturalLanguageUnderstanding.setEndPoint("https://gateway.watsonplatform.net/natural-language-understanding/api");

			KeywordsOptions keywordsOpts = new KeywordsOptions.Builder()
			.sentiment(true)
			.emotion(true)
			.limit(3)
			.build();

			Features features = new Features.Builder()
			.keywords(keywordsOpts)
			.build();

			AnalyzeOptions parameters = new AnalyzeOptions.Builder()
			.text(text)
			.features(features)
			.build();

			AnalysisResults response = naturalLanguageUnderstanding
			.analyze(parameters)
			.execute()
			.getResult();

			// append keywords
			for (KeywordsResult res : response.getKeywords()) {
				keywords.append(res.getText()).append(", ");
			}
			
		}

		// Clean
		keywords.deleteCharAt(keywords.length() - 2);

		return keywords.toString();
	}

}
