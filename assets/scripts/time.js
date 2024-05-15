import modalAssistFunctions from "./sectionWorks/modalAssistFunctions.js"

const advanceTimeButton = document.getElementById('advanceTimeButton')
advanceTimeButton.addEventListener('click', changeTime)
modalAssistFunctions.generateNewAssistInstallItem()
modalAssistFunctions.printNumberOfAssistsInAlert()

function changeTime() {
    modalAssistFunctions.generateNewAssistInstallItem()
    modalAssistFunctions.printNumberOfAssistsInAlert()
}


export default {
    changeTime,
}