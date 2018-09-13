package io;

import java.io.File;

public class ListFile4 {

	public static void main(String[] args) {
		File file = new File("D:" + File.separator);
		list(file);
	}

	private static void list(File file) {
		if(file.isDirectory()) {
			File[] files = file.listFiles();
			if(files != null) {
				for(File f : files) {
					list(f);
				}
			}
		}
		
		System.out.println(file);
	}

}
