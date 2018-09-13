package thread.priority;

public class Test {

	public static void main(String[] args) {
		MyThread mt = new MyThread();
		Thread t1 = new Thread(mt, "�߳�A");
		Thread t2 = new Thread(mt, "�߳�B");
		Thread t3 = new Thread(mt, "�߳�C");
		t1.setPriority(Thread.MAX_PRIORITY);
		t2.setPriority(Thread.NORM_PRIORITY);
		t3.setPriority(Thread.MIN_PRIORITY);
		t1.start();
		t2.start();
		t3.start();
		
		System.out.println("main" + Thread.currentThread().getPriority());
		System.out.println("max" + Thread.MAX_PRIORITY);
		System.out.println("min" + Thread.MIN_PRIORITY);
	}

}
