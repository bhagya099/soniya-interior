import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import testimonials from "../data/testimonials";

const Arrow = ({ flip }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

// One quote at a time, cross-fading. Autoplay pauses on hover, while a finger
// is on the slider and while anything inside has keyboard focus, and is off
// entirely for prefers-reduced-motion.
const TestimonialSlider = () => {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const count = testimonials.length;
  if (!count) return null;

  const pause = () => swiperRef.current?.autoplay?.running && swiperRef.current.autoplay.pause();
  const resume = (e) => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay?.running || e.currentTarget.contains(e.relatedTarget)) return;
    if (!swiper.el.matches(":hover")) swiper.autoplay.resume();
  };

  return (
    <div className="testimonial-slider" onFocus={pause} onBlur={resume}>
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={300}
        rewind
        autoHeight={false}
        allowTouchMove={count > 1}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={
          !reduceMotion && count > 1
            ? { delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        a11y={{ containerMessage: "Client testimonials", slideLabelMessage: "{{index}} of {{slidesLength}}" }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActive(swiper.activeIndex)}
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.name + t.quote.slice(0, 20)}>
            <figure className="testimonial">
              <span className="testimonial-mark" aria-hidden="true">“</span>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>{t.name}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      {count > 1 && (
        <div className="testimonial-nav">
          <button type="button" className="testimonial-arrow" aria-label="Previous testimonial"
            onClick={() => swiperRef.current?.slidePrev()}>
            <Arrow />
          </button>
          <span className="testimonial-count" aria-hidden="true">
            {active + 1} / {count}
          </span>
          <button type="button" className="testimonial-arrow" aria-label="Next testimonial"
            onClick={() => swiperRef.current?.slideNext()}>
            <Arrow flip />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;
