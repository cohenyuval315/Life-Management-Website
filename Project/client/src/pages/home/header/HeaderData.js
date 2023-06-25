import { Icons} from "../../../assets/index.js";

import MenuDropDown from './MenuDropDown'

const Element = <MenuDropDown/>

export const homePageRightHeadersItems = [
    {
        text:"menu",
        component:Element
    }
]

export const homePageLeftHeadersItems = [
    {
        text:"dice",
        path:"/",
        component:Icons.Dice
    }
]
