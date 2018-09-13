package com.helifee.old;
public class TestSearch {
	public static void main(String[] args) {
		int[] a = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11};
		int i = 7;
		//System.out.println(search(a,i));
		System.out.println(binarySearch(a,i));
	}
	
	public static int search(int[] a, int num) {
		for(int i=0; i<a.length; i++) {
			if(a[i] == num) return i;
		}
		return -1;
	}
	
	public static int binarySearch(int[] a, int num) {
		if(a.length == 0) return -1;
		
		int startPos = 0;
		int endPos = a.length - 1;
		int m = (startPos + endPos)/2;
		while(startPos <= endPos) {
			if(num == a[m]) return m;
			else if(num < a[m]) {
				endPos = m - 1;
			}
			else if(num > a[m]) {
				startPos = m +1;
			}
			m = (startPos + endPos)/2;
		}
		
		return -1;
	}
}