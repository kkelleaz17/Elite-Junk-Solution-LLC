emailjs.init("JUWK2eiAVSq4VgGgm");

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Grab fields
    const name = this.querySelector('[name="from_name"]');
    const phone = this.querySelector('[name="phone"]');
    const appointment = this.querySelector('[name="appointment"]');
    const message = this.querySelector('[name="message"]');

    let isValid = true;

    // Regex rules
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    // Reset previous highlights
    [name, phone, appointment, message].forEach(f => f.classList.remove("invalid"));

    // Validate fields
    if (!nameRegex.test(name.value.trim())) { name.classList.add("invalid"); isValid = false; }
    if (!phoneRegex.test(phone.value.trim())) { phone.classList.add("invalid"); isValid = false; }
    if (!dateRegex.test(appointment.value)) { appointment.classList.add("invalid"); isValid = false; }
    if (message.value.trim().length < 5) { message.classList.add("invalid"); isValid = false; }

    if (!isValid) {
      alert("❌ Please correct the highlighted fields.");
      return;
    }

// Format appointment date/time
const dateObj = new Date(appointment.value);
const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
const formattedAppointment = dateObj.toLocaleString('en-US', options).replace(',', ' –');

// Send via EmailJS manually
emailjs.send("service_qiq57qn", "template_24p23nv", {
  from_name: name.value,
  reply_to: "auresoto24@gmail.com",
  phone: phone.value,
  appointment: formattedAppointment, // formatted string
  message: message.value,
  to: ['auresoto24@gmail.com', '6232135871@tmomail.net'],
})
.then(() => {
  alert("✅ Message sent successfully!");
  this.reset();
})
.catch((err) => {
  console.error("❌ Failed to send:", err);
  alert("Something went wrong. Please try again.");
});
  });



const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  let interval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  // Swipe support
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        nextSlide(); // swipe left → next
      } else {
        prevSlide(); // swipe right → prev
      }
      resetInterval();
    }
  });

  // Init
  resetInterval();
  window.addEventListener('resize', updateCarousel);