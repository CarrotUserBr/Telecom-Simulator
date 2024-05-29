import customersGenerate from "./customers/customersGenerate.js"

function addMoney(add) {
    const moneyCount = document.getElementById('moneyCount')
    const money = parseInt(moneyCount.textContent.split('$')[1])
    const newMoney = money + add
    console.log(newMoney)
    if (newMoney < 10) {
        moneyCount.textContent = `$00${newMoney}`
    } else if (newMoney < 100) {
        moneyCount.textContent = `$0${newMoney}`
    } else {
        moneyCount.textContent = `$${newMoney}`
    }

}

function removeMoney(remove) {
    const moneyCount = document.getElementById('moneyCount')
    const money = parseInt(moneyCount.textContent.split('$')[1])
    const newMoney = parseInt(money - remove)
    if (newMoney < 10) {
        moneyCount.textContent = `$00${newMoney}`
    } else if (newMoney < 100) {
        moneyCount.textContent = `$0${newMoney}`
    } else {
        moneyCount.textContent = `$${newMoney}`
    }
}

function addMoneyOfMensality(){
    const listCustomer = customersGenerate.listCustomer
    const currentWeek = document.getElementById('week').textContent.split(' ')[1]
    for (let i = 0; i < listCustomer.length; i++) {
        const customer = listCustomer[i];
        const weekForPayMensality = customer.weekForPayMensality
        if(weekForPayMensality && weekForPayMensality === currentWeek){
            const valueForMensality = customer.valueForMensality
            addMoney(valueForMensality)
        }
    }

}

export default {
    addMoney,
    removeMoney,
    addMoneyOfMensality
}