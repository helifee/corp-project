package io.file;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo01 {

	public static void main(String[] args) throws IOException {
		File file = new File("f:" + File.separator + "demo.txt");
		RandomAccessFile raf = new RandomAccessFile(file, "rw");
		
		//��һ��
		String name = "zhangsan";
		int age = 20;
		
		raf.writeBytes(name);
		raf.writeInt(age);
		
		//�ڶ���
		name = "lisi    ";
		age = 21;
		
		raf.writeBytes(name);
		raf.writeInt(age);
		
		//������
		name = "sstily  ";
		age = 23;
		
		raf.writeBytes(name);
		raf.writeInt(age);
		
		raf.close();
	}

}
