const fullname =document.getElementById("fullname");
const username =document.getElementById("username");
const email =document.getElementById("email");
const password =document.getElementById("password");
const loginEmailOrUsername =document.getElementById("register_email_username");
const loginPassword =document.getElementById("register_password");
const toDoListDiv =document.getElementsByClassName("main1")[0];
const task =document.getElementById("task");

let dataArray =JSON.parse(localStorage.getItem("users") )|| [];
let taskArray=[]

function showAlert(icon, message) {
    document.getElementById("alertIcon").textContent = icon;
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("alertOverlay").style.display = "block";
}

function closeAlert() {
    const overlay = document.getElementById("alertOverlay");
    overlay.style.display = "none";
}
function checkValidations(event){
    event.preventDefault();
    
    if(!fullname.value.trim() || !username.value.trim() || !email.value.trim() || !password.value.trim()){
        showAlert("Error", "Please fill all fields")
    }
    else{
        let isCorrectName = false;
        if(fullname.value.length >3){
            isCorrectName =true;            
        }
        else{
            isCorrectName=false;
            alert("name length must be greater than 2")
        }
        
        let isSpecialCharacter =false;
        let isNumber =false;
        for(let i =0;i<username.value.length;i++){
            if(username.value[i]>=0 && username.value[i]<=9){
                isNumber =true;
            }
            if(username.value[i]==="@" || username.value[i] ==="%" || username.value[i]==="$" || username[i]==="#"){
                isSpecialCharacter =true;
            }
        }
        
        let isUsername =false;
        if(username.value.length >=5){
            if(isSpecialCharacter || isNumber){
                isUsername =true;            }
            else{
                alert("Username not have any number or special character");
                isUsername =false;
            }
        }
        else{
            alert("Username length must greater than 4");
            isUsername =false;
        }
        
        let aderate =email.value.indexOf("@");
        let dot =email.value.lastIndexOf(".");
        let isCorrectEmail =false;
        if(email.value.length >=6){
            if(aderate > 0 && dot>aderate+1 &&dot <email.value.length-1){
                isCorrectEmail =true;
            }
            else{
                alert("Please enter the correct email");
                isCorrectEmail =false;
            }
        }
        else{
            alert("Your email length is less than 6");
            isCorrectEmail =false;
        }
        
        let isCorrectPassword =false;
        let isNumberInPassword =false;
        let isSpecialCharacterInPassword =false;
        let isUpperLetterInPassword =false;
        let isLowerLetterInPassword =false;
        
        for(let i =0;i<=password.value.length ;i++){
            if(password.value[i]>="A" && password.value[i]<="Z"){
                isUpperLetterInPassword =true;
            }
            if(password.value[i]>="a" && password.value[i]<="z"){
                isLowerLetterInPassword =true;
            }
            if(password.value[i]>=0 && password.value[i]<=9){
                isNumberInPassword =true;
            }
            if(password.value[i]==="@" || password.value[i]==="%" ||password.value[i]==="$"){
                isSpecialCharacterInPassword =true;
            }
        }
        if(password.value.length >=8){
            if(isLowerLetterInPassword && isNumberInPassword && isSpecialCharacterInPassword && isUpperLetterInPassword){
                isCorrectPassword =true;                
            }
            else{
                alert("Password must contain special character and number and one upperletter and five more lower letters");
                isCorrectPassword =false;
            }
        }
        else{
            alert("your password length is less than 8")
        }
        
        if(isCorrectEmail && isCorrectName && isUsername && isCorrectPassword){
            let usersArray =JSON.parse(localStorage.getItem("users"));
            let emailMatch =0;
            usersArray?usersArray.length>0?usersArray.forEach((element)=>{
                email.value.trim()!=element.email?emailMatch:emailMatch+=1;
            }):[]:[];  
            
            if(emailMatch === 0){
                const person1 ={
                    name:fullname.value.trim(),
                    username:username.value.trim(),
                    email:email.value.trim(),
                    password:password.value.trim(),
                    task: taskArray
                }
                dataArray.push(person1);
                
                const a =localStorage.setItem("users" ,JSON.stringify(dataArray));
                alert("Successfully Signup");
                window.location.href ="index.html";
            }
            else{
                showAlert("Error", "This email is already register Go to Login Page")                
            }
        }
    }
}

function matchData(event){
    event.preventDefault();
    
    if(!loginEmailOrUsername.value.trim() || !loginPassword.value.trim()){
        showAlert("Error", "Please fill all fields")
    }
    else{
        let localStorageData =JSON.parse(localStorage.getItem("users"));
        let loginFound =false;
        localStorageData?localStorageData.forEach((element,index)=>{
            if((loginEmailOrUsername.value.trim() === element.email || loginEmailOrUsername.value.trim() === element.username) && loginPassword.value.trim() === element.password){
                localStorage.setItem("loggingUserId",index);
                alert("Login Successfully");
                window.location.href ="home.html";
                loginFound =true;
            }
        }):showAlert("Error", "Incorrect email or password")
        if(!loginFound){
            showAlert("Error", "Incorrect email or password")
        }
    }
}
if(window.location.pathname.endsWith("/home.html")){
    window.onload=function(){
        let personIndex =localStorage.getItem("loggingUserId");
        let personTask=dataArray[personIndex].task ;
        personTask.length>0?personTask.forEach((element)=>{
            let paragraph = document.createElement("p");
            let newDiv =document.createElement("div");
            newDiv.classList.add('para')

            let label =document.createElement("label");
            let labelText =document.createTextNode(element);
            label.appendChild(labelText);
            
            let checkbox =document.createElement("input");
            checkbox.type ="checkbox";
            checkbox.classList.add("checkbox")
            checkbox.onchange =function(){
                checkbox.checked? label.style.textDecoration ="line-through" : label.style.textDecoration ="none";
            }
        
            let editBtn =document.createElement("button");
            let editImg =document.createElement("img");
            editImg.src="assets/images/edit.png";
            editBtn.appendChild(editImg);
            editBtn.classList.add('edit')
            editBtn.onclick =function(){
                let updateTask =prompt("Edit Task" ,label.textContent);
                personTask.forEach((element,index)=>{
                    if(element===label.textContent){
                        personTask[index]=updateTask;
                        localStorage.setItem("users",JSON.stringify(dataArray));
                    }
                })
                label.textContent= updateTask;
            }
            let deleteBtn =this.document.createElement("button");
            let deleteImg =document.createElement("img");
            deleteImg.src="assets/images/delete.png";
            deleteBtn.appendChild(deleteImg);
            deleteBtn.classList.add('del')
            deleteBtn.onclick =function(){
                newDiv.remove()
                personTask.forEach((element,index)=>{
                    if(element===label.textContent){
                        personTask.splice(index,1)
                        localStorage.setItem("users",JSON.stringify(dataArray));
                    }
                })        
            }
            paragraph.append(checkbox,label);
            newDiv.append(paragraph,editBtn,deleteBtn);
            toDoListDiv.appendChild(newDiv);
        }):[]
    }
};
function addTask(){
    let paragraph = document.createElement("p");
    let newDiv =document.createElement("div");
    newDiv.classList.add('para')
    
    let personIndex =localStorage.getItem("loggingUserId");
    let personTask=dataArray[personIndex].task ;
    
    let label =document.createElement("label");
    let labelText =document.createTextNode(task.value.trim());
    label.appendChild(labelText);
    
    let checkbox =document.createElement("input");
    checkbox.type ="checkbox";
    checkbox.classList.add("checkbox")
    checkbox.onchange =function(){
        checkbox.checked? label.style.textDecoration ="line-through" : label.style.textDecoration ="none";
    }
    
    let editBtn =document.createElement("button");
    let editImg =document.createElement("img");
    editImg.src="assets/images/edit.png";
    editBtn.appendChild(editImg);
    editBtn.classList.add('edit')
    editBtn.onclick =function(){
        let updateTask =prompt("Edit Task" ,label.textContent);
        personTask.forEach((element,index)=>{
            if(updateTask){
                if(element===label.textContent){
                    personTask[index]=updateTask;
                    localStorage.setItem("users",JSON.stringify(dataArray));
                }
            }
        })
        if(updateTask){
            label.textContent= updateTask;
        }
    }

    let deleteBtn =document.createElement("button");
    let deleteImg =document.createElement("img");
    deleteImg.src="assets/images/delete.png";
    deleteBtn.appendChild(deleteImg);
    deleteBtn.classList.add('del')
    deleteBtn.onclick =function(){
        newDiv.remove();
        personTask.forEach((element,index)=>{
            if(element===label.textContent){
                personTask.splice(index,1)
                localStorage.setItem("users",JSON.stringify(dataArray));
            }
        })
    }
    
    taskArray.push(label.textContent);
    paragraph.append(checkbox,label);
    newDiv.append(paragraph,editBtn,deleteBtn);

    let isTaskFound =false
    const checkTask=personTask.filter(element=> element ===task.value.trim());
    checkTask.length>0?isTaskFound=true:isTaskFound=false;
    
    if(!isTaskFound && task.value.trim()){
        personTask.push(task.value.trim());
        toDoListDiv.appendChild(newDiv);
        localStorage.setItem("users" ,JSON.stringify(dataArray));  
    }
    task.value ="";   
}
function logOut(){
    window.location.href="index.html";
}