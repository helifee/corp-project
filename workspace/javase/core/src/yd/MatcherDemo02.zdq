package yd;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherDemo02 {

	public static void main(String[] args) {
		String str = "111-11-111";
		String pat = "\\d{3}-\\d{2}-\\d{3}";
		Pattern p = Pattern.compile(pat);
		Matcher m = p.matcher(str);
		if(m.matches()) {
			System.out.println("true");
		} else {
			System.out.println("false");
		}
	}

}
