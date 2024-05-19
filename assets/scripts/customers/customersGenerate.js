import customersInfos from "./customersInfos.js";

let listCustomer = []

class Customer {
    constructor(id, name, age, gender, wealthLevel, satisfaction, desiredSpeed, difficulty, description, valueMaxInstall, valueMaxMensality) {
        this.id = id;
        this.gender = gender;
        this.name = name;
        this.age = age;
        this.wealthLevel = wealthLevel;
        this.satisfaction = satisfaction;
        this.desiredSpeed = desiredSpeed;
        this.difficulty = difficulty;
        this.description = description;
        this.valueMaxInstall = valueMaxInstall;
        this.valueMaxMensality = valueMaxMensality;
    }
}

function addListCustomer() {
    listCustomer.push(generateNewCustomer())
}

function generateNewCustomer() {
    const id = randomizeId()
    const gender = randomizeGender()
    const name = randomizeName(gender)
    const age = Math.floor((Math.random() * 52) + 18)
    const wealthLevel = randomizeWealthLevel()
    const desiredSpeed = ''
    const difficulty = selectDifficulty(wealthLevel)
    const satisfaction = ''
    const description = ''
    const valueMaxInstall = defineValueOfInstallation(wealthLevel)
    const valueMaxMensality = ''

    return new Customer(id, name, age, gender, wealthLevel, satisfaction, desiredSpeed, difficulty, description, valueMaxInstall, valueMaxMensality)
}

function randomizeId() {
    let id = ''
    for (let i = 1; i <= 9; i++) {
        const randonNumber = Math.floor(Math.random() * 9)
        id += randonNumber
    }
    return id
}

function randomizeGender() {
    const randomNumber = Math.random()
    const gender = (randomNumber > 0.5 ? 'Male' : 'Female')
    return gender
}

function randomizeName(gender) {
    const listFirstNames = (gender === 'Male' ? customersInfos.firstNamesMale : customersInfos.firstNamesFemale)
    const listLastNames = customersInfos.lastNames
    let randomNumber = Math.random()
    let name = ''
    const isDoubleNames = (randomNumber > 0.75 ? true : false)
    if (isDoubleNames) {
        for (let i = 1 ; i <= 2; i++) {
            randomNumber = Math.floor(Math.random() * listFirstNames.length)
            name += `${listFirstNames[randomNumber]} `
        }
    } else if (!isDoubleNames) {
        randomNumber = Math.floor(Math.random() * listFirstNames.length)
        name += `${listFirstNames[randomNumber]} `
    }

    for (let i = 1 ; i <= 2; i++) {
        randomNumber = Math.floor(Math.random() * listFirstNames.length)
        name += `${listLastNames[randomNumber]}`
        i === 1? name+= ' ' : name 
    }
    
    return name
}

function randomizeWealthLevel() {
    let wealthLevel = ''
    const randomNumber = Math.random()
    if (randomNumber <= 0.02) {
        wealthLevel = 'F'
    } else if (randomNumber > 0.02 && randomNumber <= 0.1) {
        wealthLevel = 'D'
    } else if (randomNumber > 0.1 && randomNumber <= 0.4) {
        wealthLevel = 'C'
    } else if (randomNumber > 0.4 && randomNumber <= 0.7) {
        wealthLevel = 'B'
    } else if (randomNumber > 0.7 && randomNumber <= 0.9) {
        wealthLevel = 'A'
    } else if (randomNumber > 0.9 && randomNumber <= 1) {
        wealthLevel = 'A+'
    }

    return wealthLevel
}

function selectDifficulty(wealthLevel) {
    let difficulty = ''
    if (wealthLevel === 'F' || wealthLevel === 'D') {
        difficulty = 'Fácil'
    } else if (wealthLevel === 'C') {
        difficulty = 'Média'
    } else if (wealthLevel === 'B') {
        difficulty = 'Media-Alta'
    } else if (wealthLevel === 'A' || wealthLevel === 'A+') {
        difficulty = 'Difícil'
    }

    return difficulty
}

function defineValueOfInstallation(wealthLevel) {
    let valueMaxInstall = ''
    if (wealthLevel === 'A+') {
        valueMaxInstall = Math.floor(1000 - (Math.random() * 100))
    } else if (wealthLevel === 'A') {
        valueMaxInstall = Math.floor(600 - (Math.random() * 100))
    } else if (wealthLevel === 'B') {
        valueMaxInstall = Math.floor(400 - (Math.random() * 100))
    } else if (wealthLevel === 'C') {
        valueMaxInstall = Math.floor(300 - (Math.random() * 100))
    } else if (wealthLevel === 'D') {
        valueMaxInstall = Math.floor(250 - (Math.random() * 50))
    } else if (wealthLevel === 'F') {
        valueMaxInstall = Math.floor(200 - (Math.random() * 50))
    }
    return valueMaxInstall
}

function findCustomerById(id) {
    for (const element of listCustomer){
        if (element.id === id) {
            return element
        }
    }
    return null
}

export default {
    listCustomer,
    Customer,
    addListCustomer,
    generateNewCustomer,
    randomizeId,
    randomizeGender,
    randomizeName,
    randomizeWealthLevel,
    selectDifficulty,
    defineValueOfInstallation,
    findCustomerById,
}