// Select DOM elements
const timeAndDateSection = document.querySelector(".time-wrapper");

// Time and date API address
const timeAndDateAPI = "https://kaaryar0506reactblog.liara.run/current/time";

// Receiving data from the API and pass them to DOM
const fetchTimeAndDate = async () => {
  try {
    const response = await fetch(timeAndDateAPI);
    const data = await response.json();
    renderTimeAndDate(data);
  } catch (error) {
    console.log(error);
    timeAndDateSection.innerHTML =
      '<p class="time-weather-error">متاسفانه در حال حاضر اطلاعات مربوط به زمان و تقویم در دسترس نمی‌باشد 😟</p>';
  }
};

// Render received date and time data for the DOM
function renderTimeAndDate(data) {
  const {
    current,
    shamsi: { dayInMonth: shamsiDay, month: shamsiMonth },
    islamicHijri: {
      dayInMonth: hijriDay,
      month: hijriMonth,
      year: hijriYearFull,
    },
    miladi: {
      dayInMonth: christianDay,
      month: christianMonthFull,
      year: christianYear,
    },
  } = data;

  // Implement required changes to the data before rendering
  const timeZoneOffsetInMS = new Date().getTimezoneOffset() * 60000;
  const currentTimeZone = current - timeZoneOffsetInMS;
  const christianMonth = christianMonthFull.substring(0, 3);
  const hijriYear = hijriYearFull.substring(0, 4);

  timeAndDateSection.innerHTML = `
                                <h2 class="time-digits d-flex">${msToTime(
                                  currentTimeZone
                                )}</h2>
                                <span class="date-shamsi">${shamsiDay} ${shamsiMonth}</span>
                                <div class="date-other-calendar-wrapper d-flex">
                                    <span class="date-hijri">${hijriDay}/${hijriMonth}/${hijriYear}</span>
                                    <span class="time-vertical-bar"></span>
                                    <div class="date-christian">${christianYear}/${christianMonth}/${christianDay}</div>
                                </div>
                                <div class="timer-praying-timetable-wrapper d-flex">
                                    <select name="timer" class="timer">
                                      <option value="تایمر">تایمر</option>
                                    </select>
                                    <select name="oghat" class="praying-timetable">
                                      <option value="oghat">اوقات شرعی</option>
                                    </select>
                                </div>`;
}

// Convert time from milliseconds to hour and minute
function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60);
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

setTimeout(fetchTimeAndDate, 0); // Execute the function as the page loads
// setInterval(fetchTimeAndDate, 1000); // Refresh time and date data every second
