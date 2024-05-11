import customersGenerate from "../customers/customersGenerate.js";

const assistList = []

function openMenuItem() {
    const itensCard = document.querySelectorAll('.card__assist')
    const menuHome = document.querySelector('.menu__assist')
    const buttonBack = document.querySelector('.back__modal__button')

    for (const key in itensCard) {
        if (Object.hasOwnProperty.call(itensCard, key)) {
            const element = itensCard[key];
            element.addEventListener('click', () => {
                const typeMenuItem = element.id.substring(10)
                const menuItemActive = document.getElementById(`menuAssistItem${typeMenuItem}`)

                menuHome.style.display = 'none'
                menuItemActive.style.display = 'flex'
                buttonBack.style.display = 'block'
                buttonBack.addEventListener('click', () => backToMenu(menuItemActive, buttonBack, menuHome))
            })
        }
    }

    activeAcorddionForTable()
}

function backToMenu(menuItemActive, buttonBack, menuHome) {
    menuItemActive.style.display = 'none'
    buttonBack.style.display = 'none'
    menuHome.style.display = 'grid'

    const listAssistInfoCustomerHead = Array.from(document.querySelectorAll('.list__assist__info__customer__head')) 
    const listAssistInfoCustomerBody = Array.from(document.querySelectorAll('.list__assist__info__customer__body'))
    listAssistInfoCustomerHead.forEach(element => element.style.display = 'none')
    listAssistInfoCustomerBody.forEach(element => element.style.display = 'none')

    
}

function closeModalAndResetItens() {
    const modal = document.getElementById('modalAssist')
    const menuItens = Array.from(document.querySelectorAll('.menu__itens__assist'))
    const menuHome = document.querySelector('.menu__assist')
    const buttonBack = document.querySelector('.back__modal__button')

    modal.classList.remove('modal__active')
    menuItens.forEach(element => element.style.display = 'none')
    menuHome.style.display = 'grid'
    buttonBack.style.display = 'none'


    const listAssistInfoCustomerHead = Array.from(document.querySelectorAll('.list__assist__info__customer__head')) 
    const listAssistInfoCustomerBody = Array.from(document.querySelectorAll('.list__assist__info__customer__body'))
    
    listAssistInfoCustomerHead.forEach(element => element.style.display = 'none')
    listAssistInfoCustomerBody.forEach(element => element.style.display = 'none')
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
    tdBodyInfoAssist.classList.add('list__assist__button__assist__body')
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
    const tableNameCustomer = Array.from(document.querySelectorAll('.list__assist__name__customer'))
    tableNameCustomer.forEach(element => {
            element.addEventListener('click', () => {
                const idItemList = element.classList[1].split('-')[1]
                const itensToOpen = Array.from(document.querySelectorAll(`.list__assist__item__info-${idItemList}`))
                itensToOpen.forEach(element => {
                    if (element.style.display === 'none' || element.style.display === '') {
                        element.style.display = 'table-row'
                    } else {
                        element.style.display = 'none'
                    }
                })
            })
    })

}


export default {
    assistList,
    openMenuItem,
    backToMenu,
    closeModalAndResetItens,
    generateNewAssistInstallItem,
    createItemInTheTableAssist,
    activeAcorddionForTable,
}