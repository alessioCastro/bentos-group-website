const businessHours = {
  timezone: "America/New_York",
  days: [
    { name: "Sunday",    hours: null },
    { name: "Monday",    hours: [8, 18] },
    { name: "Tuesday",   hours: [8, 18] },
    { name: "Wednesday", hours: [8, 18] },
    { name: "Thursday",  hours: [8, 18] },
    { name: "Friday",    hours: [8, 18] },
    { name: "Saturday",  hours: [9, 16] }
  ],
  messages: {
    nextOpening: {
      today: "Opens today at",
      tomorrow: "Opens tomorrow at",
      weekday: "Opens on",
      none: "Closed for the week"
    },
    status: {
      open: "Open Now",
      closed: "Closed Now"
    }
  },
  colors: {
    open: "lawngreen",
    closed: "red"
  }
}

export { businessHours };