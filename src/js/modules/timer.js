function timer(id, deadline) {
  // Timer
  const getTimeRemaining = (endtime) => {
    const remainsMs = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(remainsMs / (1000 * 60 * 60 * 24)),
          hours = Math.floor(remainsMs / (1000 * 60 * 60) % 24),
          minutes = Math.floor(remainsMs / (1000 * 60) % 60),
          seconds = Math.floor(remainsMs / 1000 % 60);

    return {
      'total': remainsMs,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const addZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');

    const updateClock = () => {
      const remainsArr = getTimeRemaining(endtime);

      days.innerHTML = addZero(remainsArr.days);
      hours.innerHTML = addZero(remainsArr.hours);
      minutes.innerHTML = addZero(remainsArr.minutes);
      seconds.innerHTML = addZero(remainsArr.seconds);

      if (remainsArr.total <= 0) {
        clearInterval(timerInterval);
      }
    };

    updateClock();

    const timerInterval = setInterval(updateClock, 1000);
  };
  
  setClock(id, deadline);
}

export default timer;