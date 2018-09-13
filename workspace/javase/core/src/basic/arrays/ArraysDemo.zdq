package basic.arrays;

import java.util.Arrays;

public class ArraysDemo {

	public static void main(String[] args) {
		int i[] = {1, 2, 3, 4, 5, 6};
		int j[] = {6, 5, 4, 3, 2, 1};
		Arrays.sort(j);
		System.out.println(Arrays.equals(i, j));
		Arrays.fill(j, 3);
		System.out.println(Arrays.toString(j));
		
		int[] arr1 = new int[10];
		int[] arr2 = new int[10];
		int[] arr3 = new int[10];
		
		Arrays.fill(arr1, 5);
		Arrays.fill(arr2, 5);
		Arrays.fill(arr3, 10);
		
		System.out.print("arr1: ");
		for(int k=0; k<arr1.length; k++) {
			System.out.print(arr1[k] + " ");
		}
		
		int[] tmp = arr1;
		
		System.out.println("\narr1=arr2?" + Arrays.equals(arr1, arr2));
		System.out.println("arr2=arr3?" + Arrays.equals(arr2,arr3));
		System.out.println(arr1 == tmp);  // �Ƚ����������Ƿ�ָ��ͬһ������
	}

}
