const cardEl = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>;
let currentIndex = 0;

function renderCards() {
  currentIndex++;
  if (currentIndex > cardEl.length - 1) {
    currentIndex = 0;
  }

  cardEl.forEach((card) => card.classList.remove("active"));
  cardEl[currentIndex].classList.add("active");
}

setInterval(renderCards, 2000);

const radioBtnsDiv = document.querySelector(".radio__btns");
const radioBtns = document.querySelectorAll(
  ".btn"
) as NodeListOf<HTMLSpanElement>;
const slides = document.querySelector(".slides") as HTMLDivElement;
const slidesImages = document.querySelectorAll(
  ".slides img"
) as NodeListOf<HTMLImageElement>;

let currentSlide = 0;

radioBtns.forEach((btn) => btn.addEventListener("click", handleClickState));

function handleClickState(e: Event) {
  const _t = (e.target as HTMLSpanElement).id;
  currentSlide = Number(_t);
  clearTimeout(timer);
  renderImagesSlider();
}

function renderActiveState(el: NodeListOf<HTMLElement>) {
  el.forEach((btn) => btn.classList.remove("active"));
  el[currentSlide].classList.add("active");
}

let timer: any;

function renderImagesSlider() {
  if (currentSlide > slidesImages.length - 1) {
    currentSlide = 0;
  }
  slides.style.translate = `-${currentSlide * 100}%  0 `;
  renderActiveState(slidesImages);
  renderActiveState(radioBtns);

  timer = setTimeout(() => {
    currentSlide++;
    renderImagesSlider();
  }, 4000);
}

renderImagesSlider();

const hamburger = document.querySelector(".hamburger") as HTMLButtonElement;
hamburger.addEventListener("click", (e) => {
  hamburger.classList.toggle("active");
});
