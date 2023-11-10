//adding a mask to the CEP input
$('#cep').mask('00000-000');



//customer info is stored here
let customerStorage = [];


//variable to check if the cep is valid
let cepIsValid = false;


//function that takes the customer's info from the the form
function takesCustomerInfoFromScreen() {

    //captures the customer's info and stores in this object temporarily so that I can push to customerStorage later
    const newCustomer = {
        id: customerStorage.length + 1,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        houseNumber: document.getElementById("houseNumber").value,
        address: document.getElementById("address").value,
        cep: document.getElementById("cep").value,
        neighborhood: document.getElementById("neighborhood").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value
    };

    //returning the customer info for later user
    return newCustomer;
}




//function that displays customer's info on the screen table
function showCustomerInfoOnScreen(customer) {

    const table = document.getElementById("table");     //grabs the table element
    const newRow = table.insertRow();                   //inserts a new row in the table


    //appending each property value to a cell in the table:

    //ID
    const newId = document.createTextNode(customer.id);
    newRow.insertCell().appendChild(newId);

    //FULLNAME
    const newFullName = document.createTextNode(`${customer.firstName} ${customer.lastName}`);
    newRow.insertCell().appendChild(newFullName);

    //ADRESS with HOUSE NUMBER
    const newAdress = document.createTextNode(`${customer.address}, ${customer.houseNumber}`);
    newRow.insertCell().appendChild(newAdress);

    //CEP
    const newCep = document.createTextNode(customer.cep);
    newRow.insertCell().appendChild(newCep);

    //NEIGHBORHOOD
    const newNeighborhood = document.createTextNode(customer.neighborhood);
    newRow.insertCell().appendChild(newNeighborhood);

    //CITY
    const newCity = document.createTextNode(customer.city);
    newRow.insertCell().appendChild(newCity);

    //STATE
    const newState = document.createTextNode(customer.state);
    newRow.insertCell().appendChild(newState);

}




/*This function will be executed every time a valid form is registered which means
that the CEP was valid, the request was successful and all inputs are validated */
function saveCustomer() {

    if(cepIsValid === true){
        const customerData = takesCustomerInfoFromScreen();  //takes the valid information

        customerStorage.push(customerData);                  //pushes the data to customerStorage 
    
        showCustomerInfoOnScreen(customerData);              //send the data to the table
    
        document.getElementById("form-register").reset();    //resets the form
    
        disableHouseNumberInput();                           //disables the number input
        
        cepIsValid = false;
    }

}




/* function that makes a request to the API and runs the appropriate response.
It's executed when the input loses it's focus status (onblur) */
function makeRequest() {

    const inputCep = document.getElementById("cep").value;      //grabbing the CEP's input value
    const url = `https://viacep.com.br/ws/${inputCep}/json/`;   //setting the proper request path

    //in this line I ALWAYS remove all small (if any) element in the code (ALWAYS)
    removeErrorMessage();

    //if nothing is typed in the CEP then no request is made
    if (inputCep != '') {

        //request is made
        $.getJSON(url, (response) => {

            //if CEP is valid but wasn't found in the data base:
            if ("erro" in response) {
                addErrorMessage("CEP Não Encontrado");
            }

            //if the CEP is valid and was found in the data base:
            else {
                enableHouseNumberInput();
                fillBlankInputs(response);
                cepIsValid = true;
            }
        }
            //if the CEP is invalid (bad request) this message is displayed
        ).fail(() => {
            addErrorMessage("CEP Inválido");
        });
    }

}




//this function sends an error message depending on the type of error it gets
function addErrorMessage(error) {

    //grabbing the div where CEP input is located
    const cepDIV = document.getElementById('errorOnCep');

    //this creatres the element, assigns a bootstrap class and sets it's content with the parameters passed
    let errorMessage = document.createElement('small');
    errorMessage.className = 'text-danger';
    errorMessage.id = "error";
    errorMessage.innerText = error;

    //now to append the new element created to my small element
    cepDIV.appendChild(errorMessage);
}




//function that removes the error message
function removeErrorMessage() {

    /* this searches the document and if it finds any small tags the code below is executed */
    /* querySelectorAll returns a nodelist, so if a nodelist exists all small tags are removed */
    if (document.querySelectorAll("small").length != 0) {
        const cepDIV = document.getElementById('errorOnCep');
        const error = document.getElementById("error");
        cepDIV.removeChild(error);
    }

}




/* this function takes the object's properties that I got from the successful request
and sends them to the disable form inputs */
function fillBlankInputs(response) {
    document.getElementById("address").value = response.logradouro;
    document.getElementById("neighborhood").value = response.bairro;
    document.getElementById("city").value = response.localidade;
    document.getElementById("state").value = response.uf;
}




//function that enables the houseNumber input
function enableHouseNumberInput() {
    $("#houseNumber").prop("disabled", false);
}




//function that disables the houseNumber Input
function disableHouseNumberInput() {
    $("#houseNumber").prop("disabled", true);
}