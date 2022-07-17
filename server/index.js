/* 
* Build a mini backend to scrape the data from any give website start by importing the needed libraries
 */

const express = require('express');
const app = express()
const PORT = 8080
const axios = require('axios')
const cheerio = require('cheerio')

const website = 'https://news.sky.com'


/* An array to keep the specified data from the website been scraped */
let content =[]


app.get('/', (req, res) =>{
    try {
        /* Use axios to get the data from the website and it return a html dom */
        axios.get(website).
        then((res) =>{
            const html = res.data
            /* use cheerio to load the html dom so it can be manipulated using the cheerio package */

            const $ = cheerio.load(html)
            /* the classname of sdc-site-title__headline is the target class that resides in the html file */
            $('.sdc-site-tile__headline', html).each(function () {
                
                const title = $(this).text()
                const url = $(this).find('a').attr('href')

                content.push({
                    title,
                    url,
                })

                
            })
        })
    } 
    
    catch (error) {
       console.log(error, error.message); 
    }

    res.json(content)
}

)



app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})