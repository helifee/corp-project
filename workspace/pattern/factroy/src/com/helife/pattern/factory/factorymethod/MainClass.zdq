package com.helife.pattern.factory.factorymethod;

public class MainClass {
	public static void main(String[] args) throws Exception {
		FruitFactory ff = new AppleFactory();
		Fruit apple = ff.getFruit();
		apple.get();
		
		//新加产品
		FruitFactory ff2 = new BananaFactory();
		Fruit banana = ff2.getFruit();
		banana.get();
	}
}
