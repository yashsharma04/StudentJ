
		document.addEventListener("DOMContentLoaded", function(event) { 
			if(localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")=="false" || localStorage.getItem("loggedin")==null)
			{
				// do nothing 
			}
			else
			{
				if(localStorage.getItem("loggedin")==0)
					window.open("onLogin.html","_self");	
				else if(localStorage.getItem("loggedin")==1)
				{
					window.open("teacherLogin.html","_self");		
				}
				else if(localStorage.getItem("loggedin")==2)
				{
					window.open("studentLogin.html","_self");		
				}
			}
			
		});	
		function checkIfEmpty(username,password)
		{
			if(username.trim()=="" || password.trim()=="")
				return true;
			else 
				return false;
		}
		function checkIfAdmin(username,password){

			if(username=="admin" && password=="admin"){
				return true ;
			}
			else
			{
				return false;
			}
		}
		function checkIfTeacher(username,password){


			var count = 0 , flag = 0 ;
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			if(teachersArray!="undefined"){
					for(var i =0 ;i<teachersArray.length;i++){
					if(username==teachersArray[i].user_name && password==teachersArray[i].password){
						return true ;
					}
				}	
			}
			return false;
		}
		function checkIfStudent(username,password){

			var students = JSON.parse(localStorage.getItem("students"));
			if(!(students=="undefined" || students==null || students=="null")){
					for(var i =0 ;i <students.length ; i++){

					if (username==students[i].username && password==students[i].password){
						return true; 
					}
					return false ;
				}	
			}

		}
		function check(){
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			if(checkIfEmpty(username,password)){
				document.getElementById("lb").innerText = "Fields Empty";
				document.getElementById("lb").style.color = "red";
				return false ;			
			}
			else if (checkIfAdmin(username,password)){

				localStorage.setItem("loggedin",0);
				localStorage.setItem("username","admin");
				window.open("onLogin.html","_self");
				// return true ;
			}
			else if(checkIfTeacher(username,password)){

				localStorage.setItem("loggedin",1);
				localStorage.setItem("username",username);
				// count = 1 ;
				window.location.href="teacherLogin.html";
			}
			else if(checkIfStudent(username,password))
			{
				localStorage.setItem("loggedin",2);
				localStorage.setItem("username",username);
				window.location.href="studentLogin.html";
			}
			else{
				document.getElementById("lb").innerText = "UserName or Password wrong";
				document.getElementById("lb").style.color = "red";
				return false ;			
			}
			
		}
	
	