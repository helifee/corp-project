package io.reader;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;

public class ReaderDemo01 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		Reader in = new FileReader(file);
		char[] b = new char[1024];
		
		int len = in.read(b);
		
		System.out.println(new String(b, 0, len));
	}

}
