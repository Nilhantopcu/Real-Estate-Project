const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month);
  
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
  
      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;

        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);

const modal = document.getElementById('appointmentModal');
const estateDropdown = document.getElementById('estateDropdown');
const timeDropdown = document.getElementById('timeDropdown');
const timeInput = document.getElementById('timeInput');

function openModal(date) {
    populateEstateOptions();
    populateCityOptions();
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function submitAppointment() {
  alert('Appointment submitted successfully!');
  closeModal();
}

document.querySelectorAll('.calendar-days div').forEach((day) => {
  day.addEventListener('click', () => {
    const selectedDate = day.innerHTML;
    openModal(selectedDate);
  });
});

const estateOptions = ['16th Street, 324 Halyard Los Angeles ', '52th Avenue, 147 Boutiqe San Francisco', '25th Main Street, 564 Halyard Ocean City', '5th Avenue, 781 Green Ville Chicago', '1st Street, 324 Halyard Ohio', '17th South Avenue, 324 Distrcits Washington','16th Street, 324 Halyard Los Angeles ', '52th Avenue, 147 Boutiqe San Francisco', '25th Main Street, 564 Halyard Ocean City', '5th Avenue, 781 Green Ville Chicago', '1st Street, 324 Halyard Ohio', '17th South Avenue, 324 Distrcits Washington'];

function populateEstateOptions() {
  const estateDropdown = document.getElementById('estateDropdown');
  estateDropdown.innerHTML = '';
  estateOptions.forEach((estate) => {
    const option = document.createElement('option');
    option.value = estate;
    option.textContent = estate;
    estateDropdown.appendChild(option);
  });
}

const cityOptions = ['Los Angeles', 'San Francisco', 'Ocean City', 'Chicago', 'Ohio', 'Washington', 'San Mateo', 'San Jose', 'San Diego', 'San Bruno', 'San Carlos', 'San Leandro', 'San Lorenzo', 'San Rafael', 'San Ramon', 'Santa Ana', 'Santa Barbara', 'Santa Clara', 'Santa Cruz', 'Santa Maria', 'Santa Monica', 'Santa Rosa', 'Santee', 'Saratoga', 'Seaside', 'Simi Valley', 'South Gate', 'South San Francisco', 'Stanton', 'Stockton', 'Sunnyvale', 'Temecula', 'Thousand Oaks', 'Torrance', 'Tracy', 'Tulare', 'Turlock', 'Tustin', 'Union City', 'Upland', 'Vacaville', 'Vallejo', 'Victorville', 'Visalia', 'Vista', 'Walnut Creek', 'Watsonville', 'West Covina', 'West Hollywood', 'West Sacramento', 'Westminster', 'Whittier', 'Woodland', 'Yorba Linda', 'Yuba City', 'Yucaipa', 'Alameda', 'Alhambra', 'Aliso Viejo', 'Anaheim', 'Antioch', 'Apple Valley', 'Arcadia', 'Arden-Arcade', 'Baldwin Park', 'Bell Gardens', 'Bellflower', 'Berkeley', 'Brentwood', 'Buena Park', 'Burbank', 'Camarillo', 'Carlsbad', 'Carson', 'Cathedral City', 'Cerritos', 'Chico', 'Chino', 'Chino Hills', 'Chula Vista', 'Citrus Heights', 'Clovis', 'Colton', 'Compton', 'Concord', 'Corona', 'Costa Mesa', 'Cupertino', 'Daly City', 'Davis', 'Diamond Bar', 'Downey', 'Dublin', 'East Los Angeles', 'Eastvale', 'El Cajon', 'El Centro', 'El Dorado Hills', 'El Monte', 'Elk Grove', 'Encinitas', 'Escondido', 'Fairfield', 'Folsom', 'Fontana', 'Fountain Valley', 'Fremont', 'Fresno', 'Fullerton', 'Garden Grove', 'Gardena', 'Gilroy', 'Glendale', 'Glendora', 'Hanford', 'Hawthorne', 'Hayward', 'Hemet', 'Hesperia', 'Highland', 'Huntington Beach', 'Huntington Park', 'Indio', 'Inglewood', 'Irvine', 'La Habra', 'La Mesa', 'Laguna Niguel', 'Lake Elsinore', 'Lake Forest', 'Lakewood', 'Lancaster', 'Livermore', 'Lodi', 'Long Beach', 'Los Angeles', 'Lynwood', 'Madera', 'Manteca', 'Menifee', 'Merced', 'Milpitas', 'Mission Viejo', 'Modesto', 'Montebello', 'Monterey Park', 'Moreno Valley', 'Mountain View', 'Murrieta', 'Napa', 'National City', 'Newport Beach', 'Norwalk', 'Novato', 'Oakland', 'Oceanside', 'Ontario', 'Orange', 'Oxnard', 'Palm Desert', 'Palm Springs', 'Palmdale', 'Palo Alto', 'Paramount'];
  function populateCityOptions() {
    const cityDropdown = document.getElementById('cityDropdown');
    cityDropdown.innerHTML = '';
  
    cityOptions.forEach((city) => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });
  }
 