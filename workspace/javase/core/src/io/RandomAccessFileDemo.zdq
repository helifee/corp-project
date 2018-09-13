package io;

import java.io.File;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo {

	public static void main(String[] args) throws Exception {
		File file = new File("D:" + File.separator + "demo.txt");
		RandomAccessFile raf = new RandomAccessFile(file, "rw");
		
		String name = "zhangsan";
		int age = 20;
		raf.writeBytes(name);
		raf.writeInt(age);
		
		name = "lisi    ";
		age = 21;
		raf.writeBytes(name);
		raf.writeInt(age);
		
		name = "wangwu  ";
		age = 22;
		raf.writeBytes(name);
		raf.writeInt(age);
		
		raf.close();
	}

}
