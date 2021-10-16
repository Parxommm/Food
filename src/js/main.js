/*jshint esversion: 6 */

window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

  tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();


  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  const deadline = '2021-12-31';

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
  
  setClock('.timer', deadline);

});

