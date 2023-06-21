// Define the custom component
function CardSlider(numCards) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "container";
  const dotContainer = document.createElement("div");
  dotContainer.className = "slider-dots";
  dotContainer.id = "dotContainer";

  let current = 0;

  // Function to show the slides
  function showSlides(n) {
    let i;
    let slides = cardContainer.getElementsByClassName("card");
    let dots = dotContainer.getElementsByClassName("dot");

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

  // Function to handle click event on dots
  function currentSlide(index) {
    current = index;
    showSlides((slideIndex = index));
  }

  // Function to adjust card visibility based on the viewport width
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
        cards[current].style.display = "block";
        cards[current + 1].style.display = "block";
      });
    } else {
      appTitle.innerHTML = " You might find those interesting";

      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.display = "block";
      });
    }
  }

  // Add event listener for window resize
  window.addEventListener("resize", adjustCardVisibility);

  // Public method to initialize the component
  function init() {
    adjustCardVisibility();
  }

  // Public method to render the component
  function render() {
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
    document.body.appendChild(cardContainer);
  }

  // Return the public methods
  return {
    init,
    render,
  };
}

// Usage example
const cardSlider = CardSlider(4);
cardSlider.render();
cardSlider.init();
