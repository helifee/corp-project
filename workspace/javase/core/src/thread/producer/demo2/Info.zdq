package thread.producer.demo2;

public class Info {

	private String title = "zhangsan";
	private String content = "pg";
	
	public synchronized void set(String title, String content) {
		try {
			Thread.sleep(300);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.setTitle(title);
		this.setContent(content);
	}
	
	public synchronized void get() {
		System.out.println(this.title + "-->" + this.content);
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
