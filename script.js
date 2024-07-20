document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const animateChars = (chars, reverse = false) => {
    const staggerOptions = {
      each: 0.50,
      from: reverse ? 'start' : 'end',
      ease: 'Power1.easeOut',
    };

    gsap.fromTo(
      chars,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 10,
        ease: 'none',
        stagger: staggerOptions,
        scrollTrigger: {
          trigger: chars[0].closest('.marquee-container'),
          start: '50% bottom',
          end: 'top top',
          scrub: 0.1,
          onEnter: () =>
            chars.forEach(
              (char) => (char.style.willChange = 'opacity, transform')
            ),
          onLeave: () =>
            chars.forEach((char) => (char.style.willChange = 'auto')),
          onEnterBack: () =>
            chars.forEach(
              (char) => (char.style.willChange = 'opacity, transform')
            ),
          onLeaveBack: () =>
            chars.forEach((char) => (char.style.willChange = 'auto')),
        },
      }
    );
  };

  new SplitType('.item h2', { types: 'chars' });
  const marqueeContainers = document.querySelectorAll('.marquee-container');

  marqueeContainers.forEach((container, index) => {
    let start = '0%';
    let end = '-5%';

    if (index % 2 === 0) {
      start = '0%';
      end = '5%';
    }

    const marquee = container.querySelector('.marquee'),
      words = marquee.querySelectorAll('.item h2');

    gsap.fromTo(
      marquee,
      {
        x: start,
      },
      {
        x: end,
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    words.forEach((word) => {
      const chars = Array.from(word.querySelectorAll('.char'));
      if (chars.length) {
        const reverse = index % 2 !== 0;
        animateChars(chars, reverse);
      }
    });
  });

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);

  // Optimize GSAP ticker for better performance
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
});
