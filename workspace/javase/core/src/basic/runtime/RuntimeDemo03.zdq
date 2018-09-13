package basic.runtime;

import java.io.IOException;
import java.io.InputStream;

public class RuntimeDemo03 {
	public static void main(String[] args) throws IOException, InterruptedException {
		String cmd = "notepad.exe";
		
		Process p = Runtime.getRuntime().exec(cmd);
		
		InputStream in = p.getInputStream();
		
		int c;
		while((c = in.read()) != -1) {
			System.out.println(c);			
		}
		in.close();
	}
}
