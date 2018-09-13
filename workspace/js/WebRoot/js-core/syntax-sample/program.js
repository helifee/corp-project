var name = {
	'first_name' : 'Tom',
	'last_name' : 'Brown'
};

var msg = name.first_name1 || 'unknown';
document.writeln(msg);

var msg2;
try
{
	//undefined.property
	msg2 = name.first_name1.text || 'unknown';
}
catch (error)
{
	msg2 = 'TypeError!';
}
document.writeln(msg2);

var msg3 = name.first_name1 && name.first_name1.text;
document.writeln(msg3);

var x = name;
x.nick = 'hi';
document.writeln(name.nick);