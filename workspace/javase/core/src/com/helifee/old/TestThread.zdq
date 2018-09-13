package com.helifee.old;
public class TestThread {
	public static void main(String[] args) {
		Runner1 r = new Runner1();
		//Thread t = new Thread(r);
		//t.start();
		r.start();
		
		for(int i=0; i<100; i++) {
			System.out.println("main thread: " + i);
		}
	}
}

//class Runner1 implements Runnable {
class Runner1 extends Thread {
	public void run() {
		System.out.println(Thread.currentThread().isAlive());
		for(int i=0; i<100; i++) {
			System.out.println("Runner1: " + i);
		}
	}
}