package com.helifee.old;
import java.io.*;

public class TestBufferStream2 {
	public static void main(String[] args) {
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter("f:/a.java"));
			BufferedReader br = new BufferedReader(new FileReader("f:/a.java"));
			String s = null;
			for(int i=0; i<100; i++) {
				s = String.valueOf(Math.random());
				bw.write(s);
				bw.newLine();
			}
			bw.flush();
			
			while((s=br.readLine()) != null) {
				System.out.println(s);
			}
			bw.close();
			br.close();
		}
		catch(IOException e) {
			e.printStackTrace();
		}
	}
}