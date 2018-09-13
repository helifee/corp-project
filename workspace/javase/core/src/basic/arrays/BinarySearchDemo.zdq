package basic.arrays;

import java.util.Arrays;
import java.util.Scanner;

public class BinarySearchDemo {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		
		int[] arr = {65, 34, 54, 23, 77, 99, 23};
		
		System.out.print("����ǰ:");
		for(int i=0; i<arr.length; i++) {
			System.out.print(arr[i] + " ");
		}
		System.out.println();
		
		Arrays.sort(arr);
		
		System.out.print("�����:");
		for(int i=0; i<arr.length; i++) {
			System.out.print(arr[i] + " ");
		}
		
		System.out.print("\n����������ֵ: ");
		int key = scanner.nextInt();
		int find = Arrays.binarySearch(arr, key);
		if(find > -1) {
			System.out.println("�ҵ�ֵ������ " + find + "λ��");
		}
		else {
			System.out.println("�Ҳ���ָ��ֵ");
		}
	}

}
