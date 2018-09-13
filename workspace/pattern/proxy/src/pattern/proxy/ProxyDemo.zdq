package pattern.proxy;

interface Give {

	public void giveMoney();
}

class RealGive implements Give {

	public void giveMoney() {
		System.out.println("把钱还给我。。。");
	}
	
}

class ProxyGive implements Give {
	
	private Give give= null;
	
	public ProxyGive(Give give) {
		this.give = give;
	}
	
	public void before() {
		System.out.println("准备东西。。。");
	}
	
	public void after() {
		System.out.println("销毁证据。。。");
	}

	public void giveMoney() {
		this.before();
		this.give.giveMoney();
		this.after();
	}
	
}

public class ProxyDemo {
	public static void main(String[] args) {
		Give proxy = new ProxyGive(new RealGive());
		proxy.giveMoney();
	}
}