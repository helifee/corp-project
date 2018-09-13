package pattern.factroy;

public class FruitFactroy02 {
	public static Fruit getFruit(String className) throws Exception {
		Fruit f = null;

		f = (Fruit)Class.forName(className).newInstance();

		return f;
	}
}
