package io.inputstream;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class InputStreamDemo02 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		InputStream in = new FileInputStream(file);
		byte[] b = new byte[(int)file.length()];
		
		for(int i=0; i<b.length; i++) {
			b[i] = (byte) in.read();
		}
		
		System.out.println(new String(b));
	}

}
