package io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class Copy {

	public static void main(String[] args) throws Exception {
		if(args.length != 2) {
			System.out.println("�﷨��ʽ����ȷ:java Copy Դ�ļ� Ŀ���ļ�");
			System.exit(1);
		}
		
		if(args[0].equals(args[1])) {
			System.out.println("���ܸ�������.");
			System.exit(1);
		}
		
		File file1 = new File(args[0]);
		if(file1.exists()) {
			File file2 = new File(args[1]);
			InputStream in = new FileInputStream(file1);
			OutputStream out = new FileOutputStream(file2);
			
			int temp = 0;
			while((temp = in.read()) != -1) {
				out.write(temp);
			}
			System.out.println("�ļ����Ƴɹ�!");
			in.close();
			out.close();
			
		} else {
			System.out.println("Դ�ļ�������.");
			System.exit(1);
		}
	}

}
