//welcome note section
const text = "WELCOME TO IJAW BROTHERHOOD WORLDWIDE";
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typing").textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    window.onload = typeWriter;

    
//hero section slide displays
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


// Scroll Effect with JavaScript
window.addEventListener('scroll', () => {
    const section = document.querySelector('.mission-vision-section');
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {
      section.style.animationPlayState = 'running';
    }
  });

  //automatic slider for the testimonials
  document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonials.length;
    let currentSlide = 0;
  
    function showSlide(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
      showSlide(currentSlide);
    }
  
    // Initialize the slider
    showSlide(currentSlide);
  
    // Set up automatic slide transition every 3 seconds
    setInterval(nextSlide, 3000);
  });
  
 
  //About us button action
  document.getElementById('about-us').addEventListener('click', function(){
    window.location.href = "/about-us.html";
  });

//volunteer button action
document.getElementById('volunteer').addEventListener('click', function(){
  window.location.href = "/volunteer.html";
});

//donate button action
document.getElementById('donate').addEventListener('click', function() {
  window.location.href = "/donate.html";
});