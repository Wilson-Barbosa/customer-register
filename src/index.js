//adding a mask to the CEP input
$('#cep').mask('00000-000');



//user info is stored here
let customerStorage = [
    //TODO this is just an example, it will be removed later
    {
        id: 1,
        firstName: "Timóteo",
        lastName: "de Souza",
        houseNumber: 182,
        address: "Rua das Magnólias",
        cep: "13340-500",
        neighborhood: "Jardim das Primaveras",
        city: "Nova Odessa",
        state: "SP"
    },
];



//function that takes the customer's info from the the form
function takesCustomerInfoFromScreen(){

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



//function that displays customer info on the screen's table
function showCustomerInfoOnScreen(customer){
    
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
function saveCustomer(){

    const customerData = takesCustomerInfoFromScreen();  //takes the valid information

    customerStorage.push(customerData);                  //pushes the data to customerStorage 

    showCustomerInfoOnScreen(customerData);              //send the data to the table

    //TODO remember to enable this after the testing is done
    //document.getElementById("form-register").reset();    
}
