package tips;

public class ParamTest {

	public void changeInt(int a) {
		a = 3;
	}
	
	public void changePoint(Point p) {
		p.x = 5;
		p.y = 6;
	}
	
	public static void main(String[] args) {
		int a = 1;
		ParamTest pt = new ParamTest();
		pt.changeInt(a);
		System.out.println(a);
		
		Point p = new Point(1, 2);
		pt.changePoint(p);
		System.out.println(p.x);
		System.out.println(p.y);
	}
}

class Point {
	int x;
	int y;
	
	Point(int x, int y) {
		this.x = x;
		this.y = y;
	}
}
