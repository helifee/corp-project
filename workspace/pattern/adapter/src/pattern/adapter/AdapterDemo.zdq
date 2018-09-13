package pattern.adapter;

interface Window {

	public void open();

	public void close();

	public void icon();

	public void unicon();
}

abstract class WindowAdapter implements Window {
	public void open(){}

	public void close(){}

	public void icon(){}

	public void unicon(){}
}

class MyWindow extends WindowAdapter {
	public void open() {
		System.out.println("打开窗口");
	}
}

public class AdapterDemo {
	public static void main(String[] args) {
		MyWindow win = new MyWindow();
		win.open();
	}
}