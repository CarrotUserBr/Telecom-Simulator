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
}

function activeAcorddionForTable() {
    const tableNameCustomer = Array.from(document.querySelectorAll('.list__assist__name__customer'))
    tableNameCustomer.forEach(element => {
        element.addEventListener('click', () => {
            const idItemList = element.classList[1].split('-')[1]
            const itensToOpen = Array.from(document.querySelectorAll(`.list__assist__item__info-${idItemList}`))
            itensToOpen.forEach(element => {
                element.style.display = 'table-row'
            })
        })
    })
}

export default {

    openMenuItem,
    activeAcorddionForTable,
}