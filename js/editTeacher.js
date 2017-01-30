$(function() {
	var ids = {
			"teacher_name": document.getElementById("teacher_name"),
			"dept_name":document.getElementById("dept_name"),
			"subjects":document.getElementById("subjects"),
			"username":document.getElementById("username"),
			"role":document.getElementById("role"),
			"phno":document.getElementById("phno"),
			"address":document.getElementById("address"),
			"hsc":document.getElementById("hsc"),
			"bach":document.getElementById("bach"),
			"masters":document.getElementById("masters"),
			"error":document.getElementById("error")
	};
	if (localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")==null || localStorage.getItem("loggedin")=="false")
	{
		window.open("login.html","_self");
	}
	else if(localStorage.getItem("loggedin")==0)
				window.open("onLogin.html","_self");
	else if(localStorage.getItem("loggedin")==2)
				window.open("studentLogin.html","_self");
	else  
	{
		var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
		var username = localStorage.getItem("username");	
		for(var i =0 ;i <teachersArray.length ;i ++)
		{
			if (teachersArray[i].user_name==username)
			{
				ids.teacher_name.value=teachersArray[i].teacher_name;
				ids.dept_name.value=teachersArray[i].dep_name;
				ids.subjects.value = teachersArray[i].sub_name;
				ids.username.value = teachersArray[i].user_name;
				ids.role.innerText = teachersArray[i].role;

				var personalArray = JSON.parse(localStorage.getItem("personalArray"));
				ids.phno.value = personalArray[i].phno;
				ids.address.value = personalArray[i].address;
				ids.hsc.value = personalArray[i].hsc;
				ids.bach.value = personalArray[i].bachelors;
				ids.masters.value = personalArray[i].masters;
				ids.teacher_name.value = personalArray[i].teacher_name;
			}
		}
	}
	$("#save_details").click(function(){
		var personalArray = JSON.parse(localStorage.getItem("personalArray"));
		var teacher_name = ids.teacher_name.value;
		var username = localStorage.getItem("username");	
		var phno = ids.phno.value;
		var address = ids.address.value;
		var hsc = ids.hsc.value;
		var bach = ids.bach.value;
		var masters = ids.masters.value;

		if(!onlyCharactersAllowed(teacher_name))
		{
			ids.error.innerText= "Only Characters allowed in name";
			ids.error.style.color = "red";	
		}
		else if(!checkNumber(phno))
		{
			ids.error.innerText= "Undefined Phone Number";
			ids.error.style.color = "red";
		}
		else if (!checkAddress(address))
		{
			ids.error.innerText= "Minimum 5 characters in Address Required";
			ids.error.style.color = "red";			
		}
		else 
		{
			for(var i =0 ;i<personalArray.length;i++)
			{
				if (personalArray[i].username==username)
				{
					personalArray[i].teacher_name=teacher_name ; 
					personalArray[i].phno=phno;
					personalArray[i].address=address;
					personalArray[i].hsc=hsc;
					personalArray[i].bachelors=bach;
					personalArray[i].masters=masters;
					localStorage.setItem("personalArray",JSON.stringify(personalArray));
					window.open("teacherLogin.html","_self");
					break;  
				}
			}
		}
	});

	$("#cancel").click(function(){
		window.open("teacherLogin.html","_self");
	});

});
