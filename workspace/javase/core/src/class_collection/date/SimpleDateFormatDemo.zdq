package class_collection.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormatDemo {

	public static void main(String[] args) throws ParseException {
		String str = "2010-11-01 16:23:10.102";
		
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy��MM��dd�� hhʱmm��ss��SSS����");
		
		Date date = sdf1.parse(str);
		System.out.println(sdf2.format(date));
	}

}
