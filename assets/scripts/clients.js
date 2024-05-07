// Variáveis orientadas aos clientes:
let clientsNumber = 0

function addNewClient() {
    clientsNumber++

    const clientCountHeader = document.getElementById('clientCountHeader')
    const clientsActiveAmount = document.getElementById('clientsActiveAmount')

    if (clientsNumber < 10) {
        clientCountHeader.textContent = `00${clientsNumber}`
        clientsActiveAmount.textContent = `00${clientsNumber}`
    } else if (clientsNumber < 100) {
        clientCountHeader.textContent = `0${clientsNumber}`
        clientsActiveAmount.textContent = `0${clientsNumber}`
    } else {
        clientCountHeader.textContent = clientsNumber
        clientsActiveAmount.textContent = clientsNumber
    }
}


export default {
    addNewClient,
}