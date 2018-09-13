package algorithm.sort;

public class BubbleSort {

	public static void main(String[] args) {
		
		System.out.print("一般顺序数据：");
		int[] a = { 3, 1, 2, 9, 6, 7, 5, 4, 8 };
		print(a);
		int n = sort(a);
		System.out.println("一般冒泡排序：" + n);
		
		int[] b = { 3, 1, 2, 9, 6, 7, 5, 4, 8 };
		n = sort2(b);
		System.out.println("改良冒泡排序：" + n);
		
		System.out.print("\n基本有序数据：");
		int[] a1 = { 3, 1, 2, 4, 5, 6, 7, 8, 9 };
		print(a1);
		n = sort(a1);
		System.out.println("一般冒泡排序：" + n);
		
		int[] b2 = { 3, 1, 2, 4, 5, 6, 7, 8, 9 };
		n = sort2(b2);
		System.out.println("改良冒泡排序：" + n);

	}

	/**
	 * O(n^2)
	 */
	private static int sort(int[] a) {
		
		int len = a.length;
		int n = 0;	//比较次数+交换次数
		
		for(int i=len-1; i>0; i--) {
			for(int j=0; j<i; j++) {
				
				n++;
				if(a[j] > a[j + 1]) {
					swap(a, j, j+1);
					n++;
				}
			}
		}
		
		return n;
	}
	
	/**
	 * 在两个整数最后一次交换后，在前一个整数后面的所有整数都是排序的，
	 * 因此在第一层循环的i变化时，无需减1，而只需将i置成这个整数所在的位置。
	 * 从而第一层循环的次数就不一定是n - 1，当待排序数组已经是有序时，第一层循环只循环一次。
	 */
	private static int sort2(int[] a) {
		
		int len = a.length;
		int n = 0;	//比较次数+交换次数
		int k;
		
		for(int i=len-1; i>0; i=k) {
			
			k = 0;
			for(int j=0; j<i; j++) {
				
				n++;
				if(a[j] > a[j + 1]) {
					k = j;
					swap(a, j, j+1);
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
