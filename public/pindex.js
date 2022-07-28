console.log('Hello world')

const buttonAlert = () => {
    alert(`Get good kid!`)
}

const alertBtn = document.querySelector('#charBtn')
alertBtn.addEventListener('click', buttonAlert)