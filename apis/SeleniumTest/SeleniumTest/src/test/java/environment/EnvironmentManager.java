package environment;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class EnvironmentManager {

	/**
	 * Initializes the webdriver the Selenium test uses.
	 * Make sure to change the version to the current Operating System.
	 */
    public static void initWebDriver() {
        initWindows();
    }
    
    public static void initWindows() {
        System.setProperty("webdriver.chrome.driver", "BrowserDrivers/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        RunEnvironment.setWebDriver(driver);
    }
    
    public static void initMac() {
        System.setProperty("webdriver.chrome.driver", "BrowserDrivers/chromedriverMac");
        WebDriver driver = new ChromeDriver();
        RunEnvironment.setWebDriver(driver);
    }
    
    public static void initLinux() {
        System.setProperty("webdriver.chrome.driver", "BrowserDrivers/chromedriverLinux");
        WebDriver driver = new ChromeDriver();
        RunEnvironment.setWebDriver(driver);
    }

    public static void shutDownDriver() {
        RunEnvironment.getWebDriver().quit();
    }
}