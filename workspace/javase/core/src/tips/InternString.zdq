package tips;

public class InternString {
	public static void main(String[] args) {
		String s1 = "fly";
		String s2 = "weight";
		String s3 = "flyweight";
		String s4 = null;
		
		s4 = s1 + s2;
		System.out.println(s3==s4);
		
		s4 = (s1 + s2).intern();//����pool����û��
		System.out.println(s3==s4);
		
		String a = "ab";
		String b = "a" + "b";
		System.out.println(a==b);
	}
}