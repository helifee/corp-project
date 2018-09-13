package io.outputstream;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class OutputStreamDemo01 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		OutputStream out = new FileOutputStream(file, true);
		String msg = "Hello, world \r\n";	//\r\n��ʾ����
		byte[] m = msg.getBytes();
		
		//1
		//out.write(m);
		
		//2����
		for(int i=0; i<m.length; i++) {
			out.write(m[i]);
		}
		
		out.close();
	}

}
