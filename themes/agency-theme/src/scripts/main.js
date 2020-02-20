const $mainNav = document.getElementById('nav-links');
const $mainNavToggle = document.getElementById('toggle-nav-links');
const $cookieBar = document.getElementById('cookie-bar');
const $gaAccept = document.getElementById('ga-accept');
const $gaOptout = document.getElementById('ga-optout');

document.addEventListener('DOMContentLoaded', function () {

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

  $mainNavToggle.addEventListener('click', function () {
    if ($mainNav.classList.contains('is-open')) {
      $mainNav.classList.remove('is-open');
      $mainNavToggle.innerHTML = 'Menu';
      return false
    }
    $mainNav.classList.add('is-open');
    $mainNavToggle.innerHTML = 'Close';
  })
})