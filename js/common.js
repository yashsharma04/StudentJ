function onlyCharactersAllowed(str){
	var flag =0 ;
	for(var i =0 ; i<str.length ;i++){

		if((str.charCodeAt(i)>64 && str.charCodeAt(i)<92 ) || (str.charCodeAt(i)>96 && str.charCodeAt(i)<123) || (str.charCodeAt(i)==32)){
			
		}
		else {
			flag = 1; 
		}
	}
	if(0==flag){
		return true;
	}
	else{
		return false;
	}
}
function checkAddress(address)
{
	if(address.length<5)
	{
		return false; 
	}
	else
		return true ;
}
function checkNumber(phno)
{
	if(phno.length!=10)
	{
		return false ;
	}
	else
		return true ; 
}
function logout(){
	localStorage.setItem("loggedin","false");
	window.open("index.html","_self");
}