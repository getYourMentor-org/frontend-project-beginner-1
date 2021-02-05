let root = document.documentElement
export function darkTheme(){
    root.style.setProperty('--primary-text', '#fafafa')
    root.style.setProperty('--secondary-text', '#8899a6')
    root.style.setProperty('--primary-bg', '#15202b')
    root.style.setProperty('--secondary-bg', '#253341')
    root.style.setProperty('--tertiary-bg', '#1a2b38')
   
}

export function lightTheme(){
    root.style.setProperty('--primary-text', '#000')
    root.style.setProperty('--secondary-text', '#666')
    root.style.setProperty('--primary-bg', '#fff')
    root.style.setProperty('--secondary-bg', '#f7f9fa')
    root.style.setProperty('--tertiary-bg', '#e0f3ff')
}