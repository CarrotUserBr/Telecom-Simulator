import modalInstallFunctions from "../sectionWorks/modalInstallFunctions.js";
import sectionShopFunctions from "./sectionShopFunctions.js";
import script from "../script.js";

const table = document.getElementById('tableInventory')
let itensList = {
    radio: {id: [], model: [],},
    router: {id: [], model: []},
    cable: {id: [], model: []},
    powerSuply: {id:[], model: []}
}

function addInventoryListInSectionInventory(inventoryList, dates){
    
    for (let i = 0; i < inventoryList.length; i++) {
        const element = inventoryList[i];

        // Calcular a quantidade
        const itemExisting = table.querySelector(`.item__inventory__list-${element.id}`)
        if (itemExisting) {
            const quantityCell = itemExisting.querySelector('.td__quantity')
            if (quantityCell) {
                quantityCell.textContent = parseInt(quantityCell.textContent) + 1
            }
        } else {
            
            const trElement = document.createElement('tr')
            const tdElementType = document.createElement ('td')
            const tdElementModel = document.createElement('td')
            const tdElementQuality = document.createElement('td')
            const tdElementQuantity = document.createElement('td')
            
            trElement.classList.add(`item__inventory__list-${element.id}`)
            tdElementType.textContent = element.type
            tdElementModel.textContent = `${element.brand} ${element.model}`
            tdElementQuality.textContent = element.quality
            tdElementQuantity.textContent = 1
            tdElementQuantity.classList.add('td__quantity')
            
            table.appendChild(trElement)
            trElement.appendChild(tdElementType)
            trElement.appendChild(tdElementModel)
            trElement.appendChild(tdElementQuality)
            trElement.appendChild(tdElementQuantity)
        }
    }
    inventoryList.splice(0, inventoryList.length)

    const inventoryListInTableExtended = Array.from(table.querySelectorAll('tr'))
    inventoryListInTableExtended.shift()
    const inventoryListInTable = []
    inventoryListInTableExtended.forEach(element => {
        const itemIdText = element.classList.value
        const itemId = itemIdText.split('-')[1]
        inventoryListInTable.push(itemId)
    })

    updateItensList(inventoryListInTable, dates)
}

function updateItensList(inventoryListInTable, dates) {
    itensList = {
        radio: {id: [], model: [],},
        router: {id: [], model: []},
        cable: {id: [], model: []},
        powerSuply: {id:[], model: []}
    }
    
    inventoryListInTable.forEach(element => {
        const dateItem = dates[`id${element}`]
        const dateType = dateItem.type

        if (dateType === 'Antena') {
            itensList.radio.model.push(`${dateItem.brand} ${dateItem.model}`)
            itensList.radio.id.push(dateItem.id)
        } else if (dateType === 'Roteador'){
            itensList.router.model.push(`${dateItem.brand} ${dateItem.model}`)
            itensList.router.id.push(dateItem.id)
        } else if (dateType === 'Cabo de Rede'){
            itensList.cable.model.push(`${dateItem.brand} ${dateItem.model}`)
            itensList.cable.id.push(dateItem.id)
        } else if (dateType === 'Fonte de Alimentação'){
            itensList.powerSuply.model.push(`${dateItem.brand} ${dateItem.model}`)
            itensList.powerSuply.id.push(dateItem.id)
        }
    })
    modalInstallFunctions.insertItensOnInventoryInSelectOptionsInModalInstall(itensList)
}

function removeResourcesForInstall(){
    const listItensToRemove = []
    const formForInstall = document.querySelector('.form__for__install')
    const selectsInModalInstall = Array.from(formForInstall.querySelectorAll('select'))
    selectsInModalInstall.slice(0, 1)
    selectsInModalInstall.forEach(element => {
        const selectedOption = element.options[element.selectedIndex]
        listItensToRemove.push(selectedOption)
    })
    removeResourcesInTheInventory(listItensToRemove)
}

function removeResourcesInTheInventory(listItensToRemove){
    listItensToRemove.forEach(element => {
        const id = element.id.split('-')[1]
        const elementWithId = table.querySelector(`.item__inventory__list-${id}`)
        if (elementWithId) {
            const quantityElement = elementWithId.querySelector('.td__quantity')
            if (quantityElement.textContent == '1'){
                elementWithId.remove()
            } else {
                quantityElement.textContent = quantityElement.textContent - 1
            }
        }
    })
    addInventoryListInSectionInventory(script.state.dates.inventoryList, sectionShopFunctions.dates)
    modalInstallFunctions.insertItensOnInventoryInSelectOptionsInModalInstall(itensList)
}

export default {
    addInventoryListInSectionInventory,
    updateItensList,
    removeResourcesForInstall,
    removeResourcesInTheInventory,
}