PMD可用的规则

PMD 包含 16 个规则集，涵盖了 Java 的各种常见问题，其中一些规则要比其他规则更有争议：

1.基本（rulesets/basic.xml）
  规则的一个基本合集，可能大多数开发人员都不认同它： catch 块不该为空，无论何时重写 equals()，
都要重写 hashCode()，等等。

2.命名（rulesets/naming.xml）
  对标准 Java 命令规范的测试：变量名称不应太短；方法名称不应过长；类名称应当以小写字母开头；
方法和字段名应当以小写字母开头，等等。

3.未使用的代码（rulesets/unusedcode.xml）
  查找从未使用的私有字段和本地变量、执行不到的语句、从未调用的私有方法，等等。

4.设计（rulesets/design.xml）
  检查各种设计良好的原则，例如： switch 语句应当有 default 块，应当避免深度嵌套的 if 块，不应当给参数重新赋值，
不应该对 double 值进行相等比较。

5.导入语句（rulesets/imports.xml）
  检查 import 语句的问题，比如同一个类被导入两次或者被导入 java.lang 的类中。

6.JUnit 测试（rulesets/junit.xml）
  查找测试用例和测试方法的特定问题，例如方法名称的正确拼写，以及 suite() 方法是不是 static 和 public。

7.字符串（rulesets/strings.xml）
  找出处理字符串时遇到的常见问题，例如重复的字符串标量，调用 String 构造函数，对 String 变量调用 toString() 方法。

8.括号（rulesets/braces.xml）
  检查 for、 if、 while 和 else 语句是否使用了括号。

9.代码尺寸（rulesets/codesize.xml）
  测试过长的方法、有太多方法的类以及重构方面的类似问题。

10.Javabean（rulesets/javabeans.xml）
  查看 JavaBean 组件是否违反 JavaBean 编码规范，比如没有序列化的 bean 类。

11.终结函数（finalizer）
  因为在 Java 语言中， finalize() 方法不是那么普遍，所以它们的使用规则虽然很详细，但是人们对它们相对不是很熟悉。
这类检查查找 finalize() 方法的各种问题，例如空的终结函数，调用其他方法的 finalize() 方法，对 finalize() 的显式调用，等等。

12.克隆（rulesets/clone.xml）
  用于 clone() 方法的新规则。
凡是重写 clone() 方法的类都必须实现 Cloneable， clone() 方法应该调用 super.clone()，
而 clone() 方法应该声明抛出 CloneNotSupportedException 异常，即使实际上没有抛出异常，也要如此。

13.耦合（rulesets/coupling.xml）
  查找类之间过度耦合的迹象，比如导入内容太多；
在超类型或接口就已经够用的时候使用子类的类型；类中的字段、变量和返回类型过多等。


14.严格的异常（rulesets/strictexception.xml）
  针对异常的测试：不应该声明该方法而抛出 java.lang.Exception 异常，
不应当将异常用于流控制，不应该捕获 Throwable，等等。

15.有争议的（rulesets/controversial.xml）
  PMD 的有些规则是有能力的 Java 程序员可以接受的。但还是有一些争议。
这个规则集包含一些更有问题的检验，其中包括把 null 赋值给变量、方法中有多个返回点，以及从 sun 包导入等。


16.日志（rulesets/logging-java.xml）
  查找 java.util.logging.Logger 的不当使用，包括非终状态（nonfinal）、非静态的记录器，
以及在一个类中有多个记录器。
可以一次用多个规则集进行检查，只需在命令行中用逗号分隔规则集名称即可：

pmd src html rulesets/design.xml,rulesets/naming.xml,rulesets/basic.xml

set CLASSPATH=D:\javasoft\pmd-4.2.5\bin\customruleset.xml
echo %CLASSPATH%
D:\javasoft\pmd-4.2.5\bin\pmd.bat D:\project\src  xml customruleset -reportfile pmdssh.html -encoding utf-8
pause
