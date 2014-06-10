window.onload = function() {
	sendReq();
	
	
	
	
	function sendReq (req) {
		if(window.XMLHttpRequest){
			xmlObj = new XMLHttpRequest();
		} else if(window.ActiveXObject){
			xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			return;
		}
		xmlObj.onreadystatechange = function(){
			 
			if(xmlObj.readyState == 4){
				XMLpars (xmlObj.responseText);
				
			}

		} 
		xmlObj.open ('POST', 'prog.php',true);
		xmlObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlObj.send (req);
	
	}
	function XMLpars (data) {
		  var xml=txtToXML(data);
		  var file = xml.getElementsByTagName('files');
		  var catalogs =xml.getElementsByTagName('catalog');
		  viewTree (file,catalogs);
		 
	}
	
	/*
	*
	Получение массива аттрибутов элемента
	*/
	function getAttribXML (node) {
		var ret = new Object();  
		  if(node.attributes)  
		  for(var i=0; i<node.attributes.length; i++)  
		  {  
			var attr = node.attributes[i];  
			ret[attr.name] = attr.value;  
		  }  
		  return ret;  
	}
	
	/*
	*
	Преобразование текста в XML Object
	*/
	
	function txtToXML(respText) {
		/*
		Extract Ajax response text to an XML object
		*/
		var xmlobject;
		if ( respText ) {
		if ( window.ActiveXObject ) {
		xmlobject = new ActiveXObject( "Msxml2.DOMDocument" );
		xmlobject.loadXML( respText );
		} else if ( DOMParser ) {
		var xmlobject = ( new DOMParser() ).parseFromString(respText, "text/xml" );
		}
		}
		return xmlobject;
		}
	
	/*
	*
	Функция вывода структуры каталогов и файлов
	*/
	
	function clearTree () {
		var el = document.getElementById('f-out-ul');
		if (el) {
			el.parentNode.removeChild (el);
		} 
	
	}
	function viewTree (cats, files){
		clearTree();
		var frag = document.createDocumentFragment();
		
		var bbb = document.body;
		var ul = document.createElement('ul');
		ul.setAttribute('id','f-out-ul');
		 
		for (i=0;i<cats.length;i++) {
			li =document.createElement('li');
			ah=li.appendChild (document.createElement ('a'));
			ah.setAttribute('class',getAttribXML(cats[i])['class']);
			ah.setAttribute('data',getAttribXML(cats[i])['data']);
			ah.setAttribute('name',getAttribXML(cats[i])['name']);
			ah.innerHTML = getAttribXML(cats[i])['name'];
			ul.appendChild(li);
		}
		for (i=0;i<files.length;i++) {
			li =document.createElement('li');
			ah=li.appendChild (document.createElement ('a'));
			ah.setAttribute('class',getAttribXML(files[i])['class']);
			ah.setAttribute('data',getAttribXML(files[i])['data']);
			ah.setAttribute('name',getAttribXML(files[i])['name']);
			ah.innerHTML = getAttribXML(files[i])['name'];
			ul.appendChild(li);
		}
		frag.appendChild(ul);
		bbb.appendChild(frag);
	}
	
	 
	window.onclick = function (e) {
		e = e||event;
		if (e.target.className == "f-out-list catalog") {
			var dataAttr = getAttribXML(e.target)['data'];
			if (dataAttr.substr(0,1) == '/') {
				dataAttr = dataAttr.slice(1);
			}
			var dataReq = 'action=opendir&catpath='+dataAttr;
			console.log (dataReq);
			 
			sendReq(dataReq);
		}
	}
	
}
 