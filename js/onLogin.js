	var givenDepartments = ["Computer Science","Electronics","Mechanical","Civil","Mechatronics","Information Technology","Chemical","BioMed"] ; 
	document.addEventListener("DOMContentLoaded", function(event) { 	

				if(localStorage.getItem("loggedin")==undefined || localStorage.getItem("loggedin")=="false" )
				{
					window.open("login.html","_self");
				}
				else if(localStorage.getItem("loggedin")==1)
					window.open("teacherLogin.html","_self");
				else if(localStorage.getItem("loggedin")==2)
					window.open("studentLogin.html","_self");
				else
				{
						populate();
						if (localStorage.getItem("arr1")==undefined)
						{
							console.log("inside undefined");
							var arr1 = [] ;
							console.log(arr1.length);
							console.log('arr1',arr1);
							localStorage.setItem("arr1",JSON.stringify(arr1)); 
						}
						else 
						{
							changeToNone();
						}
				}
		});
		function populate()
		{
			var datalist = document.getElementById("dep");

			datalist.innerHTML = "";
			for(var i=0 ; i<givenDepartments.length ; i++ ){
				var option = document.createElement("option");
				option.textContent= givenDepartments[i];
				datalist.appendChild(option);
			}
		}
		function checkFromDepartments(department)
		{
			for(var i =0 ; i<givenDepartments.length ;i++){
				if(department==givenDepartments[i]){
					return true;
				}
			}
			return false; 
		}
		function changeToNone()
		{
			document.getElementById("dep").style.display= "none";
			document.getElementById("tea").style.display= "none";
			document.getElementById("sub").style.display= "none";
			document.getElementById("subd").style.display= "none";
			document.getElementById("subt").style.display= "none";
			document.getElementById("subs").style.display= "none";
			document.getElementById("select").style.display= "none";
			document.getElementById("select_subjects").style.display= "none";
			document.getElementById("select_departments").style.display= "none";
			document.getElementById("showTeacher").style.display= "none";
			document.getElementById("makeHod").style.display="none";
			document.getElementById("onlySubject").style.display= "none";
			document.getElementById("onlyDepartment").style.display= "none";
			document.getElementsByName("dep")[0].style.display="none";
		}
		function onSubjectChange(){
			var subject = document.getElementById("ss").value;
			// alert(department);
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			// var table = document.createElement();
			var arr= [] ;
			for(var i=0 ; i<teachersArray.length;i++) {
				// alert(teachersArray[i].sub_name.length);
				for(var j=0;j<teachersArray[i].sub_name.length;j++) {
					if(teachersArray[i].sub_name[j]==subject) {
						arr.push(teachersArray[i].user_name);
					}	
				}	
			}
			var table = document.getElementById("table2");
			var body =  document.getElementById("body2");
			body.innerHTML= "";
			if (arr.length==0){
				document.getElementById("error2").innerText= "Nothing to show";
				document.getElementById("error").style.display= "block";
				document.getElementById("table2").style.display="none";
			}
			else {
				for(var i=0;i<arr.length;i++){
					// alert(arr[i]);
					var row = body.insertRow(0);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML=subject;
					cell2.innerHTML=arr[i];
				}	
			}	
		}
		function onDepartmentChange(){
			// alert("ss");
			var department = document.getElementById("dd").value;
			// alert(department);
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			// var table = document.createElement();
			var arr= [] ;
			if(!(teachersArray=="undefined" || teachersArray==null || teachersArray=="null")){

				for(var i=0 ; i<teachersArray.length;i++)
				{
					if(teachersArray[i].dep_name==department)
					{
						arr.push(teachersArray[i].user_name);
					}
				}	
			}
			
			var table = document.getElementById("table");
			var body =  document.getElementById("body");
			body.innerHTML= "";
			if (arr.length==0)
			{

				document.getElementById("error").innerText= "Nothing to show";
				document.getElementById("error").style.display= "block";
				document.getElementById("table").style.display="none";
			}
			else 
			{
				document.getElementById("table").style.display="block";
				document.getElementById("error").style.display="none";
				for(var i=0;i<arr.length;i++)
				{
					var row = body.insertRow(0);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML=department;
					cell2.innerHTML=arr[i];	
				}	
			}
		}
		function byDepartment()
		{	
			document.getElementById("onlyDepartment").style.display= "block";
			document.getElementById("onlySubject").style.display= "none";
			var select= document.getElementById("dd");
			
			var arr = JSON.parse(localStorage.getItem("arr1"));
			select.innerHTML="";
			
			for(var i =0 ; i<arr.length;i++)
			{
				var option = document.createElement("option");
				option.textContent = arr[i];
				select.appendChild(option);
			}

			var department =arr[0];
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			
			var arr = [] ;
			// alert(teachersArray);
			if(!(teachersArray=="undefined" || teachersArray==null || teachersArray=="null"))
			{
				for(var i=0 ; i<teachersArray.length;i++)
				{
					if(teachersArray[i].dep_name==department)
					{
						arr.push(teachersArray[i].user_name);
					}
				}
				var table = document.getElementById("table");
				var body =  document.getElementById("body");
				body.innerHTML= "";
			}
			
			
			if (arr.length==0)
			{
				document.getElementById("error").innerText= "Nothing to show";
				document.getElementById("error").style.display= "block";
				document.getElementById("table").style.display="none"; 
			}
			else
			{
				for(var i=0;i<arr.length;i++)
				{
					var row = body.insertRow(0);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML=department;
					cell2.innerHTML=arr[i];	
				}
				document.getElementById("table").style.display="block";
				document.getElementById("error").style.display="none";
			}
			
		}
		function findTeacherBySubject(subject)
		{	
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			var arr = [] ;
			if(!(teachersArray=="undefined" || teachersArray==null || teachersArray=="null")){

				for(var i=0 ; i<teachersArray.length;i++)
				{
					for(var j=0;j<teachersArray[i].sub_name.length;j++)
					{
						if(teachersArray[i].sub_name[j]==subject)
						{

							arr.push(teachersArray[i].user_name);
						}	
					}
				}	
			}
			
			return arr ; 
		}
		function bySubject()
		{
			document.getElementById("onlySubject").style.display= "block";
			document.getElementById("onlyDepartment").style.display= "none";
			var select = document.getElementById("ss");
			var arr = JSON.parse(localStorage.getItem("subarray"));
			select.innerHTML="";
			for(var i =0 ; i<arr.length;i++)
			{
				var option = document.createElement("option");
				option.textContent = arr[i].subName;
				select.appendChild(option);
			}
			var subject =arr[0].subName;
			// alert(department);
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			// var table = document.createElement();
			var arr = findTeacherBySubject(subject);
			var table = document.getElementById("table2");
			var body =  document.getElementById("body2");
			body.innerHTML= "";

			if (arr.length==0)
			{
				document.getElementById("error2").innerText= "Nothing to show";
				document.getElementById("error2").style.display= "block";
				document.getElementById("table2").style.display="none";
			}
			else 
			{
				for(var i=0;i<arr.length;i++)
				{
					var row = body.insertRow(0);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML=subject;
					cell2.innerHTML=arr[i];
				}	
			}
		}
		function gotoHome() 
		{
			changeToNone();
			document.getElementById("mainContent").style.display="block";
		}
		function showTeachers()
		{
			document.getElementById("mainContent").style.display="none";
			document.getElementById("showTeacher").style.display="block";
			document.getElementById("makeHod").style.display= "none";			
		}
		function changeHodDepartment()
		{
			var dep_value = document.getElementById("hoddep").value;
			var select_teacher = document.getElementById("hodteacher");
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			var subjectArray = [] ;
			for(var i=0;i<teachersArray.length ;i++)
			{
				if(teachersArray[i].dep_name == dep_value)
				{
					subjectArray.push(teachersArray[i].teacher_name);
				}
			}
			select_teacher.innerHTML= "" ;	
			for(var i=0 ;i<subjectArray.length ; i++)
			{
				var option = document.createElement("option");
				option.textContent= subjectArray[i];
				select_teacher.appendChild(option);
			}
		}
		function makeHodFinal() 
		{
			var department = document.getElementById("hoddep").value;
			var teacher  = document.getElementById("hodteacher").value ;
			if(teacher=="")
			{
				alert("No teacher available in this department");
			}
			else
			{
				console.log(department);
				console.log(teacher);
				var teachersArray = JSON.parse(localStorage.getItem("teachersArray")); 
				for(var i =0 ; i<teachersArray.length ; i++)
				{
					if(teachersArray[i].dep_name==department)
					{
						teachersArray[i].role="teacher";		
					}
					if (teachersArray[i].user_name==teacher)
					{
						teachersArray[i].role = "HOD";
					}
				}
				localStorage.setItem("teachersArray",JSON.stringify(teachersArray)) ;
				alert("Hod Role Added");
				window.open("onLogin.html","_self");
			}
		}
		function makeHod()
		{
			document.getElementById("mainContent").style.display="none";
			document.getElementById("makeHod").style.display="block";
			document.getElementById("showTeacher").style.display="none";
			document.getElementById("onlySubject").style.display= "none";
			document.getElementById("onlyDepartment").style.display= "none";

			var departments = JSON.parse(localStorage.getItem("arr1"));
			var select = document.getElementById("hoddep");
			select.innerHTML=""	;
			for(var i=0;i<departments.length ; i++)
			{
				var option = document.createElement("option");
				option.textContent= departments[i];
				select.appendChild(option);
			}

			var teachers = [] ;
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
			for(var i =0 ;i<teachersArray.length ; i++)
			{
				if(teachersArray[i].dep_name==departments[0])
				{
					// alert(teachersArray[i].user_name);
					teachers.push(teachersArray[i].user_name) ;
				}
			}
			var select_teacher = document.getElementById("hodteacher");
			select_teacher.innerHTML="";
			for(var i=0 ;i<teachers.length;i++)
			{
				var option = document.createElement("option");
				option.textContent = teachers[i];
				select_teacher.appendChild(option);
			}
		}
		function change_subjects(obj) 
		{
			// alert(obj.value);
			var department = obj.value ; 
			var select_subjects= document.getElementById("select_subjects");
			for(var i =select_subjects.length -1; i>=0;i--)
			{
				select_subjects.remove(i);
			}
			var subarray = JSON.parse(localStorage.getItem("subarray"));
			for(var i =0 ; i<subarray.length;i++)
			{
				if (subarray[i].department==department)
				{
					var option = document.createElement("option");
					option.textContent=subarray[i].subName ; 
					select_subjects.appendChild(option);
				}
			}
		}
		function dep() 
		{
			changeToNone();
			// document.getElementById("dep").style.display= "block" ;
			document.getElementById("subd").style.display= "block" ;
			document.getElementsByName("dep")[0].style.display="block";
		}
		function tea()
		{
			changeToNone();
			document.getElementById("tea").style.display= "block" ;
			document.getElementById("subt").style.display= "block";
			document.getElementById("select_subjects").style.display= "block";
			document.getElementById("select_departments").style.display= "block";

			var select_departments= document.getElementById("select_departments");
			select_departments.innerHTML="";	
			var select_subjects= document.getElementById("select_subjects");
			var arr = JSON.parse(localStorage.getItem("arr1"));
			for(var i =0 ; i<arr.length;i++)
			{
				var option = document.createElement("option");
				option.textContent = arr[i];
				select_departments.appendChild(option);
			}
			if(localStorage.getItem("subarray")=="undefined" || localStorage.getItem("subarray")==null){

			}
			else
			{
				var subarray = JSON.parse(localStorage.getItem("subarray"));
				select_subjects.innerHTML= "";
				for(var i =0 ; i<subarray.length;i++)
				{
					if (subarray[i].department==arr[0])
					{
						var option = document.createElement("option");
						option.textContent=subarray[i].subName ; 
						select_subjects.appendChild(option);
					}
				}
			}
			
		}
		function sub()
		{
			changeToNone();
			document.getElementById("sub").style.display= "block" ;
			document.getElementById("subs").style.display= "block";
			document.getElementById("select").style.display= "block";
			var select = document.getElementById("select");
			var subject = document.getElementById("sub");
			var arr = JSON.parse(localStorage.getItem("arr1"));
			select.innerHTML= "";
			for(var i =0 ; i<arr.length;i++){
				var option = document.createElement("option");
				option.textContent = arr[i];
				select.appendChild(option);
			}
		}
		function subd() 
		{

			var department =document.getElementsByName("dep")[0].value;


			if(department.trim()==""){
				alert("Field Empty");
			}
			else if(!checkFromDepartments(department)){
				alert("Choose from Existing Departments");
			}
			else if(department.length<5 || department.length>20){
				alert("Length between 5 and 14");
			}
			else if (!onlyCharactersAllowed(department)){
				alert("Only Characters allowed in department Name");	
			}
			else 
			{

				if (typeof(Storage) !== "undefined") 
				{
				    var yash =JSON.parse(localStorage.getItem("arr1"));
				    var count =0 ; 
				    for(var i=0 ; i<yash.length;i++){
				    	if (yash[i]==department){
				    		count = 1 ; 
				    	}
				    }
				    if(count ==1){
				    	alert("department already exists");
				    	return false ;
				    }
				    yash.push(department);
				    localStorage.setItem("arr1",JSON.stringify(yash));
				    alert("department added");
				    window.open("onLogin.html","_self");
				} 
				else 
				{
				    document.getElementById("content").innerHTML = "Sorry, your browser does not support Web Storage...";
				}
			}
		}
		function subt(){
			if (localStorage.getItem("teachersArray") ==undefined){
				var teacher_name = document.getElementById("tea").value;
				if(""==teacher_name.trim()){
					alert("Please Enter Username ");
				}
				else
				{	
					var department=  document.getElementById("select_departments").value;
					var subject = document.getElementById("select_subjects").value;
					if(department=="" || subject==""){
						alert("No value Selected");
					}
					else
					{
						var teachersArray = [] ;
						var count =0 ;
						var teacher = {
										"id":0,
										"sub_name" : [subject] , 
										"dep_name" : department,
										"teacher_name":"",
										"user_name": teacher_name,
										"password":teacher_name+"0",
										"role":"teacher"
									   }; 	
						teachersArray.push(teacher);
						localStorage.setItem("teachersArray",JSON.stringify(teachersArray));

						var personalArray = []; 
						var personal = {

								"username":teacher_name,
								"phno":"",
								"address":"",
								"hsc":"",
								"bachelors" :"",
								"masters":""
						};
						personalArray.push(personal);
						localStorage.setItem("personalArray",JSON.stringify(personalArray));
						alert("Teacher added");
						window.open("onLogin.html","_self");
					}
				}
			}
			else 
			{
				var teacher_name = document.getElementById("tea").value;
				if(""==teacher_name.trim()){
					alert("Enter UserName");
				}
				else
				{
					var department=  document.getElementById("select_departments").value;
					var subject = document.getElementById("select_subjects").value;
					var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
					var len = teachersArray.length ;
					var id = teachersArray[len-1].id ;
					var count = parseInt(id + 1) ;
					// teachersArray[count]= count ; 
					var flag = 0 ; 
					var index = -1 ;
					for(var i=0 ; i<teachersArray.length;i++){

						if(teachersArray[i].user_name==teacher_name){
							flag =1 ;
							index = i ;
						}
					}
					if(flag==1)
					{
						teachersArray[index].sub_name.push(subject);
						localStorage.setItem("teachersArray",JSON.stringify(teachersArray));
						alert("Subject Added");
						window.open("onLogin.html","_self");
					}
					else
					{
						var teacher =  {
									"id":count,
									"sub_name":[subject],
									"dep_name":department,
									"teacher_name":"",
									"user_name":teacher_name,
									"password":teacher_name+count
								};
						teachersArray.push(teacher);
						localStorage.setItem("teachersArray",JSON.stringify(teachersArray));
						alert("Teacher Added");
						window.open("onLogin.html","_self");
					}
					
				}
			}
		}
		function subjectAlreadyExists(str)
		{
			var subjects = JSON.parse(localStorage.getItem("subarray"));
			for(var i=0;i<subjects.length;i++){
				if(subjects[i]==str){
					return true;
				}
			}
			return false;
		}
		function subs()
		{
			var subjectValue  = document.getElementById("sub").value ;
			if(""==subjectValue.trim()){
				alert("Field Empty!");
			}
			else {
				if (localStorage.getItem("subarray")==undefined){
					var subjectValue  = document.getElementById("sub").value ;
					var e = document.getElementById("select");
					var department = e.options[e.selectedIndex].value;
					var subarray =[];
					var subjects = {};
					// subarray.subjects = subjects ;
					var subject = {
						  "subName": subjectValue,
						  "department": department
						}
					subarray.push(subject);
					localStorage.setItem("subarray",JSON.stringify(subarray));
					alert("Subject added ");
					window.open("onLogin.html","_self");
				}
				else if(!subjectAlreadyExists(subjectValue))
				{
					var subarray= JSON.parse(localStorage.getItem("subarray"));
					var subjectValue  = document.getElementById("sub").value ;
					var e = document.getElementById("select");
					var department = e.options[e.selectedIndex].value;
					for(var i = 0 ; i<subarray.length;i++)
					{
						if(subarray[i].subName==subjectValue && subarray[i].department==department)
						{
						alert("Subject in This department already exists");
						return false; 
						}
					}
					var subject = {
						  "subName": subjectValue,
						  "department": department
						}
					subarray.push(subject);
					localStorage.setItem("subarray",JSON.stringify(subarray));
					alert("Subject added ");
					window.open("onLogin.html","_self");
				}
				else 
				{
					alert("This subject is already existing");
				}
			}
		}