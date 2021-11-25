const request = require("request")

const forecast = (latitude, longitude, metric, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=60fb459b87c276a2dc54147caca1cdc4&query='+ latitude+','+longitude+'&units='+metric

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback ('Unable to find the location', undefined)
        } else {
            const data = body.current
         //   console.log(data.weather_descriptions[0], '. It is currently at ', data.temperature, ' degrees out. There is a ', data.precip, '% change of rain' )

            callback(undefined, {
                description : data.weather_descriptions[0],
                temperature: data.temperature,
                precipitation: data.precip

            })
        }
    })
}

module.exports = forecast

