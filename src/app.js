const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3000

const viewDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(path.join(__dirname,'../public')))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name: 'Suresh'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me!',
        name: 'Suresh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Me',
        name: 'Suresh'
    })
})


app.get('/weather', (req, res)=> {

    if (!req.query.address) {
        return res.send({
            error : "No address query parameter found"
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} ={})=> {
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude, 'f', (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                })
            }
    
            return res.send({
                location,
                forecast : forecastData,
                address
            })
           
        })
    })
})

app.get('/help/*', (req, res)=> {
    res.render('error', {
        title : 'Page not found',
        name : 'Suresh',
        error : 'Help page not found'
    })
})

app.get('*', (req, res)=> {
    res.render('error', {
        title : 'Page not found',
        name : 'Suresh',
        error : 'Page not found'
    })
})


app.listen(port, ()=> {
    console.log ('Server is running on port ' + port)
})