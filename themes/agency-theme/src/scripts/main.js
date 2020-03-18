const $mainNav = document.getElementById('nav-links');
const $mainNavToggle = document.getElementById('toggle-nav-links');
const $cookieBar = document.getElementById('cookie-bar');
const $gaAccept = document.getElementById('ga-accept');
const $gaOptout = document.getElementById('ga-optout');
const $eventList = document.getElementById('event-list');

document.addEventListener('DOMContentLoaded', () => {

  if (document.cookie.indexOf('seenCookieBar=true') < 0) {
    $cookieBar.classList.add('is-visible');
  }

  $gaAccept.addEventListener('click', () => {
    $cookieBar.classList.remove('is-visible');
    document.cookie = 'seenCookieBar=true; max-age=2628000; path=/';
  });

  $gaOptout.addEventListener('click', () => {
    $cookieBar.classList.remove('is-visible');
    gaOptout();
  })

  $mainNavToggle.addEventListener('click', () => {
    if ($mainNav.classList.contains('is-open')) {
      $mainNav.classList.remove('is-open');
      $mainNavToggle.innerHTML = 'Menu';
      return false
    }
    $mainNav.classList.add('is-open');
    $mainNavToggle.innerHTML = 'Close';
  });

  const createElement = (type, target) => {
    let node = document.createElement(type);
    return target.appendChild(node);
  }


  fetch('https://fast-eyrie-12998.herokuapp.com/api/strike')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          const spinner = document.querySelector('.loading-spinner');
          const events = data.events;

          if (events) {
            spinner.parentNode.removeChild(spinner);
          }
          events.forEach(event => {
            const { id, start, end, name, url, is_free, published, status } = event;

            // Eventbrite pulls all events regardless of being live or not
            if (!published || status != 'live') {
              return false
            }

            // Create element
            let el = createElement('li', $eventList);
            el.innerHTML = `
              <p><strong>${name.text}</strong></p>
              <div class="event-time">              
                <p><strong>${dayjs(start.local).format('ddd DD MMM')}</strong></p>
                <p>${dayjs(start.local).format('HH:mm')} - ${dayjs(end.local).format('HH:mm')}</p>
              </div>
              <p class="event-price ${is_free ? null : 'event-price-cost'}">${is_free ? '<strong>Free</strong>' : 'Loading...'}</p>
              <div class="event-button-wrap">
                <a href="${url}" class="button button-secondary">Register</a>
              </div>
            `;

            if (!is_free) {
              fetch(`https://fast-eyrie-12998.herokuapp.com/api/strike/tickets?event=${id}`)
                .then(response => {
                  if (response.status !== 200) {
                    return
                  }
                  response.json().then(data => {
                    let element = document.querySelectorAll('.event-price-cost')
                    element.forEach(el => {
                      el.innerHTML = `<strong>${data.ticket_classes[0].cost.display}</strong>`
                    })

                  });
                })
                .catch(function (err) {
                  console.log('Fetch Error :-S', err);
                });
            }
          });
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });


});

