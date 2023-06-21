class CustomComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const numCards = parseInt(this.getAttribute("num-cards")) || 4;

    this.current = 0;
    this.render(numCards);
    window.addEventListener("resize", () =>
      this.createSliderControll(numCards)
    );
  }

  render(numCards) {
    const appTitleDiv = document.createElement("div");
    appTitleDiv.className = "app-title-div";
    const appTitle = document.createElement("h3");
    appTitle.className = "app-title";
    appTitle.innerHTML = " You might find those interesting";
    appTitleDiv.appendChild(appTitle);

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const container = document.createElement("div");
    container.className = "container";

    for (let i = 0; i < numCards; i++) {
      const card = document.createElement("div");
      card.className = "card";

      const cardImage = document.createElement("img");
      cardImage.src =
        "https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png";
      cardImage.alt = "Card Image";
      card.appendChild(cardImage);

      const cardTitle = document.createElement("h2");
      cardTitle.className = "card-title";
      cardTitle.textContent = `Card ${i + 1}`;
      card.appendChild(cardTitle);

      const cardPrice = document.createElement("h5");
      cardPrice.className = "card-price";
      cardPrice.textContent = `$ 9.99`;
      card.appendChild(cardPrice);

      const cardButton = document.createElement("button");
      cardButton.className = "card-button";
      cardButton.textContent = "Add to cart";
      card.appendChild(cardButton);

      // Append the card to the container
      container.appendChild(card);
      wrapper.appendChild(container);
      appTitleDiv.appendChild(wrapper);
      //   this.createSliderControll(numCards);
    }

    this.shadowRoot.innerHTML = `
    <style>
    .app-title{
        font-size: 30px;
        font-weight: 300;
    
      }
      .app-title-div{
        width: 70%;
        text-align: center;
      }
    .container{
        margin-top: 25px;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
      }
      
      .card {
        width: 250px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
        margin-left: 20px;
        text-align: center;
        height: 350px;
        padding-bottom: 15px;
      }
    .card-title,.card-price {
        text-align: center;
    
    }
    .card-title{
        font-size: 18px;
        font-weight: 300;
    }
      img {
        width: 100%;
        height: 60%;
        margin-bottom: 10px;
      }
    
      h2 {
        font-size: 20px;
        margin-bottom: 5px;
      }
    
      p {
        font-size: 14px;
      }
      .dot{
        display: none;
      }
      .card-button{
        background-color: #0080ce;
        height: 30px;
        width: 150px;
        border-radius: 15px;
        color: white;
        font-size: 14px;
        border: none;
        
      }
      @media (max-width: 768px) {
        
        img{
          height: 50%;
        }
        
        .card {
            width: 200px;
            height: 200px;
           /* background-color: blue !important; */
        }
        .card-title{
            font-size: 10px;
            
        }
        .card-button{
          /* background-color: #0080ce; */
          height: 20px;
          width: 150px;
         
          font-size: 10px;
          border: none;
          
        }
        .card-price{
            font-size: 8px;
        }
        .container{
            overflow: hidden;  /* Add scrollbars when content overflows */
        /* max-width: 70%; */
        display: -webkit-box !important;
        white-space: nowrap;
        padding-bottom: 30px !important;
      
        }
        .slider-dots{
          display: flex;
        justify-content: center;
        align-items: center;
        }
        
          .dot {
            cursor: pointer;
            height: 5px;
            width: 50px;
            margin: 10px 0px;
            background-color: #bbb;
            /* border-radius: 7px; */
            display: inline-block;
            transition: background-color 0.6s ease;
          }
          
          .active, .dot:hover {
            background-color: #717171;
          }
         
    .fade {
        animation-name: fade;
        animation-duration: 1.5s;
      }
      
      @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }
      }
    
      `;

    this.shadowRoot.appendChild(appTitleDiv);
  }
  showSlides(n) {
    let i;
    const slides = this.shadowRoot.querySelectorAll(".card");
    let dots = this.shadowRoot.querySelectorAll(".dot");

    let slideIndex = n;

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    if (slideIndex + 1 < slides.length) {
      slides[slideIndex + 1].style.display = "block";
    }
    dots[slideIndex].className += " active";
  }
  currentSlide(currentCardIndex) {
    this.current = currentCardIndex;
    this.showSlides(currentCardIndex);
  }
  createSliderControll(numCards) {
    const appTitle = this.shadowRoot.querySelector(".app-title");

    const wrapper = this.shadowRoot.querySelector(".wrapper");

    const dotContainer = document.createElement("div");
    dotContainer.className = "slider-dots";
    dotContainer.id = "dotContainer";
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) {
      appTitle.innerHTML = "Complete your dog look";
      for (let i = 0; i < numCards; i++) {
        const dotElem = document.createElement("span");
        dotElem.className = "dot";
        dotElem.onclick = () => this.currentSlide(i);

        dotContainer.appendChild(dotElem);
      }
      wrapper.appendChild(dotContainer);
      const cards = this.shadowRoot.querySelectorAll(".card");
      cards.forEach((card, index) => {
        if (index === this.current || index === this.current + 1) {
          cards[this.current].style.display = "block";
          cards[this.current + 1].style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    } else {
      appTitle.innerHTML = "You might find those interesting";
      const cards = this.shadowRoot.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.display = "block";
      });
    }
  }
  // const appTitle = document.getElementById("appTitle");
}

// Register the custom component
customElements.define("card-slider", CustomComponent);
