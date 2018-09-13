package com.xinleju.platform.uitls.openOffice;

import org.apache.log4j.Logger;

import java.io.InputStream;
import java.util.Properties;

public class ConfigurationUtil {
	
	private static Logger logger = Logger.getLogger(ConfigurationUtil.class);
	
    public static String OPENOFFICE_HOME;
    public static String OPENOFFICE_PORT;

	public static final String OPENOFFICE_HOME_KEY = "openOffice.home";
	public static final String OPENOFFICE_PORT_KEY = "openOffice.port";

	private static Properties properties;
	
	static {
		properties = new Properties();
        InputStream ist = null;
        try {
            ist = ConfigurationUtil.class.getClassLoader().getResourceAsStream("configuration.properties");
            properties.load(ist);
            OPENOFFICE_HOME = getValue(OPENOFFICE_HOME_KEY);
            OPENOFFICE_PORT = getValue(OPENOFFICE_PORT_KEY);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            try {
                if (null != ist) {
                    ist.close();
                }
            } catch (Exception e) {
            }
        }
	}

	public static String getValue(String key) {
		return properties.getProperty(key);
	}
	
	public static String getValue(String key, String defaultValue) {
		return properties.getProperty(key, defaultValue);
	}

}
