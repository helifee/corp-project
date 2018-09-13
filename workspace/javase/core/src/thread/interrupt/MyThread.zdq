package thread.interrupt;

public class MyThread implements Runnable {

	public void run() {
		System.out.println("1������Run������");
		try {
			System.out.println("2���߳�����20��");
			Thread.sleep(20000);
			System.out.println("3���߳̽�������20��");
		} catch (InterruptedException e) {
			System.out.println("4���̱߳��ж�");
			return;
		}
		System.out.println("5�������Run������");
	}

}
