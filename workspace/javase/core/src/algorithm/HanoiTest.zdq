package algorithm;

import  java.io.*;

class Hanoi {
	
	private static int step;
	
	/**
	 * 递归移动
	 * @param n ：盘子数
	 * @param a ：盘子初始柱子
	 * @param b ：中间柱子
	 * @param c ：目标柱子
	 */
	public static void move(int n, char a, char b, char c) {
		if(n == 1) {
			step++;
			System.out.println(step + ": " + a + "-->" + c);
		} else {
			move(n - 1, a, c, b);
			step++;
			System.out.println(step + ": " + a + "-->" + c);
			move(n - 1, b, a, c);
		}
	}

	public static int getStep() {
		return step;
	}
}

public class HanoiTest {
	
	public static void main(String[] args) throws IOException {
		int n;
		BufferedReader buf;
		buf = new BufferedReader(new InputStreamReader(System.in));
		System.out.print("Please input: ");
		n = Integer.parseInt(buf.readLine());
		Hanoi.move(n, 'A', 'B', 'C');
		System.out.println("There is " + Hanoi.getStep() + " steps");
	}
	

}
