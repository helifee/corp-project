package io.file;

import java.io.File;
import java.io.IOException;

public class ExistFileDemo {

	public static void main(String[] args) {
		File file = new File("F:" + File.separator +"demo");
		if(file.exists()) {
			file.delete();
		} else {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
