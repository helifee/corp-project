package com.helifee.old;

import java.util.Date;

class MyThread extends Thread {
	private boolean flag = true;
	
	public void run() {
		while(flag) {
			System.out.println("------" + new Date() + "--------");
			try {
				sleep(1000);
			}
			catch(final InterruptedException e) {
				return;
			}
		}
	}
	
	public void shutDown() {
		flag = false;
	}
	
}