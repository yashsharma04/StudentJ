$(function(){ 
	var ids = {
		"teacher_name":document.getElementById("teacher_name"),
		"dept_name":document.getElementById("dept_name"),
		"subjects":document.getElementById("subjects"),
		"username":document.getElementById("username"),
		"role":document.getElementById("role"),
		"phno":document.getElementById("phno"),
		"addr":document.getElementById("addr"),
		"hsc":document.getElementById("hsc"),
		"bach":document.getElementById("bach"),
		"masters":document.getElementById("masters")
	}; 
	if(localStorage.getItem("loggedin")=="admin" || localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")=="false" || localStorage.getItem("loggedin")== null)
	{
		window.open("login.html","_self");
	}
	else if(localStorage.getItem("loggedin")==0)
					window.open("onLogin.html","_self");
	else if(localStorage.getItem("loggedin")==2)
					window.open("studentLogin.html","_self");
	else
	{
		document.getElementById("name").innerText= localStorage.getItem("username");	
		var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));

		for(var i=0 ;i<teachersArray.length ;i++)
		{
			if (teachersArray[i].user_name==localStorage.getItem("username"))
			{
				if(teachersArray[i].role=="teacher")
				{
					document.getElementById("add_student").style.display = "none";
				}
				ids.teacher_name.innerText = teachersArray[i].teacher_name;
				ids.dept_name.innerText = teachersArray[i].dep_name;
				ids.subjects.innerText = teachersArray[i].sub_name;	
				ids.username.innerText = teachersArray[i].user_name;
				ids.role.innerText = teachersArray[i].role;
				// Personal details 
				var personalArray = JSON.parse(localStorage.getItem("personalArray"));
				ids.teacher_name.innerText= personalArray[i].teacher_name;				
				ids.phno.innerText= personalArray[i].phno;				
				ids.addr.innerText= personalArray[i].address;
				ids.hsc.innerText= personalArray[i].hsc;
				ids.bach.innerText= personalArray[i].bachelors;
				ids.masters	.innerText= personalArray[i].masters;
			}
		}	
	}
	$("#add_student").click(function (){
		window.open("addStudent.html","_self");
	});
	$("#edit_details").click(function(){
		window.open("editTeacher.html","_self");
	});
});