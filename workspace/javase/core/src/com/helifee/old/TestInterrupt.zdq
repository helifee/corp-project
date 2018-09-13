package com.helifee.old;
import java.util.Date;

/*
public class TestInterrupt {
	public static void main(String[] args) {
		MyThread t = new MyThread();
		t.start();
		try {
			Thread.sleep(10000);
		}
		catch(InterruptedException e){}
		t.interrupt();
	}
}

class MyThread extends Thread {
	public void run() {
		while(true) {
			System.out.println("------" + new Date() + "--------");
			try {
				sleep(1000);
			}
			catch(InterruptedException e) {
				return;
			}
		}
	}
}
*/
public class TestInterrupt {
	public static void main(String[] args) {
		MyThread t = new MyThread();
		t.start();
		try {
			Thread.sleep(10000);
		}
		catch(InterruptedException e){}
		t.shutDown();
	}
}
