package io.scanner;

import java.io.File;
import java.io.FileInputStream;
import java.util.Scanner;

public class ScannerDemo04 {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		Scanner scan = new Scanner(new FileInputStream(file));
		scan.useDelimiter("\n");
		StringBuffer buf = new StringBuffer();
		while(scan.hasNext()) {
			buf.append(scan.next()).append("\n");
		}
		System.out.println("buf = " + buf);
	}

}
