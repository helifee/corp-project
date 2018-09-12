package com.xinleju.platform.flow.utils;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigurationUtil {
	
	private static Logger logger = Logger.getLogger(ConfigurationUtil.class);
	
/*	public static String ELASTIC_SEARCH_SERVER;
	
	public static final String ELASTIC_SEARCH_SERVER_KEY = "elastic.search.server";*/
	
	private static Properties properties;
	
	static {
		properties = new Properties();
        InputStream ist = null;
        try {
            ist = ConfigurationUtil.class.getClassLoader().getResourceAsStream("configuration.properties");
            properties.load(ist);
           /* ELASTIC_SEARCH_SERVER = getValue(ELASTIC_SEARCH_SERVER_KEY);
            logger.info("----> elastic search server:" + ELASTIC_SEARCH_SERVER);*/
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
