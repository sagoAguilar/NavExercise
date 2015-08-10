/**
 * @fileOverview Navegation
 *
 * @description Load and behavior of navegation
 *
 * @author sago.aguilar
 *
 */
(function () {
	
	// create Node
	_create = function(argument) {
		return document.createElement(argument);
	}
	// get id
	_id = function (argument) {
		return document.getElementById(argument)
	}
	// get class
	_class = function (argument) {
		return document.getElementsByClassName(argument);
	}
	// for each of objects
	_o2a = function (el,callback){
		[].forEach.call(el,callback);
	}
	// eventHandler
	_event = function(el,type,listener,capture){
		capture = capture || false;
		el.addEventListener(type,listener,capture);
	}
	//event toggle class
	_toggle = function (el,clasS) {
		el.classList.toggle(clasS);
	}
	//event remove class
	_remove = function (el,clasS) {
		el.classList.remove(clasS);
	}
	//event remove class
	_add = function (el,clasS) {
		el.classList.add(clasS);
	}
	//event remove class
	_has = function (el,clasS) {
		return el.classList.contains(clasS);
	}
	// get first tag element
	_firsTag = function(argument){
		return document.body.getElementsByTagName(argument)[0]
	}
	// append to DOM
	_append = function (el,data) {
		var family = false;
		var a = _create('a');
		var li = _create('li');
		var ul =_create('ul');
		var i = _create('i');
		a.href = data.url;
		a.innerText = data.label;
		if(data.items && data.items.length>0){
			family = true;
			li.className = "family";
			_event(li,'click',toggler,false);
			_event(ul,'click',prevent,false);
			data.items.forEach(function(data,inx){
				_append(ul,data);
			})
			var i = _create('i');
			i.className = "icon";
			a.appendChild(i);
		}
		li.appendChild(a);
		if(family){
			li.appendChild(ul);
		}
		el.appendChild(li);
	}
	// prevents normal behavior of anchor tag display/hide submenu
	function toggler(e){
		e.preventDefault();
		clean();
		_toggle(this,'active');
		var children = this.children;
		_o2a(this.children,function(el,i){
			displaySubNav(el);
		});
		if (!_has(_id('screen'),'display')) {
			_add(_id('screen'),'display');
		}
	}
	function displaySubNav(el){
		if(el.nodeName == "UL"){
			_toggle(el,'display');
		}
	}
	// prevent event propagation
	function prevent(e){
		e.stopPropagation();
		clean();
		ham(e);
		_remove(_id('screen'),'display');
	}
	function clean(){
		_o2a(_class('family'),function (el,i) {
			_remove(el,'active');
			_o2a(el.children,function(elem,ind){
				_remove(elem,'display');
			})
		});
	}
	// close nav menu
	function screEn(e){
		e.preventDefault();
		clean();
		_remove(this,'display');
	}
	function ham (e) {
		if(window.innerWidth>768) return false;
		_toggle(_class('ham')[0],'open');
		_toggle(_class('huge')[0],'display');
		_toggle(_firsTag('aside'),'display');
		if (!_has(_id('screen'),'display')) {
			_add(_id('screen'),'display');
		}

	}
	// success Callback
	function success (data) {
		var items = data.items;
		if(items && items.length > 0){
			_o2a(_class('items'),function(el,i){
				items.forEach(function(data,ix){
					_append(el,data);
				});
			});
		}
		// append events
		_event(_id('screen'),'click',screEn,false);
		_event(_class('ham')[0],'click',ham,false);
	}
	// error Callback
	function error (data) {
		console.error(data);
	}

	function init (argument) {
		makeRequest('nav.json',success,error);
	}

	init();
})()
