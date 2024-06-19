const topValue = 50;
const backToTopButton = document.getElementById('backToTopButton');

window.onscroll = function () {
  scrollToTopButtonHandler();
};

function scrollToTopButtonHandler(): void {
  if (
    document.body.scrollTop > topValue ||
    document.documentElement.scrollTop > topValue
  ) {
    backToTopButton!.style.display = 'block';
  } else {
    backToTopButton!.style.display = 'none';
  }
}

backToTopButton!.addEventListener('click', function () {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE y Opera
});
