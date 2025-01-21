import iziToast from 'izitoast';

const promiseForm = document.querySelector('.form');

const onBtnClick = (shouldResolve, inputDelay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('result');
      } else {
        reject('error');
      }
    }, inputDelay);
  });
};

const resultFn = inputDelay => {
  iziToast.show({
    message: `✅ Fulfilled promise in ${inputDelay}ms`,
    messageColor: '#ffffff',
    messageSize: '16px',
    backgroundColor: '#59a10d',
    position: 'topRight',
    progressBarColor: '#326101',
    close: false,
  });
};

const rejectFn = inputDelay => {
  iziToast.show({
    message: `❌ Rejected promise in ${inputDelay}ms`,
    messageColor: '#ffffff',
    messageSize: '16px',
    backgroundColor: '#ef4040',
    position: 'topRight',
    progressBarColor: '#b51b1b',
    close: false,
  });
};

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  const radioValue = event.target.elements.state.value;
  const inputDelay = event.target.elements.delay.value;
  let shouldResolve;

  if (radioValue === 'fulfilled') {
    shouldResolve = true;
  } else {
    shouldResolve = false;
  }

  onBtnClick(shouldResolve, inputDelay)
    .then(result => resultFn(inputDelay))
    .catch(error => rejectFn(inputDelay));

  promiseForm.reset();
});
