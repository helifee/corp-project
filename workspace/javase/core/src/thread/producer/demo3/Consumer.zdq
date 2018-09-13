package thread.producer.demo3;

public class Consumer implements Runnable {
	
	private Info info = null;
	
	public Consumer(Info info) {
		this.info = info;
	}

	public void run() {
		for(int i=0; i<100; i++) {
			this.info.get();
		}
	}

}
