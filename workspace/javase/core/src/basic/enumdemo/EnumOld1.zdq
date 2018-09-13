package basic.enumdemo;

class Color1 {
	private String name;
	
	public static final Color1 RED = new Color1("��ɫ");
	public static final Color1 GREEN = new Color1("��ɫ");
	public static final Color1 BLUE = new Color1("��ɫ");
	
	public static Color1 getInstance(int i) {
		if(i == 0) {
			return RED;
		}
		if(i == 1) {
			return GREEN;
		}
		if(i == 2) {
			return BLUE;
		}
		return null;
	}
	
	private Color1(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

public class EnumOld1 {

	public static void main(String[] args) {
		Color1 c = Color1.getInstance(0);
		System.out.println(c.getName());
	}

}
