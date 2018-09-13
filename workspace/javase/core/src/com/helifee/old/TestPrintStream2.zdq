package com.helifee.old;
import java.io.*;

public class TestPrintStream2 {
	public static void main(String[] args) {
		String filename = args[0];
		
		//List(filename, System.out);
		
		if(filename != null) {
			List(filename, System.out);
		}
		
	}
	public static void List(String f, PrintStream ps) {
		try {
			BufferedReader br = 
				new BufferedReader(new FileReader(f));
			String s = null;
			while((s = br.readLine()) != null) {
				ps.println(s);
			}
			br.close();
		}
		catch(IOException e) {
			ps.println("�޷���ȡ�ļ���");
		}
	}
}