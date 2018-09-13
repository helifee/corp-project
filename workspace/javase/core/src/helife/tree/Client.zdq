package helife.tree;

import java.util.ArrayList;
import java.util.List;

public class Client {
	public static void main(String[] args) {
		
		//׼�����
		List<Record> records = new ArrayList<Record>();
		records.add(new Record("001", "aaa", 1, "0100000000"));
		records.add(new Record("002", "bbb", 0, "0102000000"));
		records.add(new Record("012", "bbb", 0, "0102010000"));
		records.add(new Record("003", "ccc", 1, "0103000000"));
		records.add(new Record("004", "ddd", 1, "0200000000"));
		records.add(new Record("005", "eee", 1, "0201000000"));
		records.add(new Record("013", "eee", 1, "0201010000"));
		records.add(new Record("006", "fff", 0, "0202000000"));
		records.add(new Record("007", "ggg", 1, "0300000000"));
		records.add(new Record("008", "hhh", 1, "0301000000"));
		records.add(new Record("009", "iii", 1, "0302000000"));
		records.add(new Record("010", "iii", 1, "0302010000"));
		records.add(new Record("011", "iii", 1, "0302020000"));
		
		//�����
		Tree tree = TreeUtil.getTreeFrom(records);
		
		//�����
		print(tree, 0);
		
		//
		records = new ArrayList<Record>();
		TreeUtil.setRecords(records, tree, 0, 0);
		System.out.println("over");
	}
	
	public static void print(Tree tree, int depth) {
		
		//������
		String indent = "";
		for(int i=0; i<depth; i++) {
			indent = indent + "---------";
		}
		
		System.out.println(indent + tree.getId() + "-" + tree.getTxt() + "-" + tree.getCheck());
		System.out.println();
		List<Tree> items = tree.getItems();
		if(null != items) {
			depth++;
			for(int i=0; i<items.size(); i++) {
				print(items.get(i), depth);
			}
		}
	}
}
