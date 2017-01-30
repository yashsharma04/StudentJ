	var ids = {} ;
	$(document).ready(function(event){ 	
		ids = {
			"onlyDepartment":document.getElementById("onlyDepartment"),
			"onlySubject":document.getElementById("onlySubject"),
			"dd":document.getElementById("dd"),
			"table":document.getElementById("table"),
			"body":document.getElementById("body"),
			"error":document.getElementById("error"),
			"table2":document.getElementById("table2"),
			"body2":document.getElementById("body2"),
			"erro2":document.getElementById("error2"),
			"ss":document.getElementById("ss"),
			"hoddep":document.getElementById("hoddep"),
			"hodteacher":document.getElementById("hodteacher"),
			"subd":document.getElementById("subd"),
			"tea":document.getElementById("tea"),
			"subt":document.getElementById("subt"),
			"select_subjects":document.getElementById("select_subjects"),
			"select_departments":document.getElementById("select_departments"),
			"sub":document.getElementById("sub"),
			"subs":document.getElementById("subs"),
			"subd":document.getElementById("subd"),
			"select":document.getElementById("select"),
			"content":document.getElementById("content"),
			"mainContent":document.getElementById("mainContent"),
			"showTeacher":document.getElementById("showTeacher"),
			"makeHod":document.getElementById("makeHod"),
			"dep":document.getElementById("dep")
		};
			console.log(ids.tea);
			if(localStorage.getItem("loggedin")==undefined || localStorage.getItem("loggedin")=="false" ){
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

    		$("#by_department").click(function(){

				ids.onlyDepartment.style.display= "block";
				ids.onlySubject.style.display= "none";
				var select= ids.dd;
				
				var arr = JSON.parse(localStorage.getItem("arr1"));
				select.innerHTML="";
				$.each(arr,function(i,item){
					$('#dd').append($('<option>',{
						text:item 
					}));
				});
				var department =arr[0];
				var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
				
				var arr = [] ;
				if(!(teachersArray=="undefined" || teachersArray==null || teachersArray=="null"))
				{
					for(var i=0 ; i<teachersArray.length;i++)
					{
						if(teachersArray[i].dep_name==department)
						{
							arr.push(teachersArray[i].user_name);
						}
					}
					var table = ids.table;
					var body =  ids.body;
					body.innerHTML= "";
				}
				if (arr.length==0)
				{
					ids.error.innerText= "Nothing to show";
					ids.error.style.display= "block";
					ids.table.style.display="none"; 
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
					ids.table.style.display="block";
					ids.error.style.display="none";
				}
				
				});	
			$("#by_subject").click(function(){
				ids.onlySubject.style.display= "block";
				ids.onlyDepartment.style.display= "none";
				var select = ids.ss;
				var arr = JSON.parse(localStorage.getItem("subarray"));
				select.innerHTML="";	
				for(var i =0 ; i<arr.length;i++)
				{
					var option = document.createElement("option");
					option.textContent = arr[i].subName;
					select.appendChild(option);
				}
				var subject =arr[0].subName;
				var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
				var arr = findTeacherBySubject(subject);
				var table =ids.table2;
				var body = ids.body2;
				body.innerHTML= "";

				if (arr.length==0)
				{
					ids.error2.innerText= "Nothing to show";
					ids.error2.style.display= "block";
					ids.table2.style.display="none";
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
			});	
			$("#make_hod_final").click(function(){

			var department = ids.hoddep.value;
			var teacher  = ids.hodteacher.value ;
			if(teacher=="")
			{
				alert("No teacher available in this department");
			}
			else
			{
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
			});	
			$("#btn1").click(function(){
				changeToNone();
				ids.subd.style.display= "block" ;
				document.getElementsByName("dep")[0].style.display="block";
			});
			$("#btn2").click(function(){
				changeToNone();
				ids.tea.style.display= "block" ;
				ids.subt.style.display= "block";
				ids.select_subjects.style.display= "block";
				ids.select_departments.style.display= "block";

				var select_departments= ids.select_departments;
				select_departments.innerHTML="";	
				var select_subjects= ids.select_subjects;
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
				
			});
			$("#btn3").click(function(){
				changeToNone();
				ids.sub.style.display= "block" ;
				ids.subs.style.display= "block";
				ids.select.style.display= "block";
				var select = ids.select;
				var subject = ids.sub;
				var arr = JSON.parse(localStorage.getItem("arr1"));
				select.innerHTML= "";
				for(var i =0 ; i<arr.length;i++){
					var option = document.createElement("option");
					option.textContent = arr[i];
					select.appendChild(option);
				}
			});
			$("#subd").click(function(){

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
					    ids.content.innerHTML = "Sorry, your browser does not support Web Storage...";
					}
				}
			});
			$("#subt").click(function(){
				if (localStorage.getItem("teachersArray") ==undefined){
					var teacher_name =ids.tea.value;
					if(""==teacher_name.trim()){
						alert("Please Enter Username ");
					}
					else
					{	
						var department= ids.select_departments.value;
						var subject = ids.select_subjects.value;
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
					var teacher_name = ids.tea.value;
					if(""==teacher_name.trim()){
						alert("Enter UserName");
					}
					else
					{
						var department=  ids.select_departments.value;
						var subject = ids.select_subjects.value;
						var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
						var len = teachersArray.length ;
						var id = teachersArray[len-1].id ;
						var count = parseInt(id+1) ;
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
			});
				$("#subs").click(function(){
				var subjectValue  = ids.sub.value ;
				if(""==subjectValue.trim()){
					alert("Field Empty!");
				}
				else {
					if (localStorage.getItem("subarray")==undefined){
						var subjectValue  = ids.sub.value ;
						var e = ids.select;
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
						var subjectValue  = ids.sub.value ;
						var e = ids.select;
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
			});
			$("#go_to_home").click(function(){
				changeToNone();
				ids.mainContent.style.display="block";
			});
			$("#show_teachers").click(function(){
				ids.mainContent.style.display="none";
				ids.showTeacher.style.display="block";
				ids.makeHod.style.display= "none";			
			});
			$("#make_hod").click(function(){

				ids.mainContent.style.display="none";
				ids.makeHod.style.display="block";
				ids.showTeacher.style.display="none";
				ids.onlySubject.style.display= "none";
				ids.onlyDepartment.style.display= "none";

				var departments = JSON.parse(localStorage.getItem("arr1"));
				var select = ids.hoddep;
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
				var select_teacher = ids.hodteacher;
				select_teacher.innerHTML="";
				for(var i=0 ;i<teachers.length;i++)
				{
					var option = document.createElement("option");
					option.textContent = teachers[i];
					select_teacher.appendChild(option);
				}
			});
		});
		var givenDepartments = ["Computer Science","Electronics","Mechanical","Civil","Mechatronics","Information Technology","Chemical","BioMed"] ; 
		function populate(){
			var datalist =ids.dep;

			datalist.innerHTML = "";
			for(var i=0 ; i<givenDepartments.length ; i++ ){
				var option = document.createElement("option");
				option.textContent= givenDepartments[i];
				datalist.appendChild(option);
			}
		}
		function checkFromDepartments(department){
			for(var i =0 ; i<givenDepartments.length ;i++){
				if(department==givenDepartments[i]){
					return true;
				}
			}
			return false; 
		}
		function changeToNone(){
			document.getElementById("dep").style.display= "none";
			ids.tea.style.display= "none";
			ids.sub.style.display= "none";
			ids.subd.style.display= "none";
			ids.subt.style.display= "none";
			ids.subs.style.display= "none";
			ids.select.style.display= "none";
			ids.select_subjects.style.display= "none";
			ids.select_departments.style.display= "none";
			ids.showTeacher.style.display= "none";
			ids.makeHod.style.display="none";
			ids.onlySubject.style.display= "none";
			ids.onlyDepartment.style.display= "none";
			document.getElementsByName("dep")[0].style.display="none";
		}
		function onSubjectChange(){
			var subject = ids.ss.value;
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
			var table = ids.table2;
			var body =  ids.body2;
			body.innerHTML= "";
			if (arr.length==0){
				ids.error2.innerText= "Nothing to show";
				ids.error.style.display= "block";
				ids.table2.style.display="none";
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
			var department = ids.dd.value;
			var teachersArray = JSON.parse(localStorage.getItem("teachersArray"));
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
			
			var table = ids.table;
			var body =  ids.body;
			body.innerHTML= "";
			if (arr.length==0)
			{

				ids.error.innerText= "Nothing to show";
				ids.error.style.display= "block";
				ids.table.style.display="none";
			}
			else 
			{
				ids.table.style.display="block";
				ids.error.style.display="none";
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

		function findTeacherBySubject(subject){	
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
		function changeHodDepartment(){
			var dep_value = ids.hoddep.value;
			var select_teacher = ids.hodteacher;
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
		function change_subjects(obj){
			// alert(obj.value);
			var department = obj.value ; 
			var select_subjects= ids.select_subjects;
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
		function subjectAlreadyExists(str){
			var subjects = JSON.parse(localStorage.getItem("subarray"));
			for(var i=0;i<subjects.length;i++){
				if(subjects[i]==str){
					return true;
				}
			}
			return false;
		}
