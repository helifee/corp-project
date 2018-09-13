package io.reader;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;

public class ReaderDemo02 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		Reader in = new FileReader(file);
		char[] b = new char[(int)file.length()];
		
		for(int i=0; i<b.length; i++) {
			b[i] = (char) in.read();
		}
		
		System.out.println(new String(b));
	}

}
