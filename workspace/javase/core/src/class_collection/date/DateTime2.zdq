package class_collection.date;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTime2 {
	private SimpleDateFormat sdf = null;
	
	public String getDate() {	//2010-11-01
		this.sdf = new SimpleDateFormat("yyyy-MM-dd");
		String str = sdf.format(new Date());
		return str;
	}
	
	public String getDateTime() {	//2010-11-01 06:46:34.285
		this.sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
		String str = sdf.format(new Date());
		return str;
	}
	
	public String getDateTimeStamp() {
		this.sdf = new SimpleDateFormat("yyyyMMddhhmmssSSS");
		String str = sdf.format(new Date());
		return str;
	}
	
	public static void main(String[] args) {
		System.out.println(new DateTime2().getDate());
		System.out.println(new DateTime2().getDateTime());
		System.out.println(new DateTime2().getDateTimeStamp());
	}
}
