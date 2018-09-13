package io;

import java.io.File;
import java.io.FileFilter;

public class ListFile3 {

	public static void main(String[] args) {
		File file = new File("D:" + File.separator + "software");
		
		File[] files = file.listFiles(new myFileFilter());
		for(File p : files) {
			System.out.println(p);
		}
	}
}

class myFileFilter implements FileFilter {
	
	private final String[] okFileExtensions = new String[] {"bat", "txt"};

	public boolean accept(File file) {
		String fileName = file.getName().toLowerCase();
		
		for(String extension : okFileExtensions) {
			if(fileName.endsWith(extension)) {
				return true;
			}		
		}
		
		return false;
	}
}
