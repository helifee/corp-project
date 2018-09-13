package io.bytearray;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class ByteArrayDemo {

	public static void main(String[] args) {
		String str = "helloworld";
		ByteArrayInputStream bis = new ByteArrayInputStream(str.getBytes());
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		
		int temp = 0;
		while((temp = bis.read()) != -1) {
			char c = (char)temp;
			bos.write(Character.toUpperCase(c));
		}
		String newStr = bos.toString();	//
		System.out.println(newStr);
		
	}

}
