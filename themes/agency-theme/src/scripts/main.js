const $mainNav = document.getElementById('nav-links');
const $mainNavToggle = document.getElementById('toggle-nav-links');

document.addEventListener('DOMContentLoaded', function () {
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