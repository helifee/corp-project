package io;

import java.io.File;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo2 {

	public static void main(String[] args) throws Exception {
		File file = new File("D:" + File.separator + "demo.txt");
		RandomAccessFile raf = new RandomAccessFile(file, "r");
		
		byte[] b = new byte[8];
		int age = 0;
		
		raf.skipBytes(12);
		System.out.println("�ڶ����˵���Ϣ�� ");
		for(int i=0; i<8; i++) {
			b[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t���� " + new String(b));
		System.out.println("\t���䣺 " + age);
		
		raf.seek(0);
		
		System.out.println("��һ���˵���Ϣ�� ");
		for(int i=0; i<8; i++) {
			b[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t���� " + new String(b));
		System.out.println("\t���䣺 " + age);
		
		raf.skipBytes(12);
		
		System.out.println("������˵���Ϣ�� ");
		for(int i=0; i<8; i++) {
			b[i] = raf.readByte();
		}
		age = raf.readInt();
		System.out.println("\t���� " + new String(b));
		System.out.println("\t���䣺 " + age);
		
		raf.close();
	}

}
