emailjs.init("JUWK2eiAVSq4VgGgm");

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Grab fields
    const name = this.querySelector('[name="from_name"]');
    const email = this.querySelector('[name="reply_to"]');
    const phone = this.querySelector('[name="phone"]');
    const appointment = this.querySelector('[name="appointment"]');
    const message = this.querySelector('[name="message"]');

    let isValid = true;

    // Regex rules
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    // Reset previous highlights
    [name, email, phone, appointment, message].forEach(f => f.classList.remove("invalid"));

    // Validate fields
    if (!nameRegex.test(name.value.trim())) { name.classList.add("invalid"); isValid = false; }
    if (!emailRegex.test(email.value.trim())) { email.classList.add("invalid"); isValid = false; }
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
  reply_to: email.value,
  phone: phone.value,
  appointment: formattedAppointment, // formatted string
  message: message.value
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