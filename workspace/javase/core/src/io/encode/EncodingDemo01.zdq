package io.encode;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class EncodingDemo01 {

	public static void main(String[] args) throws Exception {
		OutputStream out = new FileOutputStream(new File("f:") + File.separator + "test.txt");
		String str = "�й��Ұ��㣡";
		//out.write(str.getBytes());
		out.write(str.getBytes("ISO-8859-1"));
	}

}
