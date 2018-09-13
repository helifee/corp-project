package com.helifee.old;
import java.io.*;

public class TestFileInputStream {
	public static void main(String[] args) {
		int b = 0;
		FileInputStream in = null;
		try {
			in = new FileInputStream("D:/java/TestFileInputStream.java");
		}
		catch (FileNotFoundException e) {
			System.out.println("file don't exist!");
			System.exit(-1);
		}
		
		try {  //read() close() �쳣
			long num = 0;
			while((b = in.read()) != -1) {
				System.out.print((char)b);
				num++;
			}
			in.close();
			System.out.println();
			System.out.println(num + "bytes were read");
		}
		catch(IOException e) {
			System.out.println("reading error!");
			System.exit(-1);
		}
		
	}
}
