package facade.postoffice;

public class PostOffice {

	private LetterProcess letterProcess = new LetterProcessImpl();
	
	private Police police = new Police();
	
	public void sendLetter(String address, String content) {
		letterProcess.writeContent(content);;
		letterProcess.fillEvelop(address);;
		letterProcess.letterIntoEvelop();
		
		police.checkLetter(letterProcess);
		
		letterProcess.sendLetter();
	}
}
