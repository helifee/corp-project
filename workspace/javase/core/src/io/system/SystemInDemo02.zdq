package io.system;

import java.io.IOException;
import java.io.InputStream;

public class SystemInDemo02 {

	//����������
	public static void main(String[] args) throws IOException {
		InputStream input = System.in;
		System.out.println("���������:");
		
		int temp = 0;
		StringBuffer buf = new StringBuffer();
		while((temp = input.read()) != -1) {
			char c = (char)temp;
			if(c == '\n') {
				break;
			}
			buf.append(c);
		}
		
		System.out.println("���Ϊ:" + buf.toString());
	}

}
