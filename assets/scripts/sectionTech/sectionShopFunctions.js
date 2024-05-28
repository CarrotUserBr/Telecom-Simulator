import sectionInventoryFunctions from "./sectionInventoryFunctions.js"
import money from "../money.js";

const dates = {
    model: {
        id: '',
        type:'' ,
        brand:'' ,
        model:'' ,
        quality: '★ ☆ ' ,
        price: .00,
    },
    id1: {
        id: '1',
        type:'Antena' ,
        brand:'Microtech' ,
        model:'NB912-2.4Ghz' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 100.00,
    },
    id2: {
        id: '2',
        type:'Antena' ,
        brand:'Intelsil' ,
        model:'MOW5800' ,
        quality: '★ ★ ☆ ☆ ☆' ,
        price: 250.00,
    },
    id3: {
        id: '3',
        type:'Antena' ,
        brand:'Ubiquitec' ,
        model:'MicroStation Loco M5' ,
        quality: '★ ★ ★ ☆ ☆' ,
        price: 350.00,
    },
    id4: {
        id: '4',
        type:'Antena' ,
        brand:'Ubiquitec' ,
        model:'AeroGridM5' ,
        quality: '★ ★ ★ ☆ ☆' ,
        price: 350.00,
    },
    id5: {
        id: '5',
        type:'Roteador' ,
        brand:'Multiray' ,
        model:'ER058' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 80.00,
    },
    id6: {
        id: '6',
        type:'Roteador' ,
        brand:'Intelsil' ,
        model:'RNW150' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 100.00,
    },
    id7: {
        id: '7',
        type:'Roteador' ,
        brand:'S-Link' ,
        model:'DRI524' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 120.00,
    },
    id8: {
        id: '8',
        type:'Roteador' ,
        brand:'Marksys' ,
        model:'WM301R' ,
        quality: '★ ★ ☆ ☆ ☆' ,
        price: 150.00,
    },
    id9: {
        id: '9',
        type:'Roteador' ,
        brand:'Top-Link' ,
        model:'RN-WT740L' ,
        quality: '★ ★ ☆ ☆ ☆' ,
        price: 180.00,
    },
    id10: {
        id: '10',
        type:'Roteador' ,
        brand:'Intelsil' ,
        model:'RK 301F' ,
        quality: '★ ★ ★ ☆ ☆' ,
        price: 200.00,
    },
    id11: {
        id: '11',
        type:'Cabo de Rede' ,
        brand:'EconoLink' ,
        model:'CAT5e 300m' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 180.00,
    },
    id12: {
        id: '12',
        type:'Cabo de Rede' ,
        brand:'BasicNet' ,
        model:'CAT5e 300m' ,
        quality: '★ ★ ☆ ☆ ☆' ,
        price: 225.00,
    },
    id13: {
        id: '13',
        type:'Cabo de Rede' ,
        brand:'ProConnect' ,
        model:'CAT5e 300m' ,
        quality: '★ ★ ★ ☆ ☆' ,
        price: 270.00,
    },
    id14: {
        id: '14',
        type:'Cabo de Rede' ,
        brand:'HighSpeed' ,
        model:'CAT6 300m' ,
        quality: '★ ★ ★ ★ ☆' ,
        price: 360.00,
    },
    id15: {
        id: '15',
        type:'Cabo de Rede' ,
        brand:'PremiumNet' ,
        model:'CAT6 300m' ,
        quality: '★ ★ ★ ★ ★' ,
        price: 450.00,
    },
    id16: {
        id: '16',
        type:'Fonte de Alimentação' ,
        brand:'PowerMax' ,
        model:'Fonte 12V 1A' ,
        quality: '★ ☆ ☆ ☆ ☆' ,
        price: 30.00,
    },
    id17: {
        id: '17',
        type:'Fonte de Alimentação' ,
        brand:'Intelsil' ,
        model:'Fonte 12V 1.5A + Ejetor' ,
        quality: '★ ★ ☆ ☆ ☆' ,
        price: 45.00,
    },
    id18: {
        id: '18',
        type:'Fonte de Alimentação' ,
        brand:'Intelsil' ,
        model:'Fonte 24V 0.5A + Ejetor' ,
        quality: '★ ★ ★ ☆ ☆' ,
        price: 55.00,
    },
    id19: {
        id: '19',
        type:'Fonte de Alimentação' ,
        brand:'Ubiquitec' ,
        model:'Fonte POE 24V 0.5A' ,
        quality: '★ ★ ★ ★ ☆' ,
        price: 70.00,
    },
    id20: {
        id: '20',
        type:'Fonte de Alimentação' ,
        brand:'Ubiquitec' ,
        model:'Fonte POE Gigabit 48V 0.5A' ,
        quality: '★ ★ ★ ★ ★' ,
        price: 90.00,
    },
}

function distributeSalesItemsByCategory(state, lets){
    const datesKeys = Object.keys(dates)
    for (let i = 1; i < datesKeys.length; i++) {
        const key = datesKeys[i];
        const item = dates[key]

        const functionForDistribute = (table) => {
            const tBody= table.querySelector('tbody')
            
            // Criando os elementos: 
            const newTr = document.createElement('tr')
            const tdBrandAndModel = document.createElement('td')
            const tdQuality = document.createElement('td')
            const tdPrice = document.createElement('td')
            const tdBuyButton = document.createElement('td')
            const iForBuyButton = document.createElement('i')
            
            // Atribuindo o conteúdo:
            tdBrandAndModel.textContent = `${item.brand} ${item.model}`
            tdQuality.textContent = `${item.quality}`
            tdPrice.textContent = `$${item.price}`
            
            // Atribuindo classes e id: 
            newTr.id = `itemShop_${item.id}`
            tdBrandAndModel.classList.add('model__item__in__shop__tech')
            tdQuality.classList.add('item__quality')
            tdPrice.classList.add('price__item__in__shop__tech')
            tdBuyButton.classList.add('add__for__cart')
            iForBuyButton.classList.add('bi', 'bi-cart-plus-fill')
            
            // Adicionando os elementos à tabela
            tBody.appendChild(newTr)
            newTr.appendChild(tdBrandAndModel)
            newTr.appendChild(tdQuality)
            newTr.appendChild(tdPrice)
            newTr.appendChild(tdBuyButton)
            tdBuyButton.appendChild(iForBuyButton)
        }
        if (item.type === 'Antena') {
            const table = document.getElementById('tableShopRadios')
            functionForDistribute(table)
        }
        if (item.type === 'Roteador') {
            const table = document.getElementById('tableShopRouters')
            functionForDistribute(table)
        }
        if (item.type === 'Cabo de Rede') {
            const table = document.getElementById('tableShopCables')
            functionForDistribute(table)
        }
        if (item.type === 'Fonte de Alimentação') {
            const table = document.getElementById('tableShopPowerSuplies')
            functionForDistribute(table)
        }       
    }
}

function openShopInTech(state, lets, element) {
    const elementID = element.id
    const tableElement = document.getElementById('table' + elementID.substring(4))
    if (element.classList.contains('item__shop__active')) {
        element.classList.remove('item__shop__active')
        lets.lastItemShopInTechActive = ''
        if (tableElement) {
            tableElement.style.display = 'none'
        }
    } else {
        if (lets.lastItemShopInTechActive) {
            lets.lastItemShopInTechActive.classList.remove('item__shop__active')
            const lastItemId = lets.lastItemShopInTechActive.id
            const lastTable = document.getElementById('table' + lastItemId.substring(4))
            if (lastTable) {
                lastTable.style.display = 'none'
            }
        }
        element.classList.add('item__shop__active')
        if (tableElement) {
            tableElement.style.display = 'table'
            createItemListForCartShop(state, lets, tableElement)
        }
        lets.lastItemShopInTechActive = element
    }
}

function openCartShopTable(state, lets){
    const cartShopMenu = document.querySelector('.cart__shop__menu')
    cartShopMenu.classList.contains('cart__shop__menu__active') ? cartShopMenu.classList.remove('cart__shop__menu__active') : cartShopMenu.classList.add('cart__shop__menu__active')
    calculateTotalPriceInCartShopTable(state, lets)
    const cartShop = document.querySelector('.cart__icon__menu')
    if (!cartShop.dataset.listenerAdded) {
        addItensInInventoryList(state, lets)
        cartShop.dataset.listenerAdded = true
    }
}

function createItemListForCartShop (state, lets, tableElement) {
    const cartList = []

    const addAndRemoveItems = (event) => {
        const buyButton = event.target.closest('.add__for__cart')
        if (buyButton) {
            const element = buyButton.closest('tr')
            const elementIdText = `${element.id}`
            const elementID = elementIdText.split('_')[1]
            const itemInDates = dates['id' + elementID]
            const itemBrandAndModel = `${itemInDates.brand} ${itemInDates.model}`
            const itemPrice = itemInDates.price
            cartList.push({item: itemInDates , brandAndModel: itemBrandAndModel, price: `$${itemPrice}` })
            addItemListInCartShopTable(state, lets, cartList);
            const itemInListCartShop = document.querySelectorAll('.list__item__in__cart__shop__table')
            if (itemInListCartShop) {
                itemInListCartShop.forEach(item => {
                    const removeButton = item.querySelector('.remove__item__list')
                    removeButton.addEventListener('click', () => removeItemListInCartShopTable(state, lets, item))
                });
            }
        }
    }

    const buyButtons = tableElement.querySelectorAll('.add__for__cart')
    buyButtons.forEach(buyButton => {
        if (!buyButton.dataset.listenerAdded) {
            buyButton.addEventListener('click', addAndRemoveItems)
            buyButton.dataset.listenerAdded = true
        }
    })
}

function addItemListInCartShopTable(state, lets, cartList) {
    const listShop = document.getElementById('listShop')
    const itemList = cartList
    for (let i = 0; i < itemList.length; i++) {
        const element = itemList[i]
        itemList.splice(i, 1)
        const trElement = document.createElement('tr')
        trElement.classList.add('list__item__in__cart__shop__table')
        trElement.id = 'listItemCartShop_' + element.item.id
        listShop.appendChild(trElement)
        const tdElementModel = document.createElement('td')
        tdElementModel.classList.add('td__model')
        const tdElementPrice = document.createElement('td')
        tdElementPrice.classList.add('td__price')
        tdElementModel.textContent = element.brandAndModel
        tdElementPrice.textContent = element.price
        trElement.appendChild(tdElementModel)
        trElement.appendChild(tdElementPrice)
        calculateTotalPriceInCartShopTable(state, lets)

        // Create Remove Button
        const tdElementForRemove = document.createElement('td')
        tdElementForRemove.classList.add('remove__item__list')
        trElement.appendChild(tdElementForRemove)
        const icon = document.createElement('i')
        icon.classList.add('bi', 'bi-cart-dash-fill')
        tdElementForRemove.appendChild(icon)
    }
    
}

function removeItemListInCartShopTable(state, lets, element) {
    element.remove()
    calculateTotalPriceInCartShopTable(state, lets)
}

function calculateTotalPriceInCartShopTable(state, lets) {
    const totalPriceElement = document.getElementById('totalPriceShopCartList')
    let totalPrice = parseFloat(0.00)
    const tableElement = state.elements.sectionTech.shop.tableCartShop
    const pricesElements = tableElement.querySelectorAll('.td__price')
    pricesElements.forEach(element => {
        const textContent = element.textContent
        const textSplit = textContent.split('$')
        const price = parseFloat(textSplit[1])
        totalPrice = totalPrice + price
        lets.totalPriceInShopTech = totalPrice
    });

    totalPriceElement.textContent = `$${totalPrice}`
}

function addItensInInventoryList(state, lets) {
    const closeRequest = document.getElementById('closeRequestShopCart')
    const tableElement = state.elements.sectionTech.shop.tableCartShop
    const inventoryList = state.dates.inventoryList

    closeRequest.addEventListener('click', () => {
        const itemList = tableElement.querySelectorAll('.list__item__in__cart__shop__table') 
        itemList.forEach(element => {
            const id = element.id
            const itemId = id.split('_')[1]
            const item = dates['id' + itemId]
            inventoryList.push(item)
        })

        const totalPriceContent = document.getElementById('totalPriceShopCartList').textContent.split('$')
        const totalPrice = parseFloat(totalPriceContent[1])

        const itensInTable = tableElement.querySelectorAll('.list__item__in__cart__shop__table')
        itensInTable.forEach(element => removeItemListInCartShopTable(state, lets, element))
        console.log(totalPrice)
        money.removeMoney(totalPrice)
        sectionInventoryFunctions.addInventoryListInSectionInventory(inventoryList, dates)
    })
}

export default {
    distributeSalesItemsByCategory,
    openShopInTech,
    createItemListForCartShop,
    addItemListInCartShopTable,
    removeItemListInCartShopTable,
    openCartShopTable,
    calculateTotalPriceInCartShopTable,
    addItensInInventoryList,
    dates,
}