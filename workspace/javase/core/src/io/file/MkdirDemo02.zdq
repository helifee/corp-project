package io.file;

import java.io.File;
import java.io.IOException;

public class MkdirDemo02 {

	public static void main(String[] args) {
		File file = new File("F:" + File.separator + "demo" + File.separator + "test.txt");
		
		//
		file.getParentFile().mkdir();
		try {
			file.createNewFile();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
