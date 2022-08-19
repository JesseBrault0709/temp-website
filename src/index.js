/**
 * Converts the given hex color string to a tuple of three colors.
 *
 * @param {string} hex
 * @returns {[number, number, number]} the colors, base 10
 */
const hexToRgb = hex => hex.match(/\w\w/g).map(s => parseInt(s, 16))

/**
 * Formats the given colors/alpha to a string suitable for css.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @returns {string} a css-suitable rgba() string
 */
const formatRgba = (r, g, b, a) => `rgba(${r},${g},${b},${a})`

/**
 * Main
 */
window.addEventListener('load', () => {
    // get elements
    const headshot = document.getElementById('headshot')
    if (headshot === null) {
        throw new Error('#headshot element is null')
    }

    const headers = document.getElementsByTagName('header')
    const header = headers.item(0)
    if (header === null) {
        throw new Error('header element is null.')
    }

    // get css color variables
    const black = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--black')

    const gray = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--gray')

    // calculate the rgb base-10 values
    const [blackR, blackG, blackB] = hexToRgb(black)
    const [grayR, grayG, grayB] = hexToRgb(gray)

    // a function to set the colors of the elements based on current scroll height
    const setColors = () => {
        const headshotScrollPercentage =
            (window.scrollY + header.scrollHeight) / headshot.scrollHeight
        const alpha = Math.min(headshotScrollPercentage, 1)
        header.style.backgroundColor = formatRgba(blackR, blackG, blackB, alpha)
        header.style.borderBottomColor = formatRgba(grayR, grayG, grayB, alpha)
    }

    // do initial before we scroll
    setColors()

    // reset colors when we scroll
    document.addEventListener('scroll', setColors)
})
