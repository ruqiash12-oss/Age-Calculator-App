const yearsElement = document.querySelector('.js-years span');
const monthsElement = document.querySelector('.js-months span');
const daysElement = document.querySelector('.js-days span');
const button = document.querySelector('.calculate-btn');

const dayInputGroup = document.querySelector('.day-input');
const monthInputGroup = document.querySelector('.month-input');
const yearInputGroup = document.querySelector('.year-input');

const dayInput = document.querySelector('.day-input input');
const monthInput = document.querySelector('.month-input input');
const yearInput = document.querySelector('.year-input input');

const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');

function clearAgeStyles() {
  [yearsElement, monthsElement, daysElement].forEach((el) => {
    el.classList.remove('is-result', 'is-error');
  });
}

function setAgeResultStyles() {
  clearAgeStyles();
  [yearsElement, monthsElement, daysElement].forEach((el) => el.classList.add('is-result'));
}

function setAgeErrorStyles() {
  clearAgeStyles();
  [yearsElement, monthsElement, daysElement].forEach((el) => el.classList.add('is-error'));
}

function setOutputEmpty(initial = false) {
  yearsElement.textContent = '--';
  monthsElement.textContent = '--';
  daysElement.textContent = '--';

  if (initial) {
    clearAgeStyles();
  } else {
    setAgeErrorStyles();
  }
}

function setOutputResult(y, m, d) {
  yearsElement.textContent = y;
  monthsElement.textContent = m;
  daysElement.textContent = d;
  setAgeResultStyles();
}

function clearErrors() {
  dayError.textContent = '';
  monthError.textContent = '';
  yearError.textContent = '';
}

function clearErrorStyles() {
  dayInputGroup.classList.remove('field-error');
  monthInputGroup.classList.remove('field-error');
  yearInputGroup.classList.remove('field-error');
}

function makeAllRed() {
  dayInputGroup.classList.add('field-error');
  monthInputGroup.classList.add('field-error');
  yearInputGroup.classList.add('field-error');
}

function isValidDateParts(year, month, day) {
  const dt = new Date(year, month - 1, day);
  return dt.getFullYear() === year && dt.getMonth() === month - 1 && dt.getDate() === day;
}

function validateInputs() {
  clearErrors();
  clearErrorStyles();

  const dayValue = dayInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();

  let ok = true;

  if (dayValue === '') {
    dayError.textContent = 'This field is required';
    ok = false;
  }
  if (monthValue === '') {
    monthError.textContent = 'This field is required';
    ok = false;
  }
  if (yearValue === '') {
    yearError.textContent = 'This field is required';
    ok = false;
  }

  if (!ok) {
    makeAllRed();
    return { ok: false };
  }

  const day = Number(dayValue);
  const month = Number(monthValue);
  const year = Number(yearValue);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    dayError.textContent = 'Must be a valid day';
    ok = false;
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    monthError.textContent = 'Must be a valid month';
    ok = false;
  }

  const currentYear = new Date().getFullYear();

  if (!Number.isInteger(year) || year < 1900) {
    yearError.textContent = 'Must be a valid year';
    ok = false;
  } else if (year > currentYear) {
    yearError.textContent = 'Must be in the past';
    ok = false;
  }

  if (!ok) {
    makeAllRed();
    return { ok: false };
  }

  if (!isValidDateParts(year, month, day)) {
    dayError.textContent = 'Must be a valid date';
    monthError.textContent = '';
    yearError.textContent = '';
    makeAllRed();
    return { ok: false };
  }

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  if (birthDate > now) {
    yearError.textContent = 'Must be in the past';
    makeAllRed();
    return { ok: false };
  }

  return { ok: true, day, month, year };
}

function calculateAge(year, month, day) {
  const now = new Date();
  const birthDate = new Date(year, month - 1, day);

  let ageYears = now.getFullYear() - birthDate.getFullYear();
  let ageMonths = now.getMonth() - birthDate.getMonth();
  let ageDays = now.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    ageDays += daysInPrevMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  setOutputResult(ageYears, ageMonths, ageDays);
}

setOutputEmpty(true);

button.addEventListener('click', (e) => {
  e.preventDefault();

  const v = validateInputs();
  if (!v.ok) {
    setOutputEmpty(false);
    return;
  }

  calculateAge(v.year, v.month, v.day);
});