import axios from "axios"
import express from "express"
import bodyParser from "body-parser"

import * as middleware from "./middleware"

const app = express()

const YOUTH_CULTURE = 'CAER07ZBL'

const GREETINGS = [
    "let's obtain this grain",
    "let's land this loaf",
    "let's bag this baguette",
    "let's cop this crust",
    "let's yeet this wheat",
    "let's take this toast",
    "let's get this scone",
]

const DEPARTURES = [
    'bounced',
    'is canceled'
]

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(middleware.validateSlackRequest)

app.post("/member", async (request, response, next) => {
    const { event } = request.body

    if (event.channel == YOUTH_CULTURE){
        if(event.type == "member_left_channel"){
            const randomDeparture = DEPARTURES[Math.floor(Math.random()*DEPARTURES.length)];
            axios.post('https://hooks.slack.com/services/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', {
                "text": `<@${event.user}> ${randomDeparture}`
            })
        } else if(event.type == "member_joined_channel"){
            const randomGreeting = GREETINGS[Math.floor(Math.random()*GREETINGS.length)];
            axios.post('https://hooks.slack.com/services/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', {
                "text": `Welcome <@${event.user}>, ${randomGreeting}`
            })
        }
    }
    return response.sendStatus(200)
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

export default app
