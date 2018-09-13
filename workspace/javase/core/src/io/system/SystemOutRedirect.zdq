package io.system;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class SystemOutRedirect {

	public static void main(String[] args) throws IOException {
		File file = new File("f:" + File.separator + "log.txt");
		System.setOut(new PrintStream(new FileOutputStream(file)));
		
		System.out.println("error...");
		
		//in, errҲ���ض���,��������
	}

}
