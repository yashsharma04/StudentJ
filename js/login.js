		$(function() { 
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
			$("#btn").click(function(){
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;
				if(checkIfEmpty(username,password)){
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
					window.location.href="teacherLogin.html";
				}
				else if(checkIfStudent(username,password))
				{
					localStorage.setItem("loggedin",2);
					localStorage.setItem("username",username);
					window.location.href="studentLogin.html";
				}
				else{
					document.getElementById("error_u").style.display="none";
					document.getElementById("error_p").style.display="none";
					document.getElementById("lb").innerText = "UserName or Password wrong";
					document.getElementById("lb").style.color = "red";
					return false ;			
				}
			
		}) ;
			
		});	
		function checkIfEmpty(username,password){
			var count = 0 ;
			if(username.trim()==""){
				document.getElementById("error_u").innerText = "Username Empty";
				document.getElementById("error_u").style.color = "red";
				count =1 ;
			}
			if(password.trim()==""){
				document.getElementById("error_p").innerText = "Password Empty";
				document.getElementById("error_p").style.color = "red";
				count =1 ;
			}
			if(0==count)
				return false ;
			else 
				return true ;

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

	
	