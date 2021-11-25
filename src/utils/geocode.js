const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2duYW5hc2VrYXJhbiIsImEiOiJja3c4ZGhuNWM5eGd6MnVzMXZjcDMxNXljIn0.hzIZ3YEz2pxyqpZdH2gjuw&limit=1'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unabke to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location', undefined)

        } else {
            const data = body.features[0]

            callback(undefined, {
                location : data.place_name, 
                longitude : data.center[0], 
                latitude : data.center[1] 
            })
        }   

    })
}

module.exports = geocode
