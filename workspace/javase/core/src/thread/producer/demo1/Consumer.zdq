package thread.producer.demo1;

public class Consumer implements Runnable {
	
	private Info info = null;
	
	public Consumer(Info info) {
		this.info = info;
	}

	public void run() {
		for(int i=0; i<100; i++) {
			try {
				Thread.sleep(300);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(this.info.getTitle() + "-->" + this.info.getContent());
		}
	}

}
