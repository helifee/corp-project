package com.xinleju.sa.utils;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class CommonUtils {
	
	/**
	 * 根据key和value创建并返回一个map
	 * @param key
	 * @param value
	 * @return
	 */
	public static <K, V> Map<K, V> newMap(K key, V value) {
		Map<K, V> map = new HashMap<>();
		map.put(key, value);
		return map;
	}
	
	public static <T> boolean isEmpty(List<T> list) {
		return null == list || list.isEmpty();
	}
	
	public static <K, V> boolean isEmpty(Map<K, V> map) {
		return null == map || map.isEmpty();
	}
	
	public static boolean isBlank(String string) {
		return StringUtils.isBlank(string) || "null".equalsIgnoreCase(string);
	}
	
	public static Double toDouble(Object value, Double valueIfNull) {
		if (null == value) return valueIfNull;
		if (value instanceof String) {
			return Double.valueOf(value.toString());
		} else if (value instanceof Integer) {
			return ((Integer) value).doubleValue();
		} else if (value instanceof BigDecimal) {
			return ((BigDecimal) value).doubleValue();
		} else if (value instanceof Double) {
			return (Double) value;
		} else if (value instanceof Long) {
			return ((Long) value).doubleValue();
		}
		return (Double) value;
	}
	
	public static void main(String[] args) {
		
//		Stream<String[]> stream = Stream.of(new String[] {"k1", "v1"},new String[] {"k2", "v2"},new String[] {"k1", "v3"},new String[] {"k1", null});
//		Map<String, String> ss = stream.collect(Collectors.toMap(arr -> {System.out.println("=== " + arr[0]);return arr[0];}, arr -> {System.out.println("### " + arr[1]);return arr[1];}, (a1, a2) -> {System.out.println("a1=" + a1 + " a2=" + a2);return a2;}));
//		Map<String, String> ss = stream.collect(()->{System.out.println("121212"); return new HashMap<>();}, (m,e)->m.put(e[0],e[1]), HashMap::putAll);
//		System.out.println(ss);
		Map<String, Object> map = new HashMap<>();
		map.put("1", Integer.valueOf(1));
		map.put("2", "2");
		map.put("3", "1");
		System.out.println(map.containsKey(map.get("3")));
		
		Object ii = Integer.valueOf(2);
		System.out.println((BigDecimal)ii);
		
	}
}
