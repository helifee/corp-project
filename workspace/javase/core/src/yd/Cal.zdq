package yd;
import java.util.*;

public class Cal {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Scanner reader = new Scanner(System.in);
		System.out.println("Input year: ");
		int year = reader.nextInt();
		System.out.println("Input month: ");
		int month = reader.nextInt();
		
		System.out.println("Sun\tMon\tThu\tWed\tThu\tFri\tSat");
		Calendar cal = Calendar.getInstance();
		cal.set(year, month-1, 1);
		int week = cal.get(Calendar.DAY_OF_WEEK) - 1;
		//System.out.println("--------------" + week);
		
		int[] b = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}; 
		if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
			b[1] = 29;
		}
			
	
		String a[] = new String[week + b[month-1]];
		
		for(int i=0; i<week; i++) {
			a[i] = "**";
		}
		for(int i=week, n=1; i<week+b[month-1]; i++) {
			if(n <= 9) {
				a[i] = String.valueOf(n) + " ";
			}
			else {
				a[i] = String.valueOf(n);
			}
			n++;
		}
		
		for(int i=0; i<a.length; i++) {
			if(i % 7 == 0) {
				System.out.println();
			}
			System.out.print(a[i] + "\t");
		}

	}

}
