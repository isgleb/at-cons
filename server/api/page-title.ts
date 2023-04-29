import {createError, defineEventHandler, getQuery} from "h3";

export default defineEventHandler((event) => {
    const targetUrl = getQuery(event).url

    if (targetUrl && typeof targetUrl === "string") {
        return $fetch<string>(targetUrl)
            .then(data => {
            const openIndex = data.indexOf("<title>") + 7
            const closeIndex = data.indexOf("</title>")

            return { title: data.substring(openIndex, closeIndex) }
            }).catch(e => {
                throw createError({
                statusCode: 400,
                statusMessage: 'request problem' + e.statusMessage,
            })
        })
    } else throw createError({
        statusCode: 400,
        statusMessage: 'url should be a string',
    })
})

