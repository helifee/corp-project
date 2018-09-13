package tips;

public class NumberSort {
	public static void main(String[] args) {
		int[] a = new int[args.length];
		
		for(int i=0; i<args.length; i++) {
			a[i] = Integer.parseInt(args[i]);
		}
		print(a);
		selectionSort(a);
		print(a);
	}
	
/*	private static void selectionSort(int[] a) {
		int t;
		for(int i=0; i<a.length-1; i++) {
			for(int j=i+1; j<a.length; j++) {
				if(a[j] < a[i]) {
					t = a[i];
					a[i] = a[j];
					a[j] = t;
				}
			}
		}	
	}
*/
/*  
private static void selectionSort(int[] a) { //selection 
	int k, temp;
	for(int i=0; i<a.length; i++) {
		k = i;
		for(int j=k+1; j<a.length; j++) {
			if(a[j] < a[k]) {
				k = j;
			}
		}
		if(k != i) {
			temp = a[i];
			a[i] = a[k];
			a[k] = temp;
		}
	}
}
*/ 
private static void selectionSort(int[] a) {  // bubble
	int temp;
	for(int i=a.length-1; i>=1; i--) {
		for(int j=0; j<i; j++) {
			if(a[j] > a[j+1]) {
				temp = a[j];
				a[j] = a[j+1];
				a[j+1] = temp;
			}
		}
	}
}
private static void print(int[] a) {
		for(int i=0; i<a.length; i++) {
			System.out.print(a[i] + " ");
		}
		System.out.println();
	}
}
/*
import java.util.Arrays;
public class TestArray {
	public static void main(String[] args) {
		int[] s;
		s = new int[9];
		
		for(int i=0; i<s.length; i++) {
			s[i] = Integer.parseInt(args[i]);
		}
		Arrays.sort(s);
		for(int i=0; i<s.length; i++) {
			System.out.print(s[i] + " ");
		}
	}
}
*/