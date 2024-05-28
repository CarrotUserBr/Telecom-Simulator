import sectionInventoryFunctions from "../sectionTech/sectionInventoryFunctions.js"
import clients from "../clients.js"
import script from "../script.js"
import customersGenerate from "../customers/customersGenerate.js"
import energy from "../energy.js"

const installList = []

function openInfoOfCustomer(customerId) {
    const home = document.getElementById('customerListForInstall')
    const infoInstall = document.querySelector('.infos__install')
    const formForInstall = document.querySelector('.form__for__install')
    
    home.style.display = 'none'
    infoInstall.style.display = 'flex'
    
    const customer = customersGenerate.findCustomerById(customerId)
    const valueInstallationElement = document.getElementById('valueInstallation')
    const difficultyInstallationElement = document.getElementById('difficultyInstallation')

    valueInstallationElement.textContent = customer.valueForInstallation
    difficultyInstallationElement.textContent = customer.difficulty
    
    const advancedForFormInstall = document.getElementById('advancedForFormInstall')
    if (!advancedForFormInstall.dataset.listenerAdded) {
        advancedForFormInstall.addEventListener('click', () => {
            infoInstall.style.display = 'none'
            formForInstall.style.display = 'flex'
        })
        advancedForFormInstall.dataset.listenerAdded = true
    }

    const state = script.state
    formForInstall.addEventListener('change', () => revealSelectsInModalInstall(state, customer))
}

function revealSelectsInModalInstall(state, customer){
    const selects = state.elements.sectionWorks.modalInstallElements.selects
    const installButtonSubmit = document.getElementById('installButtonSubmit')
    if (selects.selectTech.value !== '') {
        document.querySelectorAll('.select__radio__for__install').forEach(select => select.style.display = 'block')
        if (selects.selectRadio.value !== '') {
            document.querySelectorAll('.select__router__for__install').forEach(select => select.style.display = 'block')
            if (selects.selectRouter.value !== '') {
                document.querySelectorAll('.select__cable__for__install').forEach(select => select.style.display = 'block')
                if (selects.selectCable.value !== '') {
                    document.querySelectorAll('.select__power__suply__for__install').forEach(select => select.style.display = 'block')
                    if (selects.selectPowerSuply.value !== '') {
                        installButtonSubmit.style.display = 'block'
                        if (!installButtonSubmit.dataset.listenerAdded) {
                            installButtonSubmit.addEventListener('click', () => openPuzzleForInstall(state, customer))
                            installButtonSubmit.dataset.listenerAdded = true
                        }
                    } else {
                        installButtonSubmit.style.display = 'none'
                    }
                } else {
                    document.querySelectorAll('.select__power__suply__for__install').forEach(select => select.style.display = 'none')
                    installButtonSubmit.style.display = 'none'
                    selects.selectPowerSuply.value = ''
                }
            } else {
                document.querySelectorAll('.select__cable__for__install').forEach(select => select.style.display = 'none')
                document.querySelectorAll('.select__power__suply__for__install').forEach(select => select.style.display = 'none')
                installButtonSubmit.style.display = 'none'
                selects.selectCable.value = ''
                selects.selectPowerSuply.value = ''
            }
        } else {
            document.querySelectorAll('.select__router__for__install').forEach(select => select.style.display = 'none')
            document.querySelectorAll('.select__cable__for__install').forEach(select => select.style.display = 'none')
            document.querySelectorAll('.select__power__suply__for__install').forEach(select => select.style.display = 'none')
            installButtonSubmit.style.display = 'none'
            selects.selectRouter.value = ''
            selects.selectCable.value = ''
            selects.selectPowerSuply.value = ''
        }
    } else {
        document.querySelectorAll('.select__for__install').forEach(select => select.style.display = 'none')
        installButtonSubmit.style.display = 'none'
        Object.values(selects).forEach(select => select.value = '')
    }
}

function closeModalInstall(state) {
    for (const select in state.elements.sectionWorks.modalInstallElements.selects) {
        if (Object.hasOwnProperty.call(state.elements.sectionWorks.modalInstallElements.selects, select)) {
            const element = state.elements.sectionWorks.modalInstallElements.selects[select];
            element.value = ''
        }
    }
    state.elements.sectionWorks.modalsWork.modalInstall.classList.remove('modal__active')
    const customerListForInstall = document.getElementById('customerListForInstall')
    const infosInstall = document.querySelector('.infos__install')
    const formForInstall = document.querySelector('.form__for__install')

    customerListForInstall.style.display = 'flex'
    infosInstall.style.display = 'none'
    formForInstall.style.display = 'none'
    script.lets.isHaveModalEarlyWorksOpened = false
    revealSelectsInModalInstall(state)
}

function openPuzzleForInstall(state, customer){
    sectionInventoryFunctions.removeResourcesForInstall()
    state.elements.sectionWorks.earlyWorks.install.classList.remove('modal__active')
    state.elements.sectionWorks.modalInstallElements.modalMiniGame.modalElement.classList.add('modal__active')
    generatePuzzleForInstall(state, customer)
    const closeButton = state.elements.sectionWorks.modalInstallElements.modalMiniGame.modalElement.querySelector('.close__modal__button')
    closeButton.addEventListener('click', () => removeModalMiniGameForInstall(state))

    closeModalInstall(state)
}

function generatePuzzleForInstall(state, customer) {
    const minigame = state.elements.sectionWorks.modalInstallElements.modalMiniGame.installMiniGame
    const difficulty = customer.difficulty
    let difficultyNumber = ''
    if (difficulty === 'Fácil') {
        difficultyNumber = 8
    } else if (difficulty === 'Média') {
        difficultyNumber = 12
    } else if (difficulty === 'Média-Alta') {
        difficultyNumber = 16
    } else if (difficulty === 'Difícil') {
        difficultyNumber = 20
    }

    let numberForElements = []

    for (let i = 1; i <= difficultyNumber; i++) {
        numberForElements.push(i)
    }
    
    for (let i = 1; i <= difficultyNumber; i++) {
        const newSpan = document.createElement('span')
        const randomNumber = Math.floor(Math.random() * numberForElements.length)
        newSpan.textContent = numberForElements[randomNumber]
        newSpan.id = 'minigameInstallNumber' + newSpan.textContent
        numberForElements.splice(randomNumber, 1)
        minigame.appendChild(newSpan)
    }
    verifySequencePuzzleForInstall(state, 1, customer, difficultyNumber)
}

function verifySequencePuzzleForInstall(state, indexElement, customer, difficultyNumber) {
    const element = document.getElementById('minigameInstallNumber' + indexElement)
    element.addEventListener('click', () => {
        element.style.visibility = 'hidden'
        if (indexElement < difficultyNumber) {
            verifySequencePuzzleForInstall(state, indexElement + 1, customer, difficultyNumber)
        } else { // You Win Minigame
            energy.removeEnergy(20)
            removeModalMiniGameForInstall(state)
            removeCustomerOfListInstall(customer)
            clients.addNewClient()
        }
    })
}

function removeModalMiniGameForInstall(state) {
    state.elements.sectionWorks.modalInstallElements.modalMiniGame.modalElement.classList.remove('modal__active')
        deletePuzzleForInstall(state)
}

function deletePuzzleForInstall() {
    for (let i = 1; i <= 16; i++) {
        const deletedElement = document.getElementById('minigameInstallNumber' + i)
        deletedElement.remove()
    }
}

function insertItensOnInventoryInSelectOptionsInModalInstall(itensList) {
    addOptionToSelect('selectRadioForInstall', itensList.radio)
    addOptionToSelect('selectRouterForInstall', itensList.router)
    addOptionToSelect('selectCableForInstall', itensList.cable)
    addOptionToSelect('selectPowerSuplyForInstall', itensList.powerSuply)
}

function addOptionToSelect(selectId, options){
    const select = document.getElementById(selectId)
    select.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.textContent = 'Selecione uma opção'
    defaultOption.value = ''
    select.appendChild(defaultOption)

    options.model.forEach((model, index)=> {
        const id = options.id[index]
        const newOption = document.createElement('option')
        newOption.textContent = model
        newOption.value = model
        newOption.id = `optionIdItem-${id}`
        select.appendChild(newOption)
    })
}

function createItemInTheTableInstall(newCustomer) {
    const table = document.getElementById('menuAssistListInstall')
    
    // Create Elements
    const trHeadName = document.createElement('tr')
    const thHeadName = document.createElement('th')
    const trHeadInfo = document.createElement('tr')
    const thHeadInfoTimeLeft = document.createElement('th')
    const thHeadInfoAssist = document.createElement('th')
    const trBodyInfo = document.createElement('tr')
    const tdBodyInfoTimeLeft = document.createElement('td')
    const tdBodyInfoAssist = document.createElement('td')
    const icon = document.createElement('i')
    
    // Add attibute
    trHeadName.classList.add('list__assist__name__customer', `list__assist__item-${newCustomer.id}`)
    thHeadName.classList.add('list__assist__name__customer__item')
    thHeadName.colSpan = '3'
    trHeadInfo.classList.add('list__assist__info__customer__head', `list__assist__item__info-${newCustomer.id}`)
    thHeadInfoTimeLeft.classList.add('list__assist__time__left__head')
    thHeadInfoAssist.classList.add('list__assist__button__install__head')
    trBodyInfo.classList.add('list__assist__info__customer__body', `list__assist__item__info-${newCustomer.id}`)
    tdBodyInfoTimeLeft.classList.add('list__assist__time__left__body')
    tdBodyInfoAssist.classList.add('list__assist__button__install__body', `list__assist__button-${newCustomer.id}`)
    icon.classList.add('bi', 'bi-house-up-fill')
    
    // Add content
    thHeadName.textContent = `${newCustomer.name}`
    thHeadInfoTimeLeft.textContent = 'Tempo restante:'
    thHeadInfoAssist.textContent = 'Instalar'
    tdBodyInfoTimeLeft.textContent = `${newCustomer.installationInfos.timeMaxForInstall} semanas`
    
    // Append Childs
    table.appendChild(trHeadName)
    table.appendChild(trHeadInfo)
    table.appendChild(trBodyInfo)
    trHeadName.appendChild(thHeadName)
    trHeadInfo.appendChild(thHeadInfoTimeLeft)
    trHeadInfo.appendChild(thHeadInfoAssist)
    trBodyInfo.appendChild(tdBodyInfoTimeLeft)
    trBodyInfo.appendChild(tdBodyInfoAssist)
    tdBodyInfoAssist.appendChild(icon)
    printNumberOfInstallInAlert()
}

function printNumberOfInstallInAlert() {
    const alertAssists = document.getElementById('workInstallAlert')
    if (installList.length < 10) {
        alertAssists.textContent = `0${installList.length}`
    } else if (installList.length > 99) {
        alertAssists.textContent = '99+'
    } else {
        alertAssists.textContent = installList.length
    }
}

function removeCustomerOfListInstall(customer) {
    const listAssistName = document.querySelector(`.list__assist__item-${customer.id}`)
    const listAssistInfo = Array.from(document.querySelectorAll(`.list__assist__item__info-${customer.id}`))
    if (listAssistName && listAssistInfo) {
        listAssistName.remove()
        listAssistInfo.forEach(element => element.remove())
        installList.splice(installList.indexOf(customer.name),1); // Remover o cliente da lista
    }
    printNumberOfInstallInAlert()
}

function printNewTimeMaxForInstall(customer) {
    const trBodyInfo = document.querySelectorAll(`.list__assist__item__info-${customer.id}`)[1]
    const tdBodyInfoTimeLeft = trBodyInfo.querySelector('.list__assist__time__left__body')
    tdBodyInfoTimeLeft.textContent = `${customer.installationInfos.timeMaxForInstall} semanas`
}

export default {
    installList,
    openInfoOfCustomer,
    revealSelectsInModalInstall,
    closeModalInstall,
    openPuzzleForInstall,
    generatePuzzleForInstall,
    verifySequencePuzzleForInstall,
    removeModalMiniGameForInstall,
    deletePuzzleForInstall,
    insertItensOnInventoryInSelectOptionsInModalInstall,
    createItemInTheTableInstall,
    printNumberOfInstallInAlert,
    removeCustomerOfListInstall,
    printNewTimeMaxForInstall,
}