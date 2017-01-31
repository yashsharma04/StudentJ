	$(function(){
		if (localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")==null || localStorage.getItem("loggedin")=="false")
		{
			window.open("login.html","_self");
		}
		else
		{
			var students = JSON.parse(localStorage.getItem("students"));
			var username = localStorage.getItem("username");	
			for(var i =0 ;i <students.length ;i ++)
			{
				if (students[i].username==username)
				{
					document.getElementById("student_name").value = students[i].name;
					document.getElementById("username").value = students[i].username;
					document.getElementById("phno").value = students[i].phno;
					document.getElementById("address").value = students[i].address;
					document.getElementById("hsc").value = students[i].hsc;					
				}
			}
		}
		$("#save_details").click(function(){
			var students = JSON.parse(localStorage.getItem("students"));
			var username = localStorage.getItem("username");	
			var phno = document.getElementById("phno").value;
			var address = document.getElementById("address").value;
			var hsc = document.getElementById("hsc").value;
			
			if (ifEmpty(phno,address,hsc))
			{
				document.getElementById("error").innerText= "Fields Can't be Empty";
				document.getElementById("error").style.color = "red";	
			}
			else if(!checkNumber(phno))
			{
				document.getElementById("error").innerText= "Undefined Phone Number";
				document.getElementById("error").style.color = "red";
			}
			else if (!checkAddress(address))
			{
				document.getElementById("error").innerText= "Minimum 5 characters in Address Required";
				document.getElementById("error").style.color = "red";			
			}
			else 
			{
				for(var i =0 ;i<students.length ; i++)
				{
					if (students[i].username==username)
					{
						students[i].phno=phno;
						students[i].address=address;
						students[i].hsc=hsc;
						localStorage.setItem("students",JSON.stringify(students));
						
						window.open("studentLogin.html","_self");
						break;  
					}
				}
			}		
		});

		$("#cancel").click(function(){
			window.open("studentLogin.html","_self");
		});
	}); 
	function ifEmpty(phno,address,hsc){
		if(phno=="" || address=="" || hsc==""){
			return true ;
		}
		else
			return false ;
	}