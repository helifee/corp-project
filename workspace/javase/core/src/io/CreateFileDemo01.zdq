package io;

import java.io.File;
import java.io.IOException;

public class CreateFileDemo01 {

	public static void main(String[] args) {
//		String path = args[0];	args[0] = D:\test.txt
		String path = "D:\\test.txt";
		File file = new File(path);
		
		try {
			file.createNewFile();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
