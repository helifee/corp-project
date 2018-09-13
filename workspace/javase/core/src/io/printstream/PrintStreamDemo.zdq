package io.printstream;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;

public class PrintStreamDemo {

	public static void main(String[] args) throws Exception {
		File file = new File("f:" + File.separator + "demo.txt");
		PrintStream out = new PrintStream(new FileOutputStream(file));
		
		out.print(true);
		out.println(12.3);
		out.println("hello");
		
		String name = "张三";
		int age = 22;
		float score = 67.2f;
		char sex = 'M';
		out.printf("姓名:%s; 年龄:%d; 分数:%f; 性别:%c", name, age, score, sex);
		
		out.close();
	}

}
