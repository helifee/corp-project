package thread.producer_consumer;

public class Consumer implements Runnable {

	private Conn conn;

	public Consumer(Conn conn) {
		this.conn = conn;
	}

	public void run() {
		for (int i = 0; i < 100; i++) {
			String tname = Thread.currentThread().getName();
			System.out.println(tname + "消费了：" + conn.read());
			
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
