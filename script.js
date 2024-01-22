
const menu = document.querySelector('.main-menu');
const hero = document.querySelector('.hero');

const debounce = (func, delay, immediate) => { // Immediate: should the func run before or after the timeout?
    let timeoutId // Id of the current timout get stored here

    return function (...args) { // The args are the args from the passed func, NOT from the debounce func
        if (immediate && !timeoutId) func(...args) // Run func immediately if immediate is true AND no timerId (timerId must be undefined og null to be read as false)

        if (timeoutId) clearTimeout(timeoutId) // If the timeout is running, we clear it...
        // ...and start it over again:
        timeoutId = setTimeout(() => { // Set a new timout
            if (!immediate) func(...args) // The func runs ONLY after a timeout has COMPLETED. If we click before it is complete, the timeout will start over again
            timeoutId = null // Erase any Id, so we allow the immediate version to run
        }, delay) // Timeout lasts as long as the delay val
    };
}

const checkShrink = () => {
    const { bottom } = hero.getBoundingClientRect();
    const { innerHeight } = window;

    if (bottom < (innerHeight * 0.8)) {
        if (menu.classList.contains('shrink')) {
            return
        } else {
            menu.classList.add('shrink');
        }
    } else {
        menu.classList.remove('shrink')
    }
}

window.addEventListener('scroll', debounce(checkShrink, 15, true));
