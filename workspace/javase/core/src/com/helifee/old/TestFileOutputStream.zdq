package com.helifee.old;
import java.io.*;

public class TestFileOutputStream {
	public static void main(String[] args) {
		int b = 0;
		FileInputStream in = null;
		FileOutputStream out = null;
		
		try {
			in = new FileInputStream("d:/java/TestFileOutputStream.java");
			out = new FileOutputStream("f:/test.java");
			while((b = in.read()) != -1) {
				out.write(b);
			}
			in.close();
			out.close();
		}
		catch(FileNotFoundException e) {
			System.out.println("file not found!");
			System.exit(-1);
		}
		catch(IOException e1) {
			System.out.println("copy error!");
		}
		
		System.out.println("file copied!");
	}
}