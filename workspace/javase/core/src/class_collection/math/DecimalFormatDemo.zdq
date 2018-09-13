package class_collection.math;

import java.text.DecimalFormat;

class NumFormat {
	public void format(String pattern, double value) {
		DecimalFormat format = new DecimalFormat(pattern);
		String str = format.format(value);
		System.out.println("���ְ��գ�" + pattern +"����ʽ����" + str  );
	}
}

public class DecimalFormatDemo {

	public static void main(String[] args) {
		NumFormat format = new NumFormat();
		format.format("000,000.000", 123456.12);
		format.format("###,###.###", 123456.12);
		format.format("000,000.000��", 123456.12);
		format.format("###,###.###��", 123456.12);
		format.format("##.###%", 0.235695);
		format.format("00.###%", 0.03698);
	}

}
