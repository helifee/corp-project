package com.helifee.old;
import java.io.*;

public class TestFileReader {
	public static void main(String[] args) {
		int c = 0;
		FileReader fr = null;
		FileWriter fw = null;
		
		try {
			fr = new FileReader("d:/java/TestFileReader.java");
			fw = new FileWriter("f:/test.java");
			
			while((c = fr.read()) != -1) {
				System.out.print((char)c);
				fw.write(c);
			}
			fr.close();
			fw.close();
		}
		catch(FileNotFoundException e) {
			System.out.println("�ļ�û�ҵ�!");
			System.exit(-1);
		}
		catch(IOException e1) {
			System.out.println("��д����!");
			System.exit(-1);
		}
		System.out.println("�ļ��Ѹ���!");
	}
}