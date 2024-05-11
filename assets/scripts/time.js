import modalAssistFunctions from "./sectionWorks/modalAssistFunctions.js"

const advanceTimeButton = document.getElementById('advanceTimeButton')
advanceTimeButton.addEventListener('click', changeTime)
modalAssistFunctions.generateNewAssistInstallItem()

function changeTime() {
    modalAssistFunctions.generateNewAssistInstallItem()
}


export default {
    changeTime,
}