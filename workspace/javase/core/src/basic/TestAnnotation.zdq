package basic;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value=ElementType.TYPE)
@Retention(value=RetentionPolicy.RUNTIME)
@interface MyAnnotation {
	public String key();
	public String value() default "000";
	public String[] url();
}

@MyAnnotation(key="abc", value="123", url={"111", "222"})
public class TestAnnotation {
	
}
