
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/'
}

const removeCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

const acceptCookies = () => {
    setCookie('google-maps-cookies', 'true', 365)
    hideBanner()
}

const declineCookies = () => {
    removeCookie('google-maps-cookies')
    hideBanner()
}

const hideBanner = () => {
    const banner = document.getElementById('cookie-banner')
    banner.style.display = 'none'
}

document.getElementById('cookie-accept').addEventListener('click', acceptCookies)
document.getElementById('cookie-decline').addEventListener('click', declineCookies)

