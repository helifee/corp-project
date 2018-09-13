package com.helifee.old;
class Date {
	int year, month, day;
	
	Date(int y, int m, int d) {
		year = y;
		month = m;
		day = d;
	}
	
	public int compare(Date d) {
		return year > d.year ? 1
				: year < d.year ? -1
				: month > d.month ? 1
				: month < d.month ? -1
				: day > d.day ? 1
				: day < d.day ? -1 : 0;
	}
	
	public String toString() {
		return "Year-month-day " + year + "-" + month + "-" + day; 
	}
}

public class TestDateSort {
	public static void main(String[] args) {
		Date[] days = new Date[5];
		days[0] = new Date(2006, 7, 9);
		days[1] = new Date(2006, 5 ,4);
		days[2] = new Date(2005, 1, 2);
		days[3] = new Date(2007, 7, 7);
		days[4] = new Date(2007 ,10, 9);
		
		bubbleSort(days);
		
		for(int i=0; i<days.length; i++) {
			System.out.println(days[i]);
		}
	}
	
	public static void bubbleSort(Date[] d) {
			Date temp;
			for(int i=d.length-1; i>=1; i--) {
				for(int j=0; j<i-1; j++) {
					if(d[j].compare(d[j+1]) > 0) {
						temp = d[j];
						d[j] = d[j+1];
						d[j+1] = temp;
					}
				}
			}
		}
}








