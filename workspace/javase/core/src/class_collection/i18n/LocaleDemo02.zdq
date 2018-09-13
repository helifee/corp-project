package class_collection.i18n;

import java.util.Locale;
import java.util.ResourceBundle;

public class LocaleDemo02 {

	public static void main(String[] args) {
		Locale zhloc = new Locale("zh", "CN");
		Locale enloc = new Locale("en", "US");
		ResourceBundle zhRb = ResourceBundle.getBundle("Message_zh_CN", zhloc);
		ResourceBundle enRb = ResourceBundle.getBundle("Message_en_US", enloc);
		System.out.println("内容：" + zhRb.getString("info"));
		System.out.println("内容：" + enRb.getString("info"));
	}

}
