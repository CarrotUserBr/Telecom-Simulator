import customersGenerate from "../customers/customersGenerate.js";
import script from "../script.js";
import modalInstallFunctions from "./modalInstallFunctions.js";

const assistList = []
const repairList = []
const collectList = []

function openMenuItem() {
    const assistTable = document.getElementById('menuAssistItemAssist')
    assistTable.style.display = 'flex'
    activeAcorddionForTable()
}

function backToMenu() {
    const assistMenu = document.getElementById('assistCustomerForInstall')
    const buttonBack = document.querySelector('.back__modal__button')
    const assistTable = document.getElementById('menuAssistItemAssist')
    assistMenu.style.display = 'none'
    buttonBack.style.display = 'none'
    assistTable.style.display = 'flex'
    
    document.querySelectorAll('.list__assist__info__customer__head, .list__assist__info__customer__body').forEach(element => element.style.display = 'none')
}

function closeModalAndResetItens() {
    const modal = document.getElementById('modalAssist')
    const buttonBack = document.querySelector('.back__modal__button')
    
    modal.classList.remove('modal__active')
    buttonBack.style.display = 'none'
    
    const selectPlans = document.getElementById('assistForInstallPlans')
    const inputInstallationValue = document.getElementById('assistForInstallInputInstallationValue')
    selectPlans.value = ''
    inputInstallationValue.value = '' 
 
    const listAssistInfoCustomerHead = Array.from(document.querySelectorAll('.list__assist__info__customer__head')) 
    const listAssistInfoCustomerBody = Array.from(document.querySelectorAll('.list__assist__info__customer__body'))
    
    listAssistInfoCustomerHead.forEach(element => element.style.display = 'none')
    listAssistInfoCustomerBody.forEach(element => element.style.display = 'none')
    
    const assistCustomerForInstall = document.getElementById('assistCustomerForInstall')
    assistCustomerForInstall.style.display = 'none'
}

function generateNewAssistInstallItem() {
    const customerList = customersGenerate.listCustomer
    const numberOfNewCustomers = 1
    for (let i = 0; i < numberOfNewCustomers; i++) {
        customersGenerate.addListCustomer()
        const newCustomer = customerList[customerList.length - 1]
        createItemInTheTableAssist(newCustomer)
    }
}

function createItemInTheTableAssist(newCustomer) {
    assistList.push(newCustomer)
    const table = document.getElementById('menuAssistListAssist')
    
    // Create Elements
    const trHeadName = document.createElement('tr')
    const thHeadName = document.createElement('th')
    const trHeadInfo = document.createElement('tr')
    const thHeadInfoType = document.createElement('th')
    const thHeadInfoAssist = document.createElement('th')
    const trBodyInfo = document.createElement('tr')
    const tdBodyInfoType = document.createElement('td')
    const tdBodyInfoAssist = document.createElement('td')
    const icon = document.createElement('i')
    
    // Add attibute
    trHeadName.classList.add('list__assist__name__customer', `list__assist__item-${newCustomer.id}`)
    thHeadName.classList.add('list__assist__name__customer__item')
    thHeadName.colSpan = '3'
    trHeadInfo.classList.add('list__assist__info__customer__head', `list__assist__item__info-${newCustomer.id}`)
    thHeadInfoType.classList.add('list__assist__type__service__head')
    thHeadInfoAssist.classList.add('list__assist__button__assist__head')
    trBodyInfo.classList.add('list__assist__info__customer__body', `list__assist__item__info-${newCustomer.id}`)
    tdBodyInfoType.classList.add('list__assist__type__service__body')
    tdBodyInfoAssist.classList.add('list__assist__button__assist__body', `list__assist__button-${newCustomer.id}`)
    icon.classList.add('bi', 'bi-headset')
    
    // Add content
    thHeadName.textContent = `${newCustomer.name}`
    thHeadInfoType.textContent = 'Tipo de serviço:'
    thHeadInfoAssist.textContent = 'Atender'
    tdBodyInfoType.textContent = 'Instalação'
    
    // Append Childs
    table.appendChild(trHeadName)
    table.appendChild(trHeadInfo)
    table.appendChild(trBodyInfo)
    trHeadName.appendChild(thHeadName)
    trHeadInfo.appendChild(thHeadInfoType)
    trHeadInfo.appendChild(thHeadInfoAssist)
    trBodyInfo.appendChild(tdBodyInfoType)
    trBodyInfo.appendChild(tdBodyInfoAssist)
    tdBodyInfoAssist.appendChild(icon)
}

function activeAcorddionForTable() {
    const tables = Array.from(document.querySelectorAll('.table__menu__assist'))
    tables.forEach(table => {  
        if (!table.dataset.listenerAdded) {
            table.addEventListener('click', (event) => {
                const target = event.target
                
                if (target.classList.contains('list__assist__name__customer__item')) {
                    document.querySelectorAll('.list__assist__info__customer__head, .list__assist__info__customer__body').forEach(element => element.style.display = 'none')
                    const idItemList = target.parentElement.classList[1].split('-')[1]
                    const itensToOpen = Array.from(document.querySelectorAll(`.list__assist__item__info-${idItemList}`))
                    itensToOpen.forEach(element => {
                        element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'table-row' : 'none'
                    })
                }
                
                if(table.id === 'menuAssistListAssist'){
                    if (target.classList.contains('list__assist__button__assist__body') || target.classList.contains('bi-headset')) {
                        const customerId = (target.classList.contains('bi-headset')? target.parentElement.classList[1].split('-')[1] : target.classList[1].split('-')[1])
                        assistCustomer(customerId)
                    }
                } else if (table.id === 'menuAssistListInstall') {
                    if (target.classList.contains('list__assist__button__assist__body') || target.classList.contains('bi-house-up-fill')) {
                        const customerId = (target.classList.contains('bi-house-up-fill')? target.parentElement.classList[1].split('-')[1] : target.classList[1].split('-')[1])
                        modalInstallFunctions.openInfoOfCustomer(customerId)
                    }
                }
            })
            table.dataset.listenerAdded = true
        }
    })
}

function assistCustomer(customerId) {
    const assistTable = document.getElementById('menuAssistItemAssist')
    const assistCustomer = document.getElementById('assistCustomerForInstall')
    const buttonBack = document.querySelector('.back__modal__button')
    buttonBack.style.display = 'block'
    assistTable.style.display = 'none'
    assistCustomer.style.display = 'flex'
    
    if (!buttonBack.dataset.listenerAdded) {
        buttonBack.addEventListener('click', backToMenu)
        buttonBack.dataset.listenerAdded = true
    }
    const customer = customersGenerate.findCustomerById(customerId)
    const nameCustomer = customer.name

    document.getElementById('assistForInstallNameCustomer').textContent = nameCustomer
    document.getElementById('assistForInstallSpeedDesired').textContent = `Acima de ${customer.desiredSpeed}Mb de download`

    const buttonSendProposal = document.getElementById('sendProposalForCustomer')

    const newButtonSendProposal = buttonSendProposal.cloneNode(true);
    buttonSendProposal.parentNode.replaceChild(newButtonSendProposal, buttonSendProposal);

    newButtonSendProposal.addEventListener('click', () => sendProposal(customer));
}

function sendProposal(customer) {
    const valueForInstallation = document.getElementById('assistForInstallInputInstallationValue').value;
    const plans = document.getElementById('assistForInstallPlans').value;
    if (valueForInstallation !== '' && plans !== '') {
        verifyConditionsForCustomer(customer);
    }
}

function verifyConditionsForCustomer(customer) {
    const valueForInstallation = document.getElementById('assistForInstallInputInstallationValue').value
    const plans = document.getElementById('assistForInstallPlans').value
    const plansSpeed = parseInt(plans.split('Mb /')[0])
    const plansPrice = parseFloat(plans.split('/ $')[1])

    if (valueForInstallation > customer.valueMaxInstall) {
        console.log('Valor da instalação muito alto!')
    } else if (plansSpeed < customer.desiredSpeed) {
        console.log('Velocidade abaixo do esperado')
    } else if (plansPrice > customer.valueMaxMensality) {
        console.log('Preço da mensalidade muito caro')
    } else {
        console.log('Instalação agendada!')
        customer.valueForInstallation = valueForInstallation
        sendToListInstall(customer)
    }
    closeModalAndResetItens()
    script.lets.isHaveModalEarlyWorksOpened = false    
}

function sendToListInstall(customer) {
    assistList.splice(assistList.indexOf(customer.name), 1)
    const listAssistName = document.querySelector(`.list__assist__item-${customer.id}`)
    const listAssistInfo = Array.from(document.querySelectorAll(`.list__assist__item__info-${customer.id}`))
    listAssistName.remove()
    listAssistInfo.forEach(element => element.remove())
    printNumberOfAssistsInAlert()
    modalInstallFunctions.installList.push(customer)
    modalInstallFunctions.createItemInTheTableInstall(customer)
}

function printNumberOfAssistsInAlert() {
    const alertAssists = document.getElementById('workAssistAlert')
    if (assistList.length < 10) {
        alertAssists.textContent = `0${assistList.length}`
    } else if (assistList.length > 99) {
        alertAssists.textContent = '99+'
    } else {
        alertAssists.textContent = assistList.length
    }
}

export default {
    assistList,
    repairList,
    collectList,
    openMenuItem,
    backToMenu,
    closeModalAndResetItens,
    generateNewAssistInstallItem,
    createItemInTheTableAssist,
    activeAcorddionForTable,
    assistCustomer,
    sendToListInstall,
    printNumberOfAssistsInAlert,
}