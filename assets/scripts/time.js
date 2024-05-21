import customersGenerate from "./customers/customersGenerate.js"
import modalAssistFunctions from "./sectionWorks/modalAssistFunctions.js"

const advanceTimeButton = document.getElementById('advanceTimeButton')
advanceTimeButton.addEventListener('click', changeTime)
modalAssistFunctions.generateNewAssistInstallItem()
modalAssistFunctions.printNumberOfAssistsInAlert()

function changeTime() {
    modalAssistFunctions.generateNewAssistInstallItem()
    modalAssistFunctions.printNumberOfAssistsInAlert()
    printTimeInHeader()
    customersGenerate.reduceTimeMaxForInstall()
}

function printTimeInHeader() {
    const year = document.getElementById('year')
    const mounth = document.getElementById('mounth')
    const week = document.getElementById('week')
    let yearNumber = parseInt(year.textContent.split(' ')[1])
    let mounthNumber = parseInt(mounth.textContent.split(' ')[1])
    let weekNumber = parseInt(week.textContent.split(' ')[1])
    weekNumber++
    if (weekNumber > 4) {
        weekNumber = 1
        mounthNumber++
    }
    if (mounthNumber > 12) {
        mounthNumber = 1
        yearNumber++
    }
    year.textContent = `Ano ${yearNumber}`
    mounth.textContent = `Mês ${mounthNumber}`
    week.textContent = `Semana ${weekNumber}`

}

export default {
    changeTime,
    printTimeInHeader,
}