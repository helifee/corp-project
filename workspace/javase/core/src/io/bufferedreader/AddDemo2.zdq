package io.bufferedreader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class AddDemo2 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader buf = null;
		buf = new BufferedReader(new InputStreamReader(System.in));
		int i = 0;
		int j = 0;
		String str = null;
		boolean flg = true;
		System.out.print("�������һ����:");
		while(flg) {
			str = buf.readLine();
			if(str.matches("\\d+")) {
				flg = false;
				i = Integer.parseInt(str);				
			} else {
				System.out.print("��������,����������:");
			}
		}

		flg = true;
		System.out.print("������ڶ�����:");
		while(flg) {
			str = buf.readLine();
			if(str.matches("\\d+")) {
				flg = false;
				j = Integer.parseInt(str);				
			} else {
				System.out.print("��������,����������:");
			}
		}		
		System.out.print("���:" + (i + j));

	}

}
