



interface CheckScrollbars {
    horizontal: boolean
    vertical: boolean
}


const THRESHOLD = 3


export const checkScrollbars = (): CheckScrollbars => {

    const div: HTMLElement = document.body
    const { scrollWidth, clientWidth, scrollHeight, clientHeight } = div

    const horizontal: boolean = (scrollWidth - clientWidth > THRESHOLD)
    const vertical: boolean = (scrollHeight - clientHeight > THRESHOLD)


    return {
        horizontal,
        vertical
    }
}






export const getScrollbarWidth = (): number => {

    const outer: HTMLDivElement = document.createElement('div')

    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'

    document.body.appendChild(outer)


    const inner: HTMLDivElement = document.createElement('div')

    outer.appendChild(inner)


    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth)

    outer.parentNode && outer.parentNode.removeChild(outer)


    return scrollbarWidth

}
