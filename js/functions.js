import { movies } from "./db.js"
import { setMovie } from "./script.js"
let promo = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo_genre = document.querySelector('.promo__genre')
let promo_title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let promo__content = document.querySelector('.promo__ratings').firstElementChild
let promo__content2 = document.querySelector('.promo__ratings').lastElementChild
export function reload(arr) {
    promo.innerHTML = ""

    if (arr.length === 0) {
        setMovie({ Poster: './img/bg.jpg' })
    }

    for (let item of arr) {
        let ul1 = document.createElement('li')
        let del = document.createElement('div')

        ul1.classList.add('promo__interactive-item')
        del.classList.add('delete')

        ul1.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`

        ul1.append(del)
        promo.append(ul1)
        ul1.onclick = () => {
            promo_genre.innerHTML = item.Genre
            promo_title.innerHTML = item.Title
            promo__descr.innerHTML = item.Awards
            promo__content.innerHTML = `IMDb: ${item.imdbRating}`
            promo__content2.innerHTML = `IMDb: ${item.Metascore}`
            promo__bg.style.backgroundImage = `url("${item.Poster}")`
            setMovie(item)
        }
        del.onclick = () => {
            let idx = arr.indexOf(item)
            arr.splice(idx, 1)
            reload(arr)

        }

    }
}
let gen = document.querySelector('.promo__menu-list')

export function reload_genres(arr) {
    gen.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        a.classList.add('promo__menu-item')
        a.href = '#'
        a.innerHTML = item

        li.append(a)
        gen.append(li)

        if (arr.indexOf(item) === 0) {
            a.classList.add('promo__menu-item_active')
        }
        li.onclick = () => {
            gen.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))
            li.firstChild.classList.add('promo__menu-item_active')
            let filt_movies = movies.filter(el => {
                let gender_arr = el.Genre
                if (item === gender_arr) {
                    return el
                } else if (item === 'All') {
                    reload(movies)
                }
            })
            reload(filt_movies)
            console.log(filt_movies);
        }

    }
}