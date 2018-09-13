package basic.runtime;

import java.io.IOException;

public class RuntimeDemo {
	public static void main(String[] args) throws IOException, InterruptedException {
		Runtime run = Runtime.getRuntime();
		Process pro = run.exec("notepad.exe");
		
		pro.waitFor();
		System.out.println("notepad is closed");
		
//		Thread.sleep(2000);
//		pro.destroy();
	}
}
