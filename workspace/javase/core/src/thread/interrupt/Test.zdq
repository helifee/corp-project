package thread.interrupt;

public class Test {

	public static void main(String[] args) {
		MyThread mt = new MyThread();
		Thread t1 = new Thread(mt, "�߳�A");
		t1.start();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		t1.interrupt();
	}

}
