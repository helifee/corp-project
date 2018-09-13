package yd;

import java.util.*;

public class Week {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Scanner reader = new Scanner(System.in);
		int year = reader.nextInt();
		int month = reader.nextInt();
		int day = reader.nextInt();
		
		Calendar cal = Calendar.getInstance();
		cal.set(year, month-1, day);
		int week = cal.get(Calendar.DAY_OF_WEEK);
		System.out.println(week-1);		
	}
}
