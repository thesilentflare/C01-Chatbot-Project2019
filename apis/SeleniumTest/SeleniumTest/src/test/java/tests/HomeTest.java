package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import environment.EnvironmentManager;
import environment.RunEnvironment;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class HomeTest {
	static WebDriver driver; 
			
    @BeforeClass
    public static void setup() {
        EnvironmentManager.initWebDriver();
        driver = RunEnvironment.getWebDriver();
        driver.get("localhost:3000");
    }

    @Test
    public void T1title() {
        String title = driver.findElement(By.xpath("//h1[contains(text(),'Welcome to AskBaba')]")).getText();
        assertEquals(title, "Welcome to AskBaba");
    }
    
    @Test
    public void T2helperText() {
        String helper = driver.findElement(By.xpath("//h2[contains(text(),'Select an option below to begin')]")).getText();
        assertEquals(helper, "Select an option below to begin");
    }

    @Test
    public void T3guest() {
        String guest = driver.findElement(By.xpath("//button[contains(text(),'Proceed As Guest')]")).getText();
        assertEquals(guest, "Proceed As Guest");
    }
    
    @Test
    public void T4login() {
        String login = driver.findElement(By.xpath("//button[contains(text(),'Login')]")).getText();
        assertEquals(login, "Login");
    }
    
    @Test
    public void T5signup() {
        String signup = driver.findElement(By.xpath("//button[contains(text(),'Create An Account')]")).getText();
        assertEquals(signup, "Create An Account");
    }

    @Test
    public void T6analytics() {
        String analytics = driver.findElement(By.xpath("//button[contains(text(),'Analytics')]")).getText();
        assertEquals(analytics, "Analytics");
    }
    
    @AfterClass
    public static void tearDown() {
        EnvironmentManager.shutDownDriver();
    }

}
