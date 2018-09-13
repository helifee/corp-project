package io.inputstream;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class InputStreamDemo01 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		InputStream in = new FileInputStream(file);
		byte[] b = new byte[1024];
		
		int len = in.read(b);
		
		System.out.println(new String(b, 0, len));
	}

}
