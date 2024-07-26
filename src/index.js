import generateJoke from "./jokers"
import './styles/main.scss'
import './styles/fonts.scss'
import devops from './assets/devops.svg'




let im = document.getElementById("mysvg")
im.src = devops
im.style.width= '60px'
im.style.height= '60px'

console.log("ye")
console.log(generateJoke())