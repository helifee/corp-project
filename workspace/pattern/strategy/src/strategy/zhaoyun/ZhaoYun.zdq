package strategy.zhaoyun;

/**
 * 
结构
环境角色：持有一个Strategy类（策略类）的引用
抽象策略角色：策略类，通常由一个接口或者抽象类实现
具体策略角色：包装了相关的算法和行为

策略模式（Strategy模式）
策略模式是对算法的包装，是吧使用算法的责任和算法本身分割开来，委派给不同的对象管理。
策略模式通常把一个系列的算法包装到一系列的策略类里面，作为一个抽象策略类的子类。
一句话来形容：准备一组算法，并将每一个算法封装起来，使得他们可以互换。

优点：
1.提供了管理相关的算法族的办法。
2.提供了可以替换继承关系的办法。
3.避免使用多重条件转移语句

缺点：
1.客户端必须知道所有的策略类，并自行决定使用哪一个策略类。
2.造成很多的策略类。

 *
 */
public class ZhaoYun {

	/**
	 * 策略执行者
	 * @param args
	 */
	public static void main(String[] args) {
		Context context;
		
		//执行第一个策略
		context = new Context(new BackDoor());
		context.operate();
		
		//执行第二个策略
		context = new Context(new GivenGreenLight());
		context.operate();
		
		//执行第三个策略
		context = new Context(new BlockEnemy());
		context.operate();
	}

}
