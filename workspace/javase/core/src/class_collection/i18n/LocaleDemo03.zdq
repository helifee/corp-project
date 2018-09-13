package class_collection.i18n;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

public class LocaleDemo03 {

	public static void main(String[] args) {
		Locale zhloc = new Locale("zh", "CN");
		Locale enloc = new Locale("en", "US");
		ResourceBundle zhRb = ResourceBundle.getBundle("Message_zh_CN", zhloc);
		ResourceBundle enRb = ResourceBundle.getBundle("Message_en_US", enloc);
		String zhValue = zhRb.getString("info");
		String enValue = enRb.getString("info");
		System.out.println("内容：" + MessageFormat.format(zhValue, "张三", 20));
		System.out.println("内容：" + MessageFormat.format(enValue, "zhangsan", 21));
	}

}