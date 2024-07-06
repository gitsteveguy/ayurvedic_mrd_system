
export const setColorThemeLS = (theme)=>{
    window.localStorage.setItem('color_theme',theme)
}
export const getColorThemeLS = ()=>{
    return window.localStorage.getItem('color_theme')
}