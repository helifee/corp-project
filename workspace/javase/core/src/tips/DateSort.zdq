package tips;

/*public class DateSort {
	public static void main(String[] args) {
		Date[] s = new Date[10];
		
		s[0] = new Date(2004, 3, 2);
		s[1] = new Date(2002, 5, 5);
		s[2] = new Date(2003, 6, 6);
		s[3] = new Date(2005, 8, 9);
		s[4] = new Date(2006, 4, 1);
		s[5] = new Date(2001, 6, 1);
		s[6] = new Date(2000, 2, 9);
		s[7] = new Date(2009, 1, 9);
		s[8] = new Date(2005, 8, 4);
		s[9] = new Date(2004, 3, 2);
		
		print(s);
		System.out.println();
		sort(s);
		print(s);
	}
	
	public static void print(Date[] s) {
		for(int i=0; i<s.length; i++) {
			System.out.println(s[i].year + " " + s[i].month + " " + s[i].day);
		}
	}
	
	public static void  sort(Date[] s) {
		int k;
		Date temp;
		
		for(int i=0; i<s.length; i++) {
			k = i;
			for(int j=k+1; j<s.length; j++) {
				if(s[j].compare(s[k]) < 0)
					k = j;
			}
			if(k != i) {
				temp = s[i];
				s[i] = s[k];
				s[k] = temp;
			}
		}
	}
	
}

class Date {
	int year, month, day;
	Date(int y, int m, int d) {
		year = y;
		month = m;
		day = d;
	}
	
	public int compare(Date d) {
		return year > d.year ? 1
					:year < d.year ? -1
					:month > d.month ? 1
					:month < d.month ? -1
					:day > d.day ? 1
					:day < d.day ? -1 : 0;
	} 
}
*/
class Date {
	int year, month, day;
	
	Date(int y, int m, int d) {
		year = y;
		month = m;
		day = d;
	}
	 public int compare(Date d) {
	 	return year > d.year ? 1
	 				:year < d.year ? -1
	 				:month > d.month ? 1
	 				:month < d.month ? -1
	 				:day > d.day ? 1
	 				:day < d.day ? -1 : 0;
	}
	public String toString() {
		return "Year:Month:Day " + year + " " + month + " " + day;
	}
}

public class DateSort {
	public static void main(String[] args) {
		Date[] s = new Date[10];
		
		s[0] = new Date(2004, 3, 2);
		s[1] = new Date(2002, 5, 5);
		s[2] = new Date(2003, 6, 6);
		s[3] = new Date(2005, 8, 9);
		s[4] = new Date(2006, 4, 1);
		s[5] = new Date(2001, 6, 1);
		s[6] = new Date(2000, 2, 9);
		s[7] = new Date(2009, 1, 9);
		s[8] = new Date(2005, 8, 4);
		s[9] = new Date(2004, 3, 2);
		
		bubbleSort(s);
		for(int i=0; i<s.length; i++) {
			System.out.println(s[i]);
		}
	}
	public static void bubbleSort(Date[] s) {
		Date temp;
		for(int i=s.length-1; i>=1; i--) {
			for(int j=0; j<i; j++) {
				if(s[j].compare(s[j+1]) > 0) {
					temp = s[j];
					s[j] = s[j+1];
					s[j+1] = temp;
				}
			}
		}
	}
}