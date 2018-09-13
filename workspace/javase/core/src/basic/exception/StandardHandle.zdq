package basic.exception;

public class StandardHandle {

	public static int div(int i, int y) throws Exception {
		System.out.println("----------除法之前-----------");
		int temp = 0;
		try {
			temp = i / y;
		}catch(Exception e) {
			throw e;
		} finally {
			System.out.println("----------除法之后-----------");			
		}
		return temp;
	}
	
	public static void main(String[] args) {
		try {
			int ret = div(10, 0);
			System.out.println(ret);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
