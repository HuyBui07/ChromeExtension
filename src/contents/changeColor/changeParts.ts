import { adjust } from "./utils"

function changeElementColor(color: any) {
  if (!color) {
    undoChangeElementColor()
    return
  }
  const css = generateCSS(color)
  const styleElement = document.createElement("style")
  styleElement.id = "modified-color"
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)
}

function undoChangeElementColor() {
  //Remove the style element
  const styleElement = document.getElementById("modified-color")
  if (styleElement) {
    styleElement.remove()
  }
}

//.dropdown-menu : drop down on user menu top right
//body : general text and links
//.btn-secondary : "Tat ca khoa hoc" button
//.maincalendar .calendarmonth td.today .day-number-circle : change only the highlight of "Hom nay"
//.alert-info : notifications at the start of course list
//.navbar-bootswatch : navbar
//.card : any block in the page
//#region-main : main content
//.popover : hover over calendar
//.region-main-content : main content box

function generateCSS(color: any) {
  return `
    body {
      color: ${color.textColor};
      background-color: ${color.backgroundColor};
    }
    a {
      color: ${color.textColor};
    }
    .dropdown-menu {
      background-color: ${color.backgroundColor};
    }
    .card {
      background-color: ${color.primaryColor};
    }
    .navbar-bootswatch {
      background-color: ${color.primaryColor};
      border-color: ${color.primaryColor};
      border-bottom-color: ${adjust(color.primaryColor, -20)};
    }
    .btn-secondary {
      background-color: ${color.secondaryColor};
      border-color: ${adjust(color.secondaryColor, -20)};
    }
    .maincalendar .calendarmonth td.today .day-number-circle {
      background-color: ${color.primaryColor};
    }
    .alert-info {
      background-color: ${color.accentColor};
      color: white;
    }
   
     #region-main {
      background-color: ${color.primaryColor};
    }
   
   
    .popover {
      background-color: ${color.backgroundColor};
    }
  `
}

export { changeElementColor, undoChangeElementColor }
