package thread;

class PrimeThread implements Runnable {
	
	long minPrime;
	
	PrimeThread(long minPrime) {
		this.minPrime = minPrime;
	}

	public void run() {
		System.out.println("compute...");
	}
	
}

public class ThreadDemo01 {

	public static void main(String[] args) {
		PrimeThread p = new PrimeThread(143);
		Thread t = new Thread(p);
		t.start();
//		t.setDaemon(true);	设置daemon 线程必须在启动之前
	}

}
