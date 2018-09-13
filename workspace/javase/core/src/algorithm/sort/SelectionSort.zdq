package algorithm.sort;

public class SelectionSort {

	public static void main(String[] args) {
		int[] a = { 3, 1, 2, 9, 6, 7, 5, 4, 8 };

		print(a);
		//sort(a);
		sort2(a);
		print(a);
	}

	private static void print(int[] a) {
		for(int i=0; i<a.length; i++) {
			System.out.print(a[i]);
		}
		System.out.println();
	}

	@SuppressWarnings("unused")
	private static void sort(int[] a) {
		for(int i=0; i<a.length; i++) {
			for(int j=i + 1; j<a.length; j++) {
				if(a[j] < a[i]) {
					int tmp = a[i];
					a[i] = a[j];
					a[j] = tmp;
				}
			}
		}
	}
	
	private static void sort2(int[] a) {
		int k, tmp;
		for(int i=0; i<a.length; i++) {
			k = i;
			for(int j=k+1; j<a.length; j++) {
				if(a[j] < a[k]) {
					k = j;
				}
			}
			
			if(k != i) {
				tmp = a[i];
				a[i] = a[k];
				a[k] = tmp;
			}
		}
	}
}
