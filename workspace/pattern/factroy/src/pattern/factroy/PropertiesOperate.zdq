package pattern.factroy;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesOperate {

	private Properties pro = null;
	private File file = new File("D:" + File.separator + "fruit.properties");
	
	public PropertiesOperate() {
		this.pro = new Properties();
		
		if(file.exists()) {
			try {
				this.pro.load(new FileInputStream(file));
				
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			save();
		}
	}
	
	private void save() {
		this.pro.setProperty("apple", "pattern.factroy.Apple");
		this.pro.setProperty("orange", "pattern.factroy.Orange");
		
		try {
			this.pro.storeToXML(new FileOutputStream(this.file), "fruit");
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Properties getPro() {
		return pro;
	}
}
