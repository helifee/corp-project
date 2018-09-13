package generics;

class D {
	
	//���ͷ���
	public <T> T print(T param) {
		return param;
	}
}

public class GenericDemo04 {

	public static void main(String[] args) {
		D d = new D();
		System.out.println(d.print("String"));
		
		Integer[] arr = fun(2, 4, 5, 6);
		for(int i : arr) {
			System.out.print(i + ", ");
		}
		
	}
	
	//����ֵΪ��������
	public static <T> T[] fun(T ... param) {
		return param;
	}

}
