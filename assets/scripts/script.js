import modalInstallFunctions from "./sectionWorks/modalInstallFunctions.js"
import modalAssistFunctions from "./sectionWorks/modalAssistFunctions.js"
import sectionShopFunctions from "./sectionTech/sectionShopFunctions.js"

const state = {
    elements: {
        menuItens: {
            manager: document.getElementById('menuManager'),
            tech: document.getElementById('menuTech'),
            infraestrutura: document.getElementById('menuInfraestrutura'),
            work: document.getElementById('menuWork'),
            financas: document.getElementById('menuFinancas'),
            empresas: document.getElementById('menuEmpresas')
        },
        sectionTech: {
            home: document.getElementById('sectionTechHome'),
            menu: {
                shop: document.getElementById('menuTechShop'),
                trainer: document.getElementById('menuTechTrainer'),
                upgrade: document.getElementById('menuTechUpgrade'),
                inventory: document.getElementById('menuTechInventory'),
                repairs: document.getElementById('menuTechRepairs'),
            },
            shop: {
                tableCartShop: document.querySelector('.table__shop__cart__list'),
                cartShopIconMenu: document.querySelector('.cart__icon__menu'),
                shopCategories: {
                    radios: document.getElementById('techShopRadios'),
                    routers: document.getElementById('techShopRouters'),
                    cables: document.getElementById('techShopCables'),
                    powerSuplies: document.getElementById('techShopPowerSuplies'),
                    generalTools: document.getElementById('techShopGeneralTools'),
                    fiberOpticTools: document.getElementById('techShopFiberOpticTools'),
                    fibers: document.getElementById('techShopFibers'),
                    ONUsAndONTs: document.getElementById('techShopONUsAndONTs'),
                },
            },
        },
        sectionWorks: {
            earlyWorks: {
                install: document.getElementById('workInstall') ,
                repair: document.getElementById('workRepair'),
                collect: document.getElementById('workCollect'),
                assist: document.getElementById('workAssist'),
                promote: document.getElementById('workPromote'),
                employees: document.getElementById('workEmployees')
            },
            modalsWork: {
                modalInstall: document.getElementById('modalInstall')
            },
                modalInstallElements: {
                    formForInstall: document.querySelector('.form__for__install'),
                    selects: {
                        selectTech : document.getElementById('selectTechForInstall'),
                        selectRadio : document.getElementById('selectRadioForInstall'),
                        selectRouter : document.getElementById('selectRouterForInstall'),
                        selectCable : document.getElementById('selectCableForInstall'),
                        selectPowerSuply : document.getElementById('selectPowerSuplyForInstall'),
                    },
                    modalMiniGame: {
                        modalElement: document.getElementById('modalInstallMiniGame'),
                        installMiniGame: document.getElementById('installMiniGame'),
                    },
                },
            missionsWork: {
                mission1: document.getElementById('mission1'),
                mission2: document.getElementById('mission2'),
                mission3: document.getElementById('mission3'),
                mission4: document.getElementById('mission4'),
                mission5: document.getElementById('mission5')
            },
        },
    },
    values: {

    },
    dates: {
        inventoryList: [],
    }
}

const lets = {
    lastMenuActive: state.elements.menuItens.manager,
    lastSectionActive: document.getElementById('sectionManager'),
    lastMissionWorkAccordionActive: state.elements.sectionWorks.missionsWork.mission1,
    lastItemShopInTechActive: '',
    totalPriceInShopTech: '',
    lastModalOpened: '',
}

// Nav Menu Functions
function switchMenuActive(element) {
    if (!element.classList.contains('menu__active')) {
        lets.lastMenuActive.classList.remove('menu__active')
        element.classList.add('menu__active')
        lets.lastMenuActive = element
    }
    switchSectionActive(element)
}

function switchSectionActive(element) {
    const elementActiveId = element.id
    const sectionActive = 'section' + elementActiveId.substring(4)
    const sectionElement = document.getElementById(sectionActive)
    lets.lastSectionActive.classList.replace('sectionsActive', 'sectionsDisabled')
    sectionElement.classList.replace('sectionsDisabled', 'sectionsActive')
    lets.lastSectionActive = sectionElement
    checkAndCloseModal()
}

//Section Tech Functions
function openSectionInTech(element) {
    const elementActiveId = element.id
    const sectionActive = 'section' + elementActiveId.substring(4)
    const sectionElement = document.getElementById(sectionActive)
    if (sectionElement) {
        state.elements.sectionTech.home.classList.replace('sectionsActive', 'sectionsDisabled')
        sectionElement.classList.replace('sectionsDisabled', 'sectionsActive')
    } else {
        console.log('Elemento não existe')
    }
    const backButton = sectionElement.querySelector('.back__button')
    backButton.addEventListener('click', () => {
        sectionElement.classList.replace('sectionsActive', 'sectionsDisabled')
        state.elements.sectionTech.home.classList.replace('sectionsDisabled', 'sectionsActive')
    })
    const sectionTechButton = state.elements.menuItens.tech
    sectionTechButton.addEventListener('click', () => {
        sectionElement.classList.replace('sectionsActive', 'sectionsDisabled')
        state.elements.sectionTech.home.classList.replace('sectionsDisabled', 'sectionsActive')
    })
}

// Section Work Functions
function accordionWorkMissions(element) {
    if (!element.classList.contains('accordion__active')) {
        lets.lastMissionWorkAccordionActive.classList.remove('accordion__active')
        element.classList.add('accordion__active')
        lets.lastMissionWorkAccordionActive = element
    } else {
        lets.lastMissionWorkAccordionActive.classList.remove('accordion__active')
    }
}

function openModalEarlyWorks(element) {
    const elementActiveId = element.id
    lets.lastModalOpened = elementActiveId
    const modalActive = 'modal' + elementActiveId.substring(4)
    const modalElement = document.getElementById(modalActive)
    modalElement.classList.add('modal__active')
    closeModalEarlyWorks(modalElement, elementActiveId)

    if (modalActive === 'modalAssist') {
        modalAssistFunctions.openMenuItem()
    }
}

function closeModalEarlyWorks(modalElement, elementActiveId) {
    const closeButton = modalElement.querySelector('.close__modal__button')
    closeButton.addEventListener('click', checkAndCloseModal)
}

function checkAndCloseModal() {
    if (lets.lastModalOpened !== '') {
        if (lets.lastModalOpened === 'workInstall') {
            modalInstallFunctions.closeModalInstall(state) 
        } else if (lets.lastModalOpened === 'workAssist') {
            modalAssistFunctions.closeModalAndResetItens()
        } else {
            const modalOpened = document.getElementById('modal' + lets.lastModalOpened.substring(4))
            modalOpened.classList.remove('modal__active')
        }
    }
}

// Nav Menu EventListener
for (const menuItem in state.elements.menuItens) {
    if (Object.hasOwnProperty.call(state.elements.menuItens, menuItem)) {
        const element = state.elements.menuItens[menuItem];
        element.addEventListener('click', () => switchMenuActive(element))
    }
}

// Section Tech EventListener
for (const techItem in state.elements.sectionTech.menu) {
    if (Object.hasOwnProperty.call(state.elements.sectionTech.menu, techItem)) {
        const element = state.elements.sectionTech.menu[techItem];
        element.addEventListener('click', () => openSectionInTech(element))
    }
}
    // Section Shop in Tech EventListener
    for (const shopItem in state.elements.sectionTech.shop.shopCategories) {
        if (Object.hasOwnProperty.call(state.elements.sectionTech.shop.shopCategories, shopItem)) {
            const element = state.elements.sectionTech.shop.shopCategories[shopItem];
            element.addEventListener('click', () => sectionShopFunctions.openShopInTech(state, lets, element))
       }
    }

    document.addEventListener('DOMContentLoaded', () => sectionShopFunctions.distributeSalesItemsByCategory(state, lets))
    
    state.elements.sectionTech.shop.cartShopIconMenu.addEventListener('click', () => {
        sectionShopFunctions.openCartShopTable(state, lets)
    })

// Section Work EventListener
for (const accordionItem in state.elements.sectionWorks.missionsWork) {
    if (Object.hasOwnProperty.call(state.elements.sectionWorks.missionsWork, accordionItem)) {
        const element = state.elements.sectionWorks.missionsWork[accordionItem];
        element.addEventListener('click', () => accordionWorkMissions(element))
    }
}

for (const work in state.elements.sectionWorks.earlyWorks) {
    if (Object.hasOwnProperty.call(state.elements.sectionWorks.earlyWorks, work)) {
        const element = state.elements.sectionWorks.earlyWorks[work];
        if (!element.dataset.listenerAdded) {
            element.addEventListener('click', () => openModalEarlyWorks(element))
            element.dataset.listenerAdded = true
        }
    }
}

    // Modal Install EventListener
    state.elements.sectionWorks.modalInstallElements.formForInstall.addEventListener('change', () => modalInstallFunctions.revealSelectsInModalInstall(state))

export default {
    state,
    lets,
}