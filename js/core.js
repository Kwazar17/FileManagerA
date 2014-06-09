window.onload = function() {
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
	xmlObj.send ('action=opendir&catpath=dir1');
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
	function viewTree (cats, files){
		var frag = document.createDocumentFragment();
		
		var bbb = document.body;
		var ul = document.createElement('ul');
		 
		for (i=0;i<cats.length;i++) {
			li =document.createElement('li');
			 
			ah=li.appendChild (document.createElement ('a'));
			ah.setAttribute('class',getAttribXML(cats[i])['class']);
			ah.setAttribute('data',getAttribXML(cats[i])['data']);
			ah.setAttribute('name',getAttribXML(cats[i])['name']);
			ah.innerHTML = getAttribXML(cats[i])['name'];
			
			ul.appendChild(li);
			
		}
		
		
		
		frag.appendChild(ul);
		
		
		bbb.appendChild(frag);
	}
}
 