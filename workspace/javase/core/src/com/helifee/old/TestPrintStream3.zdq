package com.helifee.old;
import java.util.Date;
import java.io.*;

public class TestPrintStream3 {
	public static void main(String[] args) {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		try {
			FileWriter fw = new FileWriter("f:/log.txt",true);
			PrintWriter log = new PrintWriter(fw);
			String s = null;
			while((s = br.readLine()) != null) {
				if(s.equalsIgnoreCase("exit")) break;
				System.out.println(s.toUpperCase());
				log.println("-----------");
				log.println(s.toUpperCase());
				log.flush();
			}
			log.println("=====" + new Date()  + " =====");
			log.flush();
			log.close();	
		}
		catch(IOException e) {
			e.printStackTrace();
		}
	}
}