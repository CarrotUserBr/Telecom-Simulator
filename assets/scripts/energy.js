let energyToAdd = 100
let maxEnergy = 100

function addEnergy(add, max) {
    const energyCount = document.getElementById('energyCount')
    const energy = parseInt(energyCount.textContent)
    const newEnergy = energy + add
    if (newEnergy < max) {
        if (newEnergy < 10) {
            energyCount.textContent = `00${newEnergy}`
        } else if (newEnergy < 100) {
            energyCount.textContent = `0${newEnergy}`
        } else {
            energyCount.textContent = newEnergy
        }
    } else {
        if (max < 10) {
            energyCount.textContent = `00${max}`
        } else if (max < 100) {
            energyCount.textContent = `0${max}`
        } else {
            energyCount.textContent = max
        }
    }
}

function removeEnergy(remove) {
    const energyCount = document.getElementById('energyCount')
    const energy = parseInt(energyCount.textContent)
    const newEnergy = energy - remove
        if (newEnergy < 10) {
            energyCount.textContent = `00${newEnergy}`
        } else if (newEnergy < 100) {
            energyCount.textContent = `0${newEnergy}`
        } else {
            energyCount.textContent = newEnergy
        }
}

export default {
    energyToAdd,
    maxEnergy,
    addEnergy,
    removeEnergy,
}