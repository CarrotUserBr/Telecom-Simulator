import customersInfos from "./customersInfos.js";

let listCustomer = []

class Customer {
    constructor(id, name, age, gender, wealthLevel, satisfaction, desiredSpeed, difficulty, description) {
        this.id = id;
        this.gender = gender;
        this.name = name;
        this.age = age;
        this.wealthLevel = wealthLevel;
        this.satisfaction = satisfaction;
        this.desiredSpeed = desiredSpeed;
        this.difficulty = difficulty;
        this.description = description;
    }
}

function addListCustomer() {
    listCustomer.push(generateNewCustomer())
    console.log(listCustomer[listCustomer.length - 1])
}

function generateNewCustomer() {
    const id = randomizeId()
    const gender = randomizeGender()
    const name = randomizeName(gender)
    const age = randomizeAge()
    const wealthLevel = ''
    const satisfaction = ''
    const desiredSpeed = ''
    const difficulty = ''
    const description = ''

    return new Customer(id, name, age, gender, wealthLevel, satisfaction, desiredSpeed, difficulty, description)
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
    const isDoubleNames = (randomNumber > 0.5 ? true : false)
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

function randomizeAge() {
    let idade = Math.floor((Math.random() * 52) + 18)
    return idade
}

const button = document.querySelector('.player__img')
button.addEventListener('click', addListCustomer)

export default {
    listCustomer,
    Customer,
    generateNewCustomer,
    randomizeId,
    randomizeGender,
    randomizeName,
    randomizeAge,
}