package io.file;

import java.io.File;

public class ListFileDemo03 {

	public static void main(String[] args) {
		File file = new File("f:" + File.separator);
		list(file);
	}
	
	private static void list(File file) {
		System.out.println(file);
		if(file.isDirectory()) {
			File[] files = file.listFiles();
			if(files != null) {	//����Ŀ¼�в�����
				for(int i=0; i<files.length; i++) {
					list(files[i]);
				}
			}
		}
	}

}
