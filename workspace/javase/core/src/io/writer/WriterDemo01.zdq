package io.writer;

import java.io.File;
import java.io.FileWriter;
import java.io.Writer;

public class WriterDemo01 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		Writer out = new FileWriter(file, true);
		String msg = "Hello, world \r\n";	//\r\n��ʾ����
		
		out.write(msg);
		
		out.close();
	}

}
