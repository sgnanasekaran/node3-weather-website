console.log ("Hello from Javascript file")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector("#message-1")

const messageTwo = document.querySelector("#message-")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    console.log('Clicked')

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location + " " + data.forecast.description + "  "+ data.forecast.temperature
        }
       
    })

})
})