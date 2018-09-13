package algorithm.sort;

public class InsertSort {

	public static void main(String[] args) {
		int[] t1 = {3, 1, 2, 9, 6, 7, 5, 4, 8};
		int n = sort(t1);
		print(t1);
		System.out.println(n);
	}
	
	
	private static int sort(int[] a) {
		int n = 0;
		
		for(int i=1; i<a.length; i++) {
			for(int j=i; j>0; j--) {
				
				n++;
				if(a[j] < a[j - 1]) {
					swap(a, j, j - 1);
					n++;
				}
			}
		}
		
		return n;
	}

	
	private static void print(int[] a) {
		for (int i = 0; i < a.length; i++) {
			System.out.print(a[i]);
		}
		System.out.println();
	}
	
	private static void swap(int[] arr, int a, int b) {
			int tmp = arr[a];
			arr[a] = arr[b];
			arr[b] = tmp;
	}
}
