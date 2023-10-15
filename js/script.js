import {movies} from './db.js'
import {reload, reload_genres} from './functions.js'

let dok = document.querySelector('.promo__interactive-list')
let ul_genres = document.querySelector('.promo__menu-list ul')
let searchInput = document.querySelector('#search')
let promo_bg = document.querySelector('.promo__bg')
let imgs = document.querySelectorAll('.promo__adv img')
imgs.forEach((img) => {
    img.remove()
})


let genres = movies.map(item => item.Genre)  
genres = ['All',...new Set(genres)]

reload(movies, dok)
reload_genres(genres, ul_genres)


export function setMovie(item) {
    promo_bg.style.background = `url(${item.Poster}) center center/cover no-repeat`
}

searchInput.onkeyup = () => {
    let val = searchInput.value.toLowerCase().trim()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase().trim()

        if(title.includes(val)) {
            return item
        }
    })

    reload(filtered, dok)
}