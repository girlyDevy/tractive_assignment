class CardSliderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const cardData = JSON.parse(this.getAttribute("slider-data")) || [];
    const numCards = cardData.length || 4;
    const titleData = JSON.parse(this.getAttribute("title-data")) || [];

    console.log({ titleData });
    this.render(numCards, cardData);
    this.viewportWidth = window.innerWidth;
    this.breakWidth = 768;
    this.current = 0;
    this.render(numCards, cardData, titleData);
    if (this.viewportWidth < this.breakWidth) {
      this.createSliderControll(numCards, titleData);
    }
    window.addEventListener("resize", () =>
      this.createSliderControll(numCards, titleData)
    );
  }

  render(numCards, cardData, titleData) {
    const appTitle = document.createElement("h3");
    appTitle.className = "app-title";
    appTitle.textContent =
      this.viewportWidth < this.breakWidth ? titleData?.mobile : titleData?.web;

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const container = document.createElement("div");
    container.className = "container";

    for (let count = 0; count < numCards; count++) {
      const card = document.createElement("div");
      card.className = "card";

      if (count < cardData?.length) {
        const data = cardData[count];
        card.innerHTML = `
          <img src="${data.image}" alt="Card Image">
          <h2 class="card-title">${data.title}</h2>
          <h5 class="card-price">$ ${data.price}</h5>
          <button class="card-button">Add to cart</button>
        `;
      }

      container.appendChild(card);
    }

    wrapper.appendChild(container);

    this.shadowRoot.innerHTML = `
    <style>
    .app-title{
        font-size: 30px;
        font-weight: 300;
        padding-left:100px
    
      }
      .app-title-div{
        width: 70%;
        text-align: center;
      }
    .container{
        margin-top: 25px;
        display: flex;
        align-items: center;
        flex-flow:wrap;
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
        margin-bottom: 20px;
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
        flex-wrap: nowrap !important;

      
        }
        .slider-dots{
          display: flex;
        justify-content: center;
        align-items: center;
        width: 35%;
        margin: 0 auto !important;
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
      </style>
    
      `;

    this.shadowRoot.appendChild(appTitle);
    this.shadowRoot.appendChild(wrapper);
  }
  showSlides(n) {
    const slides = this.shadowRoot.querySelectorAll(".card");
    let dots = this.shadowRoot.querySelectorAll(".dot");

    let slideIndex = n;

    for (let slidePointer = 0; slidePointer < slides.length; slidePointer++) {
      slides[slidePointer].style.display = "none";
    }
    for (let dotPointer = 0; dotPointer < dots.length; dotPointer++) {
      dots[dotPointer].className = dots[dotPointer].className.replace(
        " active",
        ""
      );
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

  createSliderControll(numCards, titleData) {
    const appTitle = this.shadowRoot.querySelector(".app-title");

    const wrapper = this.shadowRoot.querySelector(".wrapper");
    const existingDotContainer = this.shadowRoot.querySelector("#dotContainer");

    if (existingDotContainer) {
      existingDotContainer.remove();
    }
    const dotContainer = document.createElement("div");
    dotContainer.className = "slider-dots";
    dotContainer.id = "dotContainer";
    this.viewportWidth = window.innerWidth;

    if (this.viewportWidth < this.breakWidth) {
      appTitle.textContent = titleData?.mobile;
      for (let count = 0; count < numCards; count++) {
        const dotElem = document.createElement("span");
        dotElem.className = "dot";
        dotElem.onclick = () => this.currentSlide(count);

        dotContainer.appendChild(dotElem);
      }
      this.shadowRoot.appendChild(dotContainer);
      // wrapper.appendChild(dotContainer);
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
      appTitle.textContent = titleData?.web;
      const cards = this.shadowRoot.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.display = "block";
      });
    }
  }
  // const appTitle = document.getElementById("appTitle");
}

// Register the custom component
customElements.define("card-slider", CardSliderComponent);
