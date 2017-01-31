	$(function(){
		var ids = {
			"student_name": document.getElementById("student_name"),
			"user_name":document.getElementById("user_name"),
			"password":document.getElementById("password"),
			"cpassword":document.getElementById("cpassword")
		};
		if (localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")==null || localStorage.getItem("loggedin")=="false")
		{
			window.open("index.html","_self");
		}
		else 
		{
			if(0==localStorage.getItem("loggedin"))
					window.open("onLogin.html","_self");
			else if(2==localStorage.getItem("loggedin"))
					window.open("studentLogin.html","_self");
		}
		$("#add").click(function(){

			var name = ids.student_name.value;
			var username = ids.user_name.value;
			var password = ids.password.value;
			var cpassword= ids.cpassword.value;
			var len = name.length ;

			var count =0 ;
			if(ifEmpty(name,username,password,cpassword))
			{
				if(onlyCharactersAllowed(name))
				{
					if(password.length>5 && password.length<15)
					{
						if (password==cpassword)
						{
							if(localStorage.getItem("students")=="undefined" ||localStorage.getItem("students")==null  )
							{
								var students = [] ;
								var student = {

									"username":username,
									"name":name,
									"password":password
								};
								students.push(student);
								localStorage.setItem("students",JSON.stringify(students));
								localStorage.setItem("error","Student Added Successfully");
								window.open("teacherLogin.html","_self");
							}
							else 
							{
								var students = JSON.parse(localStorage.getItem("students"));
								var count = 0 ; 
								for(var i=0 ; i<students.length;i++)
								{
									if(students[i].username==username)
									{
										count =1 ;
									}
								}
								if (1==count)
								{
									toEmpty();
									document.getElementById("error").style.color = "red";
									document.getElementById("error").innerText="UserName already exists";
								}
								else
								{
									var student = {
										"username":username,
										"name":name,
										"password":password
									}; 
									students.push(student);
									localStorage.setItem("students",JSON.stringify(students));
									localStorage.setItem("error","Student Added Successfully");
									window.open("teacherLogin.html","_self");
								}
							}
						}
						else 
						{	
							toEmpty();
							document.getElementById("error4").style.color = "red";
							document.getElementById("error4").innerText = "Passwords dont match ";
						}
					}
					else 
					{
						toEmpty();
						document.getElementById("error3").style.color = "red";
						document.getElementById("error3").innerText =  "Password should be b/w 6 and 14 characters";
					}
				}
				else 
				{
					toEmpty();
					document.getElementById("error").style.color = "red";
					document.getElementById("error").innerText= "Only Characters Allowed in Name" ;
				}
			}
			else
			{
				// document.getElementById("error").style.color = "red";
				// document.getElementById("error").innerText="Fields Cant be Empty";
			}
		});

		$("#cancel").click(function() {
			window.open("teacherLogin.html","_self");
		});
	}); 
	function toEmpty(){
		document.getElementById("error1").innerText = "";
		document.getElementById("error2").innerText = "";
		document.getElementById("error3").innerText = "";
		document.getElementById("error4").innerText = "";
	}
	function ifEmpty(name,username,password,cpassword){
		var count  =0 ;
		if(name.trim()==""){
			count =1 ;
			document.getElementById("error1").style.color = "red";
			document.getElementById("error1").innerText="Field Empty";
		}
		if(username.trim()==""){
			count =1 ;
			document.getElementById("error2").style.color = "red";
			document.getElementById("error2").innerText="Field Empty";	
		}
		if(password.trim()==""){
			count =1 ;
			document.getElementById("error3").style.color = "red";
			document.getElementById("error3").innerText="Field Empty";	
		}
		if(cpassword.trim()==""){
			count =1 
			document.getElementById("error4").style.color = "red";
			document.getElementById("error4").innerText="Field Empty";	
		}
		if(count==1){
			return 	false;
		}
		else
			return true ;
	}
