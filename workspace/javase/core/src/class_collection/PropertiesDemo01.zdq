package class_collection;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesDemo01 {

	public static void main(String[] args) {
		Properties pro = new Properties();
		pro.setProperty("BJ", "BeiJin");
		pro.setProperty("TJ", "TianJin");
		pro.setProperty("NJ", "NanJin");
		
		System.out.println(pro.getProperty("BJ"));
		System.out.println(pro.getProperty("HB"));
		System.out.println(pro.getProperty("HB", "找不到"));
		
		try {
			pro.store(new FileOutputStream(new File("D:" + File.separator + "area.properties")), "Area Info");
			pro.storeToXML(new FileOutputStream(new File("D:" + File.separator + "area.xml")), "Area Info");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//System.getProperties().list(System.out);
	}

}
