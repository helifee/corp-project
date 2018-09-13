package io.file;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo02 {

	public static void main(String[] args) throws IOException {
		File file = new File("f:" + File.separator + "demo.txt");
		RandomAccessFile raf = new RandomAccessFile(file, "r");
		
		byte name[] = new byte[8];
		int age = 0;
		
		raf.skipBytes(12);
		System.out.println("��һ��:");
		for(int i=0; i<8; i++) {
			name[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t|-����:"  + new String(name));
		System.out.println("\t|-����:"  + age);
		
		raf.seek(0);
		System.out.println("�ڶ���:");
		for(int i=0; i<8; i++) {
			name[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t|-����:"  + new String(name));
		System.out.println("\t|-����:"  + age);
		
		raf.skipBytes(12);
		System.out.println("������:");
		for(int i=0; i<8; i++) {
			name[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t|-����:"  + new String(name));
		System.out.println("\t|-����:"  + age);
		
		raf.close();
	}

}
