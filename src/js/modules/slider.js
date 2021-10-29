function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
  // Slider
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slideField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slides.forEach( slide => {
    slide.style.width = width;
  });

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');

  slider.style.position = 'relative';
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);
    dots.push(dot);
  }

  slideField.style.width = 100 * slides.length + '%';
  slideField.style.display = 'flex';
  slideField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  const transformSlide = () => {
    slideField.style.transform = `translateX(-${offset}px)`;
  };

  const checkSlidesCount = () => {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  };

  const changeDotsOpacity = () => {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
  };

  const deleteNotDigits = (str) => +str.replace(/\D/g, '');

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    transformSlide();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    checkSlidesCount();

    changeDotsOpacity();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    transformSlide();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    checkSlidesCount();

    changeDotsOpacity();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      transformSlide();

      checkSlidesCount();

      changeDotsOpacity();
    });
  });
}

export default slider;