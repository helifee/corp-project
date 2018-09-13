package class_collection;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class PropertiesDemo02 {

	public static void main(String[] args) {
		Properties pro = new Properties();
		try {
//			pro.load(new FileInputStream(new File("D:" + File.separator) + "area.properties"));
			pro.loadFromXML(new FileInputStream(new File("D:" + File.separator) + "area.xml"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(pro.getProperty("BJ"));
		System.out.println(pro.getProperty("HB"));
		System.out.println(pro.getProperty("HB", "找不到"));
	}

}
