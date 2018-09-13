package yd;

public class RandomTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		int[] a = new int[100];
		int n = 100;
	
		getRandom(a, n);
		selectSort(a);
		print(a);
		
	}
	private static void print(int[] arr) {
		for(int i=0; i<100; i++) {
			if(i % 10 == 0) {
				System.out.println();
			}
			System.out.print(arr[i] + "\t");
		}
	}
	
	private static void getRandom(int[] arr, int n) {
		for(int i=0; i<100; i++) {
			arr[i] = (int)(Math.random() * n) + 1;
		}
	}
	
	private static void selectSort(int[] arr) {
		for(int i=0; i<100; i++) {
			for(int j=i+1; j<100; j++) {
				if(arr[i] > arr[j]) {
					int temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
	}

}
