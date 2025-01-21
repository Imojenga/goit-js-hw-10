import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const datePickBtn = document.querySelector('button');
const dateInput = document.querySelector('input');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        progressBarColor: '#b51b1b',
        close: false,
      });
      datePickBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      datePickBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

function start() {
  intervalId = setInterval(() => {
    const ms = userSelectedDate - Date.now();

    if (ms <= 0) {
      stop();
      return;
    }

    days.textContent = addLeadingZero(convertMs(ms).days);
    hours.textContent = addLeadingZero(convertMs(ms).hours);
    minutes.textContent = addLeadingZero(convertMs(ms).minutes);
    seconds.textContent = addLeadingZero(convertMs(ms).seconds);
  }, 1000);

  datePickBtn.disabled = true;
  dateInput.disabled = true;
}

function stop() {
  clearInterval(intervalId);
  dateInput.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

datePickBtn.addEventListener('click', start);
