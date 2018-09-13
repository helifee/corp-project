package yd;
import java.util.Scanner;

public class Prime {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Scanner reader = new Scanner(System.in);
		System.out.print("Input a number: ");
		int n = reader.nextInt();
		
		if(isPrime(n)) {
			System.out.println("�͂�");
		}
		else {
			System.out.println("������");
		}
	}
	
	public static boolean isPrime(int n) {
		for(int i=2; i<=Math.sqrt(n); i++) {
			if(n % i == 0) {
				return false;
			}
		}
		return true;
	}

}
