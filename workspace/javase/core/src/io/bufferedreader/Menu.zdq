package io.bufferedreader;

public class Menu {	//��ʾ�˵�
	
	public Menu() {
		while(true) {
			this.show();
		}
	}

	public void show() {
		System.out.println("---------XXXϵͳ----------");
		System.out.println("      [1] �������  ");
		System.out.println("      [2] �������  ");
		System.out.println("      [3] �޸����  ");
		System.out.println("      [4] ɾ�����  ");
		System.out.println("      [0] �˳�ϵͳ  ");
		
		InputData input = new InputData();
		int choose = input.getInt("\n\n��ѡ��:", "�������,������ѡ��");
		
		switch(choose) {
			case 1: {
				Operater.add();
				break;
			}
			
			case 2: {
				Operater.find();
				break;
			}
			
			case 3: {
				Operater.update();
				break;
			}
			
			case 4: {
				Operater.delete();
				break;
			}
			
			case 0: {
				System.exit(1);
				break;
			}
			
			default: {
				System.out.println("��Ч���");
			}
		}
		
	}
}
