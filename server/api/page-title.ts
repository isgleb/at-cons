import {createError, defineEventHandler, getQuery} from "h3";

export default defineEventHandler((event) => {
    const targetUrl = getQuery(event).url

    if (targetUrl && typeof targetUrl === "string") {
        return $fetch<string>(targetUrl)
            .then(data => {
            const openIndex = data.indexOf("<title>") + 7
            const closeIndex = data.indexOf("</title>")
            return data.substring(openIndex, closeIndex)

            }).catch((err) => {
                // return "hey"
                throw createError({
                statusCode: 400,
                statusMessage: 'page request problem: ' + err,
            })
        })
    } else throw createError({
        statusCode: 400,
        statusMessage: 'url should be a string',
    })
})

