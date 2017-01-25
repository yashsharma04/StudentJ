document.addEventListener("DOMContentLoaded", function(event) { 

	console.log("inside teacher login");
	if(localStorage.getItem("loggedin")=="admin" || localStorage.getItem("loggedin")=="undefined" || localStorage.getItem("loggedin")=="false" || localStorage.getItem("loggedin")== null)
	{
		window.open("login.html","_self");
	}
	else if(localStorage.getItem("loggedin")==0)
					window.open("onLogin.html","_self");
	else if(localStorage.getItem("loggedin")==1)
					window.open("teacherLogin.html","_self");
	else 
	{
		document.getElementById("name").innerText= localStorage.getItem("username");	
		var students = JSON.parse(localStorage.getItem("students"));

		for(var i=0 ;i<students.length ;i++)
		{
			if (students[i].username==localStorage.getItem("username"))
			{
				document.getElementById("student_name").innerText= students[i].name;
				document.getElementById("dept_name").innerText= students[i].dep_name;
				document.getElementById("username").innerText= students[i].username;
				// Personal Details 
				var personalArray = JSON.parse(localStorage.getItem("personalArray"));
				document.getElementById("phno").innerText= students[i].phno;				
				document.getElementById("addr").innerText= students[i].address;
				document.getElementById("hsc").innerText= students[i].hsc;
			}
		}	
	}
});

function editDetails() {
	window.open("editStudent.html","_self");
}


