/**
 * ���� �ر�IE���������
 */
function closeWindow() {
	window.opener = null;
	window.open(' ', '_self', ' ');
	window.close();
}
/**
 * window.open �����´��ڵ���� 'page.html' �������ڵ��ļ����� 'newwindow'
 * �������ڵ����֣������ļ��������Ǳ��룬���ÿ�''���棻 height=100 ���ڸ߶ȣ� width=400 ���ڿ�ȣ� top=0
 * ���ھ�����Ļ�Ϸ�������ֵ�� left=0 ���ھ�����Ļ��������ֵ�� toolbar=no �Ƿ���ʾ��������yesΪ��ʾ��
 * menubar��scrollbars ��ʾ�˵����͹������� resizable=no �Ƿ�����ı䴰�ڴ�С��yesΪ���� location=no
 * �Ƿ���ʾ��ַ����yesΪ���� status=no �Ƿ���ʾ״̬���ڵ���Ϣ��ͨ�����ļ��Ѿ��򿪣���yesΪ���� ����һ��<body
 * onload="openWindow()"> �������ҳ��ʱ�������ڣ� ��������<body onunload="openWindow()">
 * ������뿪ҳ��ʱ�������ڣ� ����������һ�����ӵ��ã� <a href="#" onclick="openWindow()">��һ������</a>
 * ע�⣺ʹ�õġ�#���������ӡ� �����ģ���һ����ť���ã� <input type="button" onclick="openWindow()"
 * value="�򿪴���">
 * 
 * @param {}
 *            url
 */
function openWindow(url, title) {
	window
			.open(
					getRootPath() + url,
					title,
					'top=0, left=0, ,toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no,fullscreen=true');
}
/**
 * ��󻯴򿪴���
 * 
 * @param {}
 *            url
 * @param {}
 *            title
 */
function openMaxWindow(url) {
	window.open(getRootPath() + url, 'fullscreen',
			'channelmode=yes,fullscreen=yes');// �����ģʽ�򿪴���
}
