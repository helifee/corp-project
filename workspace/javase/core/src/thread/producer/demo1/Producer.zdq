package thread.producer.demo1;

public class Producer implements Runnable {
	
	private Info info = null;
	
	public Producer(Info info) {
		this.info = info;
	}

	public void run() {
		for(int i=0; i<100; i++) {
			if(i%2 == 1) {
				this.info.setTitle("zhangsan");
				try {
					Thread.sleep(300);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				this.info.setContent("pg");
			} else {
				this.info.setTitle("helife");
				try {
					Thread.sleep(300);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				this.info.setContent("ceo");
			}
		}
	}

}
