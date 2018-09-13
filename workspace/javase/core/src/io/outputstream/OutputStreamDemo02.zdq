package io.outputstream;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class OutputStreamDemo02 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		OutputStream out = new FileOutputStream(file, true);
		String msg = "Hello, world \r\n";	//\r\n��ʾ����
		byte[] m = msg.getBytes();
		out.write(m);
		
		//û�йر�(��writer���)
		//out.close();
	}

}
