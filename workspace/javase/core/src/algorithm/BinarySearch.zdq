package algorithm;

public class BinarySearch {

	public static void main(String[] args) {
		int[] arr = {1, 2, 3, 4, 6, 7, 8, 9};
		System.out.println(binarySearch(arr, 5));
	}
	
	public static int binarySearch(int[] arr, int key) {
		int low = 0;
		int high = arr.length - 1;
		
		while(low <= high) {
			int mid = (low + high) >> 1;
			int midVal = arr[mid];
			
			if(key > midVal) {
				low = mid + 1;
				
			} else if(key < midVal) {
				high = mid - 1;
				
			} else {
				return mid;
			}
		}
		
		return -(low + 1);
	}
}
