import { adjust } from "./utils"

function changeElementColor(color: any) {
  if (!color) {
    undoChangeElementColor()
    return
  }
  //Remove old style
  const styleElements = document.querySelectorAll("#modified-color")
  styleElements.forEach((el) => {
    el.remove()
  })
  const css = generateCSS(color)
  const styleElement = document.createElement("style")
  styleElement.id = "modified-color"
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)
}

function undoChangeElementColor() {
  const styleElement = document.getElementById("modified-color")
  if (styleElement) {
    styleElement.remove()
  }
}
// GENERAL
//.dropdown-menu : drop down on user menu top right
// .dropdown-item : drop down items
//body : general text and links
//.btn-secondary : "Tat ca khoa hoc" button

//.alert-info : notifications at the start of course list
//.navbar-bootswatch : navbar
//.card : any block in the page
//#region-main : main content

//.region-main-content : main content box

// COURSE SPECIFIC
// .path-mod .activity-header:not:(:empty): course specific site elements.
// .btn-secondary: general buttons. Also modify text

//CALENDAR
//.maincalendar .calendarmonth td.today .day-number-circle : change only the highlight of "Hom nay"
//.popover : hover over calendar
// .calendar_event_course : calendar event specific
// .maincalendar .calendar_event_course : calendar event specific

// TABLES AND STATUS
// .generaltable , .generaltable tbody tr:hover : table elements
// .generaltable thead .sticky-column,.generaltable tbody tr:nth-of-type(even) : table elements
// .path-mod-assign td.submissionnotgraded, .path-mod-assign td.submissionstatussubmitted, .path-mod-assign td.earlysubmission : table elements

// RANDOM MISCELLANEOUS
// a.dimmed,a.dimmed:link,a.dimmed:visited,a.dimmed_text,a.dimmed_text:link,a.dimmed_text:visited,.dimmed_text,.dimmed_text a,.dimmed_text a:link,.dimmed_text a:visited,.usersuspended,.usersuspended a,.usersuspended a:link,.usersuspended a:visited,.dimmed_category,.dimmed_category a : dimmed text (on calendar event)
// .activityiconcontainer.collaboration: "Tin tuc chung" icon on main page
// .calendar_event_site, .calendar_event_category , .calendar_event_group , .calendar_event_user, .calendar_event_other: small icon on "Khoa su kien" section in calendar event site (deadline)
function generateCSS(color: any) {
  return `
    body {
      color: ${color.textColor};
      background-color: ${color.backgroundColor};
    }
    a {
      color: ${color.textColor};
      
      
    }
    a:hover {
      color: ${adjust(color.textColor, -20)};
    }
    .dropdown-menu {
      background-color: ${color.backgroundColor};
    }
    .dropdown-item {
      color: ${color.textColor};
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
     .path-mod .activity-header:not(:empty) {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .btn-secondary {
      background-color: ${color.secondaryColor};
      color: ${color.textColor};
    }
    .generaltable {
      background-color: ${adjust(color.primaryColor, -40)};
      color: ${color.textColor};
    }
    .generaltable tbody tr:hover {
      background-color: ${adjust(color.primaryColor, -20)};
      color: ${color.textColor};
    }
    .generaltable thead .sticky-column,.generaltable tbody tr:nth-of-type(even) {
      background-color: ${adjust(color.primaryColor, -40)};
      color: ${color.textColor};
    }

    .path-mod-assign td.submissionnotgraded {
      background-color: ${adjust(color.successColor, -40)};
      color: ${color.textColor};
    }
    .path-mod-assign td.submissionstatussubmitted {
      background-color: ${adjust(color.successColor, -40)};
      color: ${color.textColor};
    }
    .path-mod-assign td.earlysubmission {
      background-color: ${adjust(color.successColor, -40)};
      color: ${color.textColor};
    }
    a.dimmed,a.dimmed:link,a.dimmed:visited,a.dimmed_text,a.dimmed_text:link,a.dimmed_text:visited,.dimmed_text,.dimmed_text a,.dimmed_text a:link,.dimmed_text a:visited,.usersuspended,.usersuspended a,.usersuspended a:link,.usersuspended a:visited,.dimmed_category,.dimmed_category a {
      color: ${color.textColor};
    }
    .calendar_event_course {
      background-color: ${adjust(color.primaryColor, -40)};
     
    }
    .maincalendar .calendar_event_course {
      border-color: ${adjust(color.primaryColor, -40)};
     
    }
    .activityiconcontainer.collaboration {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .calendar_event_site {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .calendar_event_category {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .calendar_event_group {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .calendar_event_user {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    .calendar_event_other {
      background-color: ${adjust(color.primaryColor, -40)};
    }
    
  `
}

export { changeElementColor, undoChangeElementColor }
