package oo.list.demo1;

public class MyList {
	
	private Node head;
	private Node tail;
	private static int count;
	
	public int add(Node node) {
		if(null == node) {
			return -1;
		}
		
		if(null == head) {
			head = node;
			tail = node;
			
		} else {
			tail.setNext(node);
			tail = node;
		}
		return ++count;
	}
	
	public void delete(Node node) {
		// TODO
		
	}
	
	public int find(Node node) {
		return 0;
	}
	
	public String getInfo() {
		return null;
	}
	
	public void print() {
		print(head);
	}
	
	private void print(Node node) {
		System.out.print(node + " --> ");
		Node next = node.getNext();
		if(null != next) {
			print(next);
		}
	}
}
