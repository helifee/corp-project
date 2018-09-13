package io.file;

import java.io.File;

public class ListFileDemo02 {

	public static void main(String[] args) {
		File file = new File("F:" + File.separator + "workspace");
		File[] path = file.listFiles();
		for(int i=0; i<path.length; i++) {
			System.out.print(path[i].getParent() + " --> ");
			System.out.println(path[i].getPath());
		}
	}	
}
