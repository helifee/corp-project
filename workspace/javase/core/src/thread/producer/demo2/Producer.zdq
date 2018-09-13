package thread.producer.demo2;

public class Producer implements Runnable {
	
	private Info info = null;
	
	public Producer(Info info) {
		this.info = info;
	}

	public void run() {
		for(int i=0; i<100; i++) {
			if(i%2 == 1) {
				this.info.set("zhangsan", "pg");
			} else {
				this.info.set("helife", "ceo");
			}
		}
	}

}
