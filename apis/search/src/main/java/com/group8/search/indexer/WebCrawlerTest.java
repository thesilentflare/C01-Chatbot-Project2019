package com.group8.search.indexer;

import static org.junit.Assert.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
//import org.mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;


import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.group8.search.models.Article;
import com.group8.search.models.ArticleDAOImpl;

public class WebCrawlerTest {
	public WebCrawler test;
	public String CORPUS_LOCATION;
	
	@Before
	public void setUp() throws Exception {
		this.CORPUS_LOCATION = "./Chatbot Corpus.docx";
		this.test = new WebCrawler();
		//test.crawlCorpus(is);
	}

	/*@Test
	public void testWebCrawler() {

		//fail("Not yet implemented");
	}*/

	@Test
	public void testCrawlCorpus() throws Exception {
		//Arrange
		File file = new File(CORPUS_LOCATION);
		InputStream is = new FileInputStream(file.getAbsolutePath());	
		WebCrawler mockCrawler = Mockito.spy(WebCrawler.class);
		final ArrayList<String> actualQuestions = new ArrayList<String>();
		final ArrayList<ArrayList<String>> actualHyperlinks = new ArrayList<ArrayList<String>>();
		

		final Answer getQuestion = new Answer() {
			public Object answer(InvocationOnMock invocation) throws Throwable {
				String question = (String) invocation.getArguments()[0];
				ArrayList<String> answerLinks = (ArrayList<String>) invocation.getArguments()[2];
				if(question != "") {
					actualQuestions.add(question);
					actualHyperlinks.add(answerLinks);
					System.out.println(question);
					for(String link: answerLinks) {
						System.out.println(link);
					}
				}
		        return null;
		    }
		};
		Mockito.doAnswer(getQuestion).when(mockCrawler).addToDatabase(Mockito.anyString(), Mockito.anyString(), Mockito.any(ArrayList.class));
		
		//Call
		mockCrawler.crawlCorpus(is);
		
		//Str
		String[] expectedQuestions = {
			"1. How does the government of Canada support new FinTech businesses?",
			"2. How does the government of Canada support new AI companies?", 
			"3. Where can I get business support for my startup?",
			"4. Who can I talk to about Innovation Canada programs?",
			"5. How can I get grants or financing for my FinTech business?",
			"6. How can I get grants or financing for my AI business?", 
			"7. What tax credits are available from the government?", 
			"8. Which programs will help me pay for an intern?",
			"9. Who can I talk to about scaling or growing my business?",
			"10. What is microfinance?", 
			"11. What is open banking?",
			"12. How can I buy Bitcoin safely in Canada?", 
			"13. What is the Digital Finance Institute?", 
			"14. What is Fintech Canada?",
			"15. What are the Canadian FinTech and AI Awards", 
			"16. Where is the FinTech hub of Canada?", 
			"17. What is the Canada Business Network?", 
			"18. What is FinTech?",
			"19. What industries are related to FinTech?", 
			"20. How can FinTech help my business?", 
			"21. Is Canada a Fintech leader?",
			"22. Where is the highest concentration of AI startups in the world?",
			"23. How does the Ontario Securities Commission’s regulatory sandbox help fintechs?",
			"24. What is a regulatory sandbox?",
			"25. How is Canada’s infrastructure sector innovating?",
			"26. What is Grab?",
			"27. Why is cash an obstacle for development?",
			"28. How can the digitization of payments reduce poverty?"
		};
		
		String [][] expectedHyperlinks = {
				{"http://x-msg://59/innovation.canada.ca"},
				{"http://x-msg://59/innovation.canada.ca"},
				{
					"https://www.canada.ca/en/innovation-science-economic-development/programs/small-business-financing-growth/innovation-superclusters.html", 
					"https://www.canada.ca/en/innovation-science-economic-development/programs/strategic-innovation-fund.html",
					"http://www.ic.gc.ca/eic/site/101.nsf/eng/home", 
					"http://www.ic.gc.ca/eic/site/099.nsf/eng/home", 
					"https://www.canada.ca/en/innovation-science-economic-development/programs/accelerated-growth-service.html",
					"https://www.ic.gc.ca/app/scr/innovation?lang=eng"
				},
				{"https://www.ic.gc.ca/app/scr/innovation?lang=eng"},
				{"https://www.ic.gc.ca/app/scr/innovation?lang=eng"},
				{"https://www.ic.gc.ca/app/scr/innovation?lang=eng"},
				{"https://www.ic.gc.ca/app/scr/innovation?lang=eng"},
				{"https://www.ic.gc.ca/app/scr/innovation?lang=eng"},
				{},{},{},
				{"http://coincurve.com"},
				{},{},{},{},{},{},{},{},{},{},{},{},{},{},
				{"https://www.betterthancash.org/tools-research/resources/the-global-findex-database-2017"},
				{}
				
		};
		
		//Assert
		assertArrayEquals(expectedQuestions, actualQuestions.toArray());
		for(int i = 0; i < expectedQuestions.length; i++) {
			assertArrayEquals(expectedHyperlinks[i], actualHyperlinks.get(i).toArray());
		}
	}

   // @Test
	//public void testCrawl() {
	//	fail("Not yet implemented");
	//}

	@Test
	public void testClean() throws IOException {
		String textToClean = 
				"In the digital era ample data is available on internet. Processing of unstructured data is todays need. "
				+ "In IR (information retrieval systems), Web Mining, Artificial Intelligence, Natural "
				+ "Language Processing, Text Summarization, Text and Data Analytic systems, optimization of"
				+ " text data becomes very important. One of the preprocessing step is stop word removal. "
				+ "Some extremely common words which would appear to be of little value in helping select"
				+ " documents matching a user need are excluded. These words are called stop words. Stop "
				+ "words list has been developed for languages like English, Chinese, Arabic, Hindi, etc. "
				+ "A large number of available works on stop word removal techniques are based on manual "
				+ "stop word lists. An efficient stop word removal technique is required. In this paper, "
				+ "we are proposing a stop word removal algorithm for Devanagari Languages. Which is using"
				+ " the concept of a Finite Automata (DFA). Then pattern matching technique is applied and"
				+ " the matched patterns, which is a stop word, is removed from the document. Previous"
				+ " methods are time consuming, as searching process takes a long time. In comparison of"
				+ " that, our algorithm gives better result in less time.";
		
		String expectedCleanedText = "digital era ample data internet. Processing unstructured data todays . "
				+ "IR (information retrieval systems), Web Mining, Artificial Intelligence, Natural Language"
				+ " Processing, Text Summarization, Text Data Analytic systems, optimization text data important."
				+ " preprocessing step stop word removal. extremely common words helping select documents matching"
				+ " user excluded. words called stop words. Stop words list developed languages English, Chinese, "
				+ "Arabic, Hindi, . large number works stop word removal techniques based manual stop word lists. "
				+ "efficient stop word removal technique required. paper, proposing stop word removal algorithm "
				+ "Devanagari Languages. concept Finite Automata (DFA). pattern matching technique applied matched "
				+ "patterns, stop word, removed document. Previous methods time consuming, searching process takes "
				+ "time. comparison , algorithm result time.";
		
		String actualCleanedText = test.clean(textToClean);
		//System.out.println(actualCleanedText);
		//fail("Not yet implemented");
		assertEquals(expectedCleanedText, actualCleanedText);
	}

	//@Test
	//public void testGetKeywords() {
	//	fail("Not yet implemented");
	//}

}
