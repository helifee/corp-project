package thread.producer_consumer;

public class ProducerAndConsumerTest {

	public static void main(String[] args) {
		Conn conn = new Conn();
		
		Producer p = new Producer(conn);
		Consumer c = new Consumer(conn);
		
		new Thread(p).start();
		
		new Thread(c, "A").start();
		new Thread(c, "B").start();
		new Thread(c, "C").start();
	}
}
