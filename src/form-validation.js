// the code is from one of the YouTube Videos

console.log('it works');
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userComment = document.querySelector('#comment');
const button = document.querySelector('#button');
const form = document.querySelector('form');


const setError = (element, message) =>{
    const inputControl = element.parentElement;
    console.log(inputControl);
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

}
const setSuccess = element =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText ='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email =>{
    const emailRegExp =
        /^[(\w\d\W)+]+@[\w+]+\.[\w+]+$/i;
    return emailRegExp.test(String(email).toLowerCase());

}
const validateInputs = () =>{
    const userNameValue = userName.value.trim();
    const emailValue = userEmail.value.trim();
    if(userNameValue ===''){
        setError(userName, 'Name is required')
    }else{
        setSuccess(userName);
    }
    if (emailValue === '') {
        setError(userEmail, 'Email is required')
    }else if(!isValidEmail(emailValue)){
        setError(userEmail, 'Provide a valid email address')
    }
     else {
        setSuccess(userEmail);
    }



}

form.addEventListener('submit', function(event){
    event.preventDefault();
    validateInputs();


});