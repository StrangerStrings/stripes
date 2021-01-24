let debouncing = false;
const debouncer = (ms) => {
    debouncing = true
    setTimeout(() => {debouncing = false}, ms)
}

const reparsed = (col) => 'rgb(' + col.join(', ') + ')'

const colA = getComputedStyle(document.querySelector('.stripe-a')).backgroundColor
const colorA = colA.split('(')[1].split(')')[0].split(', ')

const colB = getComputedStyle(document.querySelector('.stripe-b')).backgroundColor
const colorB = colB.split('(')[1].split(')')[0].split(', ')

const colC = getComputedStyle(document.querySelector('.stripe-c')).backgroundColor
const colorC = colC.split('(')[1].split(')')[0].split(', ')

const stripes = document.querySelectorAll('.container > div')
const stripesA = document.querySelectorAll('.stripe-a')
const stripesB = document.querySelectorAll('.stripe-b')
const stripesC = document.querySelectorAll('.stripe-c')

// keep your finger/mouse moving for any kind of smoothness
document.addEventListener('mousemove', (event) => {
    if (debouncing) return
    else debouncer(150)

    const container = document.querySelector('.container')

    // size
    const mouseXPercent = event.screenX / container.clientWidth * 100
    
    for (let i = 0; i < stripes.length; i++) {
        const stripePercent = (i+.5) / stripes.length * 100
        stripes[i].style.flexGrow = (Math.abs(mouseXPercent - (stripePercent)))
    }

    // colour
    const mouseYBicent = event.screenY / container.clientHeight * 256

    const colourA = [...colorA]
    colourA[0] = parseInt(colourA[0]) + (128 - mouseYBicent)
    for (let i = 0; i < stripesA.length; i++) {
        stripesA[i].style.backgroundColor = reparsed(colourA)
    }
    
    const colourB = [...colorB]
    colourB[2] = parseInt(colourB[2]) + (128 - mouseYBicent)
    for (let i = 0; i < stripesB.length; i++) {
        stripesB[i].style.backgroundColor = reparsed(colourB)
    }

    const colourC = [...colorC]
    colourC[1] = parseInt(colourC[2]) - (128 - mouseYBicent)
    for (let i = 0; i < stripesC.length; i++) {
        stripesC[i].style.backgroundColor = reparsed(colourC)
    }
})
