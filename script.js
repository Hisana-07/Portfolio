var typed = new Typed(".multiple-text", {
    strings: ["Frontend Developer", "Programmer", "Poet", "Blogger"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


var softTyped = new Typed(".soft-text", {
    strings: [
        "problem-solving skills",
        "effective communication",
        "time management",
        "creative and critical thinking"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
