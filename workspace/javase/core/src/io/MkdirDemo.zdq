package io;

import java.io.File;
import java.io.IOException;

public class MkdirDemo {

	public static void main(String[] args) {
		File file = new File("D:" + File.separator + "testa" + File.separator + "test.txt");
		file.getParentFile().mkdir();
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
