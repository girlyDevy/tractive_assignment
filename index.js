const cardContainer = document.getElementById("cardContainer");
const numCards = 4; // Change this value to the desired number of cards
let current = 0;
const batchCount = 2;
// showSlides(current);
for (let i = 0; i < numCards; i++) {
  const card = document.createElement("div");
  card.className = "card fade";

  const cardImage = document.createElement("img");
  cardImage.src =
    "https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png";
  cardImage.alt = "Card Image";
  card.appendChild(cardImage);

  const cardTitle = document.createElement("h2");

  cardTitle.className = "card-title";
  cardTitle.textContent = "Clip x3" + i;
  //   else cardTitle.textContent = "Spare Charging Cable" + i;

  card.appendChild(cardTitle);

  // cardTitle.textContent = "Clip x3" + i;
  //   else cardTitle.textContent = "Spare Charging Cable" + i;

  const cardPrice = document.createElement("p");
  cardPrice.className = "card-price";
  cardPrice.textContent = "$ 9.99";
  card.appendChild(cardPrice);

  const cardButton = document.createElement("button");
  cardButton.className = "card-button";
  cardButton.textContent = "Add to cart";
  card.appendChild(cardButton);

  cardContainer.appendChild(card);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("card");
  let dots = document.getElementsByClassName("dot");

  let slideIndex = n;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex].style.display = "block";
  if (slideIndex + 1 < numCards) {
    slides[slideIndex + 1].style.display = "block";
  }
  dots[slideIndex].className += " active";
}
function currentSlide(index) {
  current = index;
  showSlides((slideIndex = index));
}
// Get the card row element
const cardRow = document.querySelector(".container");

window.addEventListener("resize", adjustCardVisibility);

// Helper function to adjust card visibility based on the viewport width
function adjustCardVisibility() {
  const viewportWidth = window.innerWidth;
  const appTitle = document.getElementById("appTitle");
  if (viewportWidth < 768) {
    appTitle.innerHTML = "Complete your dog look";

    const dotContainer = document.getElementById("dotContainer");
    for (let i = 0; i < numCards; i++) {
      const dotElem = document.createElement("span");
      dotElem.className = "dot";
      dotElem.onclick = function () {
        currentSlide(i);
      };
      dotContainer.appendChild(dotElem);
    }
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      // console.log(index < 2 && index + 1 > current && index <= current);
      // if (i%) {
      cards[current].style.display = "block";
      cards[current + 1].style.display = "block";
      // card.style.display = "block";
      // } else {
      //   card.style.display = "none";
      // }
    });
  } else {
    appTitle.innerHTML = " You might find those interesting";

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.display = "block";
    });
  }
}
adjustCardVisibility();
