var wiznote_doAction = function( popupSrc, clipType ) {
	if(popupSrc != null) {

	}
}

var ShowObjProperty = function(Obj) {
    var PropertyList = '';
    var PropertyCount = 0;
    for (var i in Obj) {
       // if (Obj.i != null)
    console.log(typeof Obj[i]);
        if(typeof Obj[i] === 'function')
             PropertyList = PropertyList + i + '()' +  '方法\r\n'; 
        else
            PropertyList = PropertyList + i + '属性\r\n';
    }
    alert(PropertyList.toString());
    console.log(PropertyList);
}
