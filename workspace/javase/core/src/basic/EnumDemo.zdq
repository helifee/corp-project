package basic;

enum Color {
	RED("红色"), GREEN("绿色"), BLUE("蓝色");
	
	private String name;
	
	Color(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

public class EnumDemo {

	public static void main(String[] args) {
		Color c = Color.BLUE;
		switch(c) {
			case RED: {
				System.out.println("红色" + c.name() + c.getName());
				break;
			}
			case BLUE: {
				System.out.println("蓝色" + c.name() + c.getName());
				break;
			}
		}
	}

}
