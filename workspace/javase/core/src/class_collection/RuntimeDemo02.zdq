package class_collection;

public class RuntimeDemo02  {
	public static void main(String[] args) throws Exception {
		Runtime run = Runtime.getRuntime();
		System.out.println("** 总内存" + run.totalMemory());
		System.out.println("** 最大内存" + run.maxMemory());
		System.out.println("** 计算前的可用内存" + run.freeMemory());
		String str = "";
		for(int i=0; i<10000; i++) {
			str += i;
		}
		System.out.println("** 计算后的可用内存" + run.freeMemory());
		run.gc();
		System.out.println("** 收集后的可用内存" + run.freeMemory());
		
	}
}
