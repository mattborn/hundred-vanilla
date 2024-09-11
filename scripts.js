const g = document.getElementById.bind(document)

/* dark mode */
const html = document.documentElement
const THEME_KEY = 'hundred-theme'

const setTheme = isDark => {
  html.classList.toggle('dark', isDark)
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
}
const switchTheme = () => setTheme(!html.classList.contains('dark'))
g('switch-theme').addEventListener('click', e => switchTheme())

const storedTheme = localStorage.getItem(THEME_KEY)
if (storedTheme) setTheme(storedTheme === 'dark')
else if (matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true)

const underlay = g('underlay')
document.addEventListener('keydown', e => {
  if (e.key === 'd') switchTheme()
  if (e.key === 'v' && html.classList.contains('dark')) {
    underlay.classList.toggle('active')
    if (underlay.classList.contains('active')) underlay.play()
    else underlay.pause()
  }
})

// Fetch and display cards
fetch('moona.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const asset = document.createElement('div')
      asset.className = 'moona-asset'
      asset.innerHTML = `
        <div class="moona-asset-top">
          <div class="badge">${item.type}</div>
          <div class="badge">${item.status}</div>
        </div>
        <h2>${item.codename}</h2>
        <p>${item.note}</p>
        ${item.url ? `<a href="${item.url}" target="_blank">${item.url}</a>` : ''}
      `
      g('moona-assets').appendChild(asset)
    })
  })
  .catch(error => console.error('Error fetching data:', error))

document.querySelectorAll('.switch').forEach(button => {
  button.setAttribute('role', 'switch')

  button.addEventListener('click', () => {
    const checked = button.getAttribute('aria-checked') === 'true'
    button.setAttribute('aria-checked', String(!checked))
  })
})
