package thread.producer.demo3;

public class Info {

	private String title = "zhangsan";
	private String content = "pg";
	
	private boolean flg = false;
	
	public synchronized void set(String title, String content) {
		if(flg == false) {
			try {
				super.wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		try {
			Thread.sleep(300);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.setTitle(title);
		this.setContent(content);
		
		this.flg = false;
		super.notify();
	}
	
	public synchronized void get() {
		if(flg == true) {
			try {
				super.wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.println(this.title + "-->" + this.content);
		
		this.flg = true;
		super.notify();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
