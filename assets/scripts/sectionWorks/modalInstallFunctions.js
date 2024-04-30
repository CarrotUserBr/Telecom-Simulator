import sectionInventoryFunctions from "../sectionTech/sectionInventoryFunctions.js"
import clients from "../clients.js"
import sectionShopFunctions from "../sectionTech/sectionShopFunctions.js"

function revealSelectsInModalInstall(state){
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
                            installButtonSubmit.addEventListener('click', () => openPuzzleForInstall(state))
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
    revealSelectsInModalInstall(state)
}

function openPuzzleForInstall(state){
    sectionInventoryFunctions.removeResourcesForInstall()
    state.elements.sectionWorks.earlyWorks.install.classList.remove('modal__active')
    state.elements.sectionWorks.modalInstallElements.modalMiniGame.modalElement.classList.add('modal__active')
    generatePuzzleForInstall(state)
    const closeButton = state.elements.sectionWorks.modalInstallElements.modalMiniGame.modalElement.querySelector('.close__modal__button')
    closeButton.addEventListener('click', () => removeModalMiniGameForInstall(state))

    closeModalInstall(state)
    
}

function generatePuzzleForInstall(state) {
    const minigame = state.elements.sectionWorks.modalInstallElements.modalMiniGame.installMiniGame
    const numberForElements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    for (let i = 1; i <= 16; i++) {
        const newSpan = document.createElement('span')
        const randomNumber = Math.floor(Math.random() * numberForElements.length)
        newSpan.textContent = numberForElements[randomNumber]
        newSpan.id = 'minigameInstallNumber' + newSpan.textContent
        numberForElements.splice(randomNumber, 1)
        minigame.appendChild(newSpan)
    }
    verifySequencePuzzleForInstall(state, 1)
}

function verifySequencePuzzleForInstall(state, indexElement) {
    const element = document.getElementById('minigameInstallNumber' + indexElement)
    element.addEventListener('click', () => {
        element.style.visibility = 'hidden'
        if (indexElement < 16) {
            verifySequencePuzzleForInstall(state, indexElement + 1)
        } else { // You Win Minigame
            removeModalMiniGameForInstall(state)
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

export default {
    revealSelectsInModalInstall,
    closeModalInstall,
    openPuzzleForInstall,
    generatePuzzleForInstall,
    verifySequencePuzzleForInstall,
    removeModalMiniGameForInstall,
    deletePuzzleForInstall,
    insertItensOnInventoryInSelectOptionsInModalInstall,
}