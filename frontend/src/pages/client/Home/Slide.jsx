import React from 'react'

const Slide = () => {
  return (
    <div className="slider-area">
      <div className="slider-active owl-dot-style owl-carousel ">
        <div
          className="single-slider bg-img slider-height"
          style={{ backgroundImage: "url(client_css/img/slider/slider-1/slider1.png)" }}
        >
          <div className="layer-1 slider-animated-1">
            <h2 className="animated slider-title3 text-uppercase mb-0">
              Fashion show with designer
            </h2>
            <h2 className="animated slider-title1 text-uppercase mb-0">
              the best collection
            </h2>
            <p className="animated slider-pro-brief">
              One morning, when Gregor Samsa woke from troubled dreams nhe found
              himself transformed into a horrible vermin. by injected humour, or
              randomised words which don't look even slightly believable
            </p>
            <a
              href="#"
              className="animated button-one style-2 text-uppercase mt-15"
              data-text="Shop now"
            >
              Shop now
            </a>
          </div>
        </div>
        <div
          className="single-slider bg-img slider-height"
          style={{ backgroundImage: "url(client_css/img/slider/slider-1/2.webp)" }}
        >
          <div className="layer-1 slider-animated-1">
            <h2 className="animated slider-title3 text-uppercase mb-0">
              colored fashion year
            </h2>
            <h2 className="animated slider-title1 text-uppercase">
              the new way business
            </h2>
            <p className="animated slider-pro-brief">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable
            </p>
            <a
              href="#"
              className="animated button-one style-2 text-uppercase mt-15"
              data-text="Shop now"
            >
              Shop now
            </a>
          </div>
        </div>
        <div
          className="single-slider bg-img slider-height"
          style={{ backgroundImage: "url(client_css/img/slider/slider-1/3.webp)" }}
        >
          <div className="layer-1 slider-animated-1">
            <h2 className="animated slider-title3 text-uppercase mb-0">
              select your accessories
            </h2>
            <h2 className="animated slider-title1 text-uppercase mb-0">
              your favourite scent
            </h2>
            <p className="animated slider-pro-brief">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable
            </p>
            <a
              href="#"
              className="animated button-one style-2 text-uppercase mt-15"
              data-text="Shop now"
            >
              Shop now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide