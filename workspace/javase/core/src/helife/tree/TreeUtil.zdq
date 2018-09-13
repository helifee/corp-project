package helife.tree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TreeUtil {
	public static Tree getTreeFrom(List<Record> records) {
		
		//�洢����ڵ�List
		Map<Integer, List<Tree>> map = new HashMap<Integer, List<Tree>>();
		
		//��ʾ˳���ַ�ĵ�λ����
		int unitLen = 2;
		
		//�������ԴList��ɸ�����(�����֮��Ƕ��)
		for(int i=0; i<records.size(); i++) {
			Record r = records.get(i);
			Tree t = new Tree();
			t.setId(r.getId());
			t.setTxt(r.getTxt());
			t.setCheck(r.getCheck());
			
			//ȡ�ô˽ڵ����
			String seq = r.getDispSeq();
			List<String> sections = getSections(seq, unitLen);
			int depth = sections.size();
			
			//��һ�㸸�ڵ�Ϊ�����,�����ر�ָ��
			if(1 == depth ) {
				
				//�ò��һ���ڵ�
				if(null == map.get(depth)) {
					
					//��ʼ���ò�ڵ�List������ýڵ�
					List<Tree> lt = new ArrayList<Tree>();
					lt.add(t);
					map.put(depth, lt);
					
				//�ò�ǵ�һ���ڵ�
				} else {
					//ȡ�øò�ڵ�List������ýڵ�
					map.get(depth).add(t);
				}
				
			//�ǵ�һ��ڵ�(����Ҹ��ڵ�)
			} else {
				
				//�ò��һ���ڵ�
				if(null == map.get(depth)) {
					
					//��ʼ���ò�ڵ�List������ýڵ�
					List<Tree> lr = new ArrayList<Tree>();
					lr.add(t);
					map.put(depth, lr);
					
					//���Ҹ��ڵ㲢�˽ڵ���ӵ����ڵ��child List
					Tree parent = getParent(map, depth - 1);
					List<Tree> tmp = parent.getItems();
					if(null == tmp) {
						tmp = new ArrayList<Tree>();
						tmp.add(t);
						parent.setItems(tmp);
					} else {
						parent.getItems().add(t);
					}
				
				//�ò�ǵ�һ���ڵ�
				} else {
					//ȡ�øò�ڵ�List������ýڵ�
					map.get(depth).add(t);
					
					//���Ҹ��ڵ㲢�˽ڵ���ӵ����ڵ��child List
					Tree parent = getParent(map, depth - 1);
					List<Tree> tmp = parent.getItems();
					if(null == tmp) {
						tmp = new ArrayList<Tree>();
						tmp.add(t);
						parent.setItems(tmp);
					} else {
						parent.getItems().add(t);
					}
					
				}
			}
		}
		
		//ȡ�õ�һ����
		List<Tree> items = map.get(1);
		
		//�����
		Tree tree = new Tree();
		tree.setId("000");
		tree.setTxt("Զ��������");
		tree.setCheck(0);
		tree.setItems(items);
		
		return tree;
	}
	
	private static List<String> getSections(String seq, int unitLen) {
		List<String> sections = new ArrayList<String>();
		
		int maxLen = seq.length() / unitLen;
		int index = 0;		
		for(int i=0; i<maxLen; i++) {
			String s = seq.substring(index, index + unitLen);
			if("00".equals(s)) {
				break;				
			} else {
				sections.add(s);
				index = index + unitLen;
			}
		}
		
		return sections;
	}

	//�Ҹ��ڵ�
	private static Tree getParent(Map<Integer, List<Tree>> map, int grade) {
		List<Tree> lt = map.get(grade);
		return lt.get(lt.size() - 1);
	}

	
	public static void setRecords(List<Record> records, Tree tree, int depth, int index) {
		
		Record r = new Record();
		r.setId(tree.getId());
		r.setTxt(tree.getTxt());
		r.setCheck(tree.getCheck());
		r.setDispSeq(getSeq(depth, index));
		records.add(r);	
		
		List<Tree> list = tree.getItems();
		if(null != list) {
			depth++;
			for(int i = 0; i < list.size(); i++) {
				setRecords(records, list.get(i), depth, i);
			}
		}
		
	}
	
	private static String getSeq(int depth, int index) {
		String seq = "";
		String seq_p = "";
		if(0 == depth) {
			seq = "0000000000";
		} else {
			String last = String.valueOf(index + 1);
			if(last.length() < 2) {
				last = "0" + last;
			}
			seq_p = getSeq(depth - 1, 0);
			int index2 = (depth - 1) * 2 - 1;
			if(index2 < 0) {
				index2 = 0;
			}
			String head = seq_p.substring(0, index2);
			String tail = seq_p.substring(index2 + 2);
			seq = head + last + tail;
			
		}
		
		return seq;
	}
}
