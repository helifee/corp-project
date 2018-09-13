package class_collection.date;

import java.text.DateFormat;
import java.util.Date;

public class DateFormatDemo {

	public static void main(String[] args) {
		Date date = new Date();
		DateFormat formatDate = DateFormat.getDateInstance();
		DateFormat formatDateTime = DateFormat.getDateTimeInstance();
		
		System.out.println(date);
		
		System.out.println(formatDate.format(date));
		System.out.println(formatDateTime.format(date));
		
		DateFormat formatDate2 = DateFormat.getDateInstance(DateFormat.ERA_FIELD );
		DateFormat formatDateTime2 = DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.FULL);
		
		System.out.println(formatDate2.format(date));
		System.out.println(formatDateTime2.format(date));
	}

}
