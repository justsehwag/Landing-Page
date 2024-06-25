
document.addEventListener('DOMContentLoaded', () => {
    
    const logoAnimation = lottie.loadAnimation({
        container: document.getElementById('logo-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_yd8fbnml.json' // Replace with your logo animation JSON
    });

    const heroAnimation = lottie.loadAnimation({
        container: document.getElementById('hero-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_hcae8wxn.json' // Replace with your hero animation JSON
    });



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


const header = document.querySelector('header');
const changeHeaderBg = () => {
  if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(58, 12, 163, 0.9)';
  } else {
      header.style.backgroundColor = 'transparent';
  }
};
window.addEventListener('scroll', changeHeaderBg);


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});


const parallaxSections = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  let scrollPosition = window.pageYOffset;
  parallaxSections.forEach(section => {
      let offset = section.offsetTop;
      let speed = 0.5;
      section.style.backgroundPositionY = (scrollPosition - offset) * speed + 'px';
  });
});


const features = document.querySelectorAll('.feature');
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px"
};

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          featureObserver.unobserve(entry.target);
      }
  });
}, observerOptions);

features.forEach(feature => {
  featureObserver.observe(feature);
});


const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  emailjs.init('3H1lrcq57UFgSIfIZ');
  if (validateForm()) {
      emailjs.sendForm('service_ycs7isp', 'template_h126ncp', form)
          .then(() => {
              showNotification('Message sent successfully!', 'success');
              form.reset();
          }, (error) => {
              showNotification('Failed to send message. Please try again later.', 'error');
          });
  }
});

function validateForm() {
  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const message = form.querySelector('textarea');

  if (name.value.trim() === '') {
      showNotification('Please enter your name.', 'error');
      return false;
  }

  if (email.value.trim() === '' || !isValidEmail(email.value)) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
  }

  if (message.value.trim() === '') {
      showNotification('Please enter your message.', 'error');
      return false;
  }

  return true;
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
              document.body.removeChild(notification);
          }, 300);
      }, 3000);
  }, 100);
}

// Typing effect for the subtitle
const subtitle = document.querySelector('.subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

function typeWriter() {
  if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
  }
}

typeWriter();

 
    const ctaButton = document.getElementById('cta-button');
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.transform = 'scale(1.1) rotate(5deg)';
    });
    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.transform = 'scale(1) rotate(0deg)';
    });

    
    const colors = ['#3a0ca3', '#4cc9f0', '#f72585'];
    let cursorTrail;

    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.left = `${e.pageX}px`;
        dot.style.top = `${e.pageY}px`;
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 1000);
    });
});