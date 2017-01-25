document.addEventListener("DOMContentLoaded", function(event) { 

	console.log("inside teacher login");
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
				document.getElementById("teacher_name").innerText= teachersArray[i].teacher_name;
				document.getElementById("dept_name").innerText= teachersArray[i].dep_name;
				document.getElementById("subjects").innerText= teachersArray[i].sub_name;	
				document.getElementById("username").innerText= teachersArray[i].user_name;
				document.getElementById("role").innerText= teachersArray[i].role;
				// personal details 
				var personalArray = JSON.parse(localStorage.getItem("personalArray"));
				document.getElementById("teacher_name").innerText= personalArray[i].teacher_name;				
				document.getElementById("phno").innerText= personalArray[i].phno;				
				document.getElementById("addr").innerText= personalArray[i].address;
				document.getElementById("hsc").innerText= personalArray[i].hsc;
				document.getElementById("bach").innerText= personalArray[i].bachelors;
				document.getElementById("masters").innerText= personalArray[i].masters;
			}
		}	
	}
});

function addStudent() {
	window.open("addStudent.html","_self");
}

function editDetails() {
	window.open("editTeacher.html","_self");
}

function changePassword(){
	//not added yet
}

