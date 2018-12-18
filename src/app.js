import axios from "axios"
import express from "express"
import bodyParser from "body-parser"

import * as middleware from "./middleware"
import * as routes from "./routes"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(middleware.validateSlackRequest)

app.post("/", async (request, response, next) => {
    let subCommand = request.body.text.split(" ")[0].toLowerCase()

    logger({ request: request.body, type: logger.types.log, route: "/", message: "slash command" })
    if (!VALID_SUB_COMMANDS.includes(subCommand)) {
        subCommand = "help"
    }

    const responseBody = await routes[subCommand](request.body)
    response.json(responseBody)
})

app.get("/ok", (request, response, next) => response.send("Service is running"))

if (process.env.NODE_ENV === "production") {
    // The error handler must be before any other error middleware
    app.use(Sentry.Handlers.errorHandler())
}

export default app