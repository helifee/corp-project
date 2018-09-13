package com.xinleju.platform.base.utils;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigurationUtil {
	
	private static Logger logger = Logger.getLogger(ConfigurationUtil.class);
	
	public static String ELASTIC_SEARCH_SERVER;
	public static String FDFS_CLIENT_CONF_PATH;
    public static String FDFS_STORAGE_HTTP_PORT;

    public static String STORAGE_ONE_SERVER_IP_N;
    public static String STORAGE_TWO_SERVER_IP_N;
    public static String TRACKER_SERVER_IP_N;

    public static String STORAGE_ONE_SERVER_IP_W;
    public static String STORAGE_TWO_SERVER_IP_W;
    public static String TRACKER_SERVER_IP_W;

	public static final String ELASTIC_SEARCH_SERVER_KEY = "elastic.search.server";
	public static final String FDFS_CLIENT_CONF_WINDOWS_PATH_KEY = "fdfs.client.conf.windows.path";
	public static final String FDFS_CLIENT_CONF_LINUX_PATH_KEY = "fdfs.client.conf.linux.path";
    public static final String FDFS_STORAGE_HTTP_PORT_KEY = "fdfs.storage.http.port";

    public static final String STORAGE_ONE_SERVER_IP_KEY_NPRO = "storage.one.server.ip.n";
    public static final String STORAGE_TWO_SERVER_IP_KEY_NPRO = "storage.two.server.ip.n";
    public static final String TRACKER_SERVER_IP_KEY_NPRO = "tracker.server.ip.n";

    public static final String STORAGE_ONE_SERVER_IP_KEY_WPRO = "storage.one.server.ip.w";
    public static final String STORAGE_TWO_SERVER_IP_KEY_WPRO = "storage.two.server.ip.w";
    public static final String TRACKER_SERVER_IP_KEY_WPRO = "tracker.server.ip.w";

	private static Properties properties;
	
	static {
		properties = new Properties();
        InputStream ist = null;
        try {
            ist = ConfigurationUtil.class.getClassLoader().getResourceAsStream("common-utils.properties");
            properties.load(ist);
            ELASTIC_SEARCH_SERVER = getValue(ELASTIC_SEARCH_SERVER_KEY);
            FDFS_STORAGE_HTTP_PORT = getValue(FDFS_STORAGE_HTTP_PORT_KEY);
            STORAGE_ONE_SERVER_IP_N = getValue(STORAGE_ONE_SERVER_IP_KEY_NPRO);
            STORAGE_TWO_SERVER_IP_N = getValue(STORAGE_TWO_SERVER_IP_KEY_NPRO);
            TRACKER_SERVER_IP_N = getValue(TRACKER_SERVER_IP_KEY_NPRO);
            STORAGE_ONE_SERVER_IP_W = getValue(STORAGE_ONE_SERVER_IP_KEY_WPRO);
            STORAGE_TWO_SERVER_IP_W = getValue(STORAGE_TWO_SERVER_IP_KEY_WPRO);
            TRACKER_SERVER_IP_W = getValue(TRACKER_SERVER_IP_KEY_WPRO);
            String osName = System.getProperty("os.name");
            logger.info("===>> 系统名称:"+ osName);
            if (osName != null && osName.toLowerCase().startsWith("win")) {
            	FDFS_CLIENT_CONF_PATH = getValue(FDFS_CLIENT_CONF_WINDOWS_PATH_KEY);
            } else {
            	FDFS_CLIENT_CONF_PATH = getValue(FDFS_CLIENT_CONF_LINUX_PATH_KEY);
            }
            logger.info("----> elastic search server:" + ELASTIC_SEARCH_SERVER);
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
