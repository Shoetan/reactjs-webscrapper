/* 
* Build a mini backend to scrape the data from any give website start by importing the needed libraries
 */

const express = require('express');
const app = express()
const PORT = 8080
const axios = require('axios')
const cheerio = require('cheerio')

const website = 'https://news.sky.com'

let content =[]

const scraper = (url)=>{

    try {
        axios.get(url).
        then((res) =>{
            const html = res.data
            const $ = cheerio.load(html)
            $('.sdc-site-tile__headline', html).each(function () {
                const title = $(this).text()
                const url = $(this).find('a').attr('href')

                content.push({
                    title,
                    url,
                })
            })
        })
    } catch (error) {
       console.log(error, error.message); 
    }
}


app.get('/', (req,res) =>{
    scraper(website)
    res.json(content)
}
)


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})