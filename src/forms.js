const { isNull } = require("util");

var ResultadoNombre = false;
var ResultadoEmail = false;
var ResultadoPassword = false;

const handleFillCountry = _.debounce((ev) => {
    // only show matched events

    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()
    console.log(`search for ${inputText}`);

    for (let country of countryList) {
        let row = document.createElement('div')
        row.innerText = country
        row.onclick = selectCountry

        node.appendChild(row)
    }
  }, 300);

//showEle



function validateName(event) {
    init();
    const name = event.target.value
    var resultado = true;
    if (name.trim() === '') {
        resultado = false;
    }

    if (name.length < 8) {
        resultado = false;
    }

    if(resultado){
        showElementWithClassName(event.target, 'valid-feedback');
    }else{
        showElementWithClassName(event.target, 'invalid-feedback');
    }
   
    ResultadoNombre = resultado;
    return resultado;
}



function validatePassword(event) {
    // password should be at least 8 of length
    // should contains at least one lower letter
    // should contains at least one capital letter
    // should contains at least one number
    // otherwise, password is invalid
    init();
    const password = event.target.value
    var resultado = true;

    if (password.trim() === '') {
        resultado = false;
    } else if (password.length <= 8) {
        resultado = false;
    } else if (!/[A-Z]/.test(password)) { // Check for uppercase letters
        resultado = false;
    } else if (!/[a-z]/.test(password)) { // Check for lowercase letters
        resultado = false;
    } else if (!/[0-9]/.test(password)) { // Check for numbers
        resultado = false;
    }
  
    if (resultado) {
        showElementWithClassName(event.target, 'valid-feedback');
    } else {
        showElementWithClassName(event.target, 'invalid-feedback');
    }

    ResultadoPassword = resultado;
    return resultado
}

function myValidateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateEmail(event) {
    init();
    const email = event.target.value;

    var resultado = true;
    if (email.trim() === '') {
        resultado = false;
    }

    
    //const input = document.getElementById("myEmail");
    if (!myValidateEmail(email)) {
        console.log("El campo NO es una dirección de correo electrónico válida");
        resultado = false;
    } 
    if(resultado){
        showElementWithClassName(event.target, 'valid-feedback');
    }else{
        showElementWithClassName(event.target, 'invalid-feedback');
    }

    ResultadoEmail = resultado;
    return resultado
}


// general register
function register(event) {
    // check if name is fullfiled
    // check if email is fullfiled
    // check if password is fullfiled
    // check if gender is selected
    // check if checkbox with "I confirm that all data are correct" is checked

    const radioMale = document.getElementById("male");
    const radioFemale = document.getElementById("female");
    const radioSecret = document.getElementById("secret");
    let radioSelected = false;
    if(radioMale.checked || radioFemale.checked || radioSecret.checked){
        radioSelected = true;
    }

    const checkConfirm = document.getElementById("invalidCheck");
    let estaConfirmed = false;
    if(checkConfirm.checked){
        estaConfirmed = true;
    }


    try{
        if(ResultadoNombre && ResultadoEmail && ResultadoPassword && radioSelected && estaConfirmed){
            console.log("Los identifica correctamente")
        
            // then, send a POST to localhost:3000/register with all the data in the body as a JSON
            fetch('http://localhost:3000/', {
                method: 'POST',
                body: JSON.stringify({
                    'name': 'sample'
                }),
                headers: {
                    'Content-type': 'application/json'
                },
            })
            event.preventDefault();
        
        }

    }catch(e){
        console.log(e);
        console.log("Error al enviar el formulario");
    }
    


    
    return false;
}

// utility functions
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}
function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()