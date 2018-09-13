package com.helifee.old;
public class TestPriority {
	public static void main(String[] args) {
		Thread t1 = new Thread(new T1());
		Thread t2 = new Thread(new T2());
		t1.setPriority(Thread.NORM_PRIORITY + 3);
		t1.start();
		t2.start();
	}
}

class T1 implements Runnable {
	public void run() {
		for(int i=0; i<100; i++) {
			System.out.println("t1: " + i);
		}
	}
}

class T2 implements Runnable {
	public void run() {
		for(int i=0; i<100; i++) {
			System.out.println("---------------t2: " + i);
		}
	}
}