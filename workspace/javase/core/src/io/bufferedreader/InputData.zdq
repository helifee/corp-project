package io.bufferedreader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class InputData {

	private BufferedReader reader;
	
	public InputData() {
		this.reader = new BufferedReader(new InputStreamReader(System.in));
	}
	
	public String getString(String info) {
		String str = null;
		
		System.out.print(info);
		try {
			str = reader.readLine();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return str;
	}
	
	public int getInt(String info, String err) {
		int ret = 0;
		boolean flg = true;
		while(flg) {
			String str = this.getString(info);
			if(str.matches("\\d+")) {
				ret = Integer.parseInt(str);
				flg = false;
			} else {
				System.out.print(err);
			}
		}
		
		return ret;
	}
	
	public float getFloat(String info, String err) {
		float ret = 0.0f;
		boolean flg = true;
		while(flg) {
			String str = this.getString(info);
			if(str.matches("\\d+.\\d+)")) {
				ret = Float.parseFloat(str);
				flg = false;
			} else {
				System.out.print(err);
			}
		}
		
		return ret;
	}
	
	public char getChar(String info, String err) {
		char ret = ' ';
		boolean flg = true;
		while(flg) {
			String str = this.getString(info);
			if(str.matches("\\w")) {
				ret = str.charAt(0);
				flg = false;
			} else {
				System.out.print(err);
			}
		}
		
		return ret;
	}
	
	public Date getDate(String info, String err) throws ParseException {
		Date ret = null;
		boolean flg = true;
		while(flg) {
			String str = this.getString(info);
			if(str.matches("\\d{4}-\\d{2}-\\d{2}")) {
				ret = new SimpleDateFormat("yyyy-MM-dd").parse(str);
				flg = false;
			} else {
				System.out.print(err);
			}
		}
		
		return ret;
	}
}
