package class_collection.date;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class DateTime {
	private Calendar calendar = new GregorianCalendar();
	
	private String addZero(int temp, int len) {
		StringBuffer buf = new StringBuffer();
		buf.append(temp);
		while(buf.length() < len) {
			buf.insert(0, 0);
		}
		return buf.toString();
	}
	
	public String getDate() {	//2010-11-01
		StringBuffer buf = new StringBuffer();
		buf.append(calendar.get(Calendar.YEAR)).append("-");
		buf.append(this.addZero(calendar.get(Calendar.MONTH) + 1, 2)).append("-");
		buf.append(this.addZero(calendar.get(Calendar.DAY_OF_MONTH), 2));
		return buf.toString();
	}
	
	public String getDateTime() {	//2010-11-01 06:46:34.285
		StringBuffer buf = new StringBuffer();
		buf.append(this.getDate()).append(" ");
		buf.append(this.addZero(calendar.get(Calendar.HOUR), 2)).append(":");
		buf.append(this.addZero(calendar.get(Calendar.MINUTE), 2)).append(":");
		buf.append(this.addZero(calendar.get(Calendar.SECOND), 2)).append(".");
		buf.append(this.addZero(calendar.get(Calendar.MILLISECOND), 3));
		
		return buf.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(new DateTime().getDateTime());
	}
}
