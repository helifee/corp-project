package thread.producer_consumer;

/**
 * 生产者类
 */
public class Producer implements Runnable {
	
	private Conn conn;
	
	public Producer(Conn conn) {
		this.conn = conn;
	}

	public void run() {
		for(int i=1; i<=200; i++) {
			this.conn.add(i);
			System.out.println("生产了：" + i);
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
