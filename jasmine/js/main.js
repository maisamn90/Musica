function multiplication(num1,num2) {
    if (typeof(num1)=="number" && typeof(num2)=="number"){
    return num1*num2;
    }
    else {
        alert("Error"); 
    }
    
    if (num1 == null || num2 == null) {
        alert("one parameter messing");
    }
    if (num1 == null && num2 == null) {
        alert("No parameters added");
    }
}