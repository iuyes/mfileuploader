function Log(pEl){
	this.el = pEl;
}
Log.prototype.add = function(msg){
	var msgTpl = '<p>' + msg + '</p>';
	this.el.innerHTML += msgTpl;
}
Log.prototype.init = function(msg){
	var msgTpl = '<p>' + msg + '</p>';
	this.el.innerHTML = msgTpl;
}