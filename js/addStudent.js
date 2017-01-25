	document.addEventListener("DOMContentLoaded", function(event) {

		console.log("inside edit teacher ");
		if (localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")==null || localStorage.getItem("loggedin")=="false")
		{
			window.open("login.html","_self");
		}
		else 
		{
			if(localStorage.getItem("loggedin")==0)
					window.open("onLogin.html","_self");
			else if(localStorage.getItem("loggedin")==2)
					window.open("studentLogin.html","_self");
		}
	}); 
	function add() 
	{
		var name = document.getElementById("student_name").value;
		var username = document.getElementById("user_name").value;
		var password = document.getElementById("password").value;
		var cpassword= document.getElementById("cpassword").value ;

		var len = name.length ;
		var count =0 ;
			
			if(name!="" && username!="" && password!="" && cpassword!="")
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
								alert("Student Added Successfully");
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
								if (count==1)
								{
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
									alert("Student Added Successfully");
									window.open("teacherLogin.html","_self");
								}
							}
						}
						else 
						{	
							document.getElementById("error").style.color = "red";
							document.getElementById("error").innerText = "passwords dont match ";
						}
					}
					else 
					{
						document.getElementById("error").style.color = "red";
						document.getElementById("error").innerText =  "Password should be b/w 6 and 14 characters";
					}
				}
				else 
				{
					document.getElementById("error").style.color = "red";
					document.getElementById("error").innerText= "Only Characters Allowed in Name" ;
				}
			}
			else
			{
				document.getElementById("error").style.color = "red";
				document.getElementById("error").innerText="Fields Cant be Empty";
			}
	}

function cancel()
{
	window.open("teacherLogin.html","_self");
}
