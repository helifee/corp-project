基本预备相关知识 

1 java的GC只负责内存相关的清理，所有其它资源的清理必须由程序员手工完成。要不然会引起资源泄露，有可能导致程序崩溃。 

2 调用GC并不保证GC实际执行。 

3 finalize抛出的未捕获异常只会导致该对象的finalize执行退出。 

4 用户可以自己调用对象的finalize方法，但是这种调用是正常的方法调用，和对象的销毁过程无关。 

5 JVM保证在一个对象所占用的内存被回收之前，如果它实现了finalize方法，则该方法一定会被调用。Object的默认finalize什么都不做，为了效率，GC可以认为一个什么都不做的finalize不存在。 

6 对象的finalize调用链和clone调用链一样，必须手工构造。 如:

protected void finalize() throws Throwable {   
    super.finalize();   
} 

