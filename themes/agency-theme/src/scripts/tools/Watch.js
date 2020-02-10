// Observer
const createObserver = (target, handler) => {
  let options = {
    rootMargin: "100px 0px",
    threshold: 0.1
  };

  let observer = new IntersectionObserver(handler, options);
  let targets = document.querySelectorAll(target);
  targets.forEach(target => {
    observer.observe(target);
  })
}

// Handlers
const lazyLoadHandler = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      applyImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}
const animatedHandler = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-animated');
      console.log(entry.target);
    }
  });
}
// Functions
const preLoadImages = (images) => {
  images.forEach(img => {
    let imgSrc = img.dataset.src;
    img.src = imgSrc;
    img.classList.add('js-lazy-img__loaded');
    console.log(imgSrc)
  });
}
const applyImage = (image) => {
  image.src = image.dataset.src;
  image.classList.add('js-lazy-img__loaded');
}

const preLoadAnimations = (targets) => {
  targets.forEach(target => {
    target.classList.add('is-animated');
  })
}
// Observers
if (!('IntersectionObserver' in window)) {
  let images = document.querySelectorAll('.js-lazy-img');
  let toBeAnimated = document.querySelectorAll('.animated');
  preLoadAnimations(toBeAnimated)
  preLoadImages(images);

} else {
  createObserver('.js-lazy-img', lazyLoadHandler);
  createObserver('.animated', animatedHandler);
}
