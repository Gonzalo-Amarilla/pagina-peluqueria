
        // Variables DOM
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const header = document.getElementById('site-header');
        const btnReservarHero = document.getElementById('btn-reservar-hero');
        const modalReserva = document.getElementById('modal-reserva');
        const modalClose = document.getElementById('modal-close');
        const openModalBtns = document.querySelectorAll('[data-open-modal], #cta-reservar, #btn-reservar-hero');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const sliderDots = document.querySelectorAll('.slider-dot');
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const bookingForm = document.getElementById('booking-form');
        const formSuccess = document.getElementById('form-success');
        const scrollTopBtn = document.getElementById('scroll-top');
        const mobileNavClass = 'mobile-active';

        // Rellenar año
        document.getElementById('year').textContent = new Date().getFullYear();

        // HAMBURGUESA
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !expanded);
            if (navLinks.classList.contains(mobileNavClass)) {
                navLinks.classList.remove(mobileNavClass);
            } else {
                navLinks.classList.add(mobileNavClass);
            }
        });

        // Cerrar menú al click en enlace (mobile)
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove(mobileNavClass);
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Efecto al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Scroll to top button
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            
            revealOnScroll();
        });

        // Scroll to top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // REVELAR ELEMENTOS AL SCROLL
        const revealElements = document.querySelectorAll('[data-animate]');
        function revealOnScroll() {
            const triggerBottom = window.innerHeight * 0.85;
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < triggerBottom) {
                    el.classList.add('show');
                }
            });
        }
        revealOnScroll();

        // MODAL - Abrir y cerrar
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(modalReserva);
            });
        });

        function openModal(modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', () => closeModal(modalReserva));
        modalReserva.addEventListener('click', (e) => {
            if (e.target === modalReserva) closeModal(modalReserva);
        });

        // LIGHTBOX GALERÍA
        galleryItems.forEach(item => {
            const src = item.dataset.src || '';
            if (src) {
                item.style.backgroundImage = `url('${src}')`;
                item.style.backgroundSize = 'cover';
                item.style.backgroundPosition = 'center';
            }
            
            item.addEventListener('click', () => {
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                lightbox.setAttribute('aria-hidden', 'true');
                lightboxImg.src = '';
                document.body.style.overflow = '';
            }
        });

        // TESTIMONIOS - slider
        let currentTestimonial = 0;
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
                sliderDots[i].classList.toggle('active', i === index);
                sliderDots[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
            currentTestimonial = index;
        }

        sliderDots.forEach(dot => {
            dot.addEventListener('click', () => {
                showTestimonial(parseInt(dot.dataset.index));
            });
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showTestimonial(parseInt(dot.dataset.index));
                }
            });
        });

        // Auto-rotación cada 6s
        setInterval(() => {
            let next = currentTestimonial + 1;
            if (next >= testimonialItems.length) next = 0;
            showTestimonial(next);
        }, 6000);

        // FORMULARIO - Validación
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        function validatePhone(phone) {
            return phone.trim().length >= 8;
        }

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const name = document.getElementById('name');
            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                valid = false;
            } else {
                name.parentElement.classList.remove('error');
            }

            const phone = document.getElementById('phone');
            if (!validatePhone(phone.value)) {
                phone.parentElement.classList.add('error');
                valid = false;
            } else {
                phone.parentElement.classList.remove('error');
            }

            const email = document.getElementById('email');
            if (!validateEmail(email.value)) {
                email.parentElement.classList.add('error');
                valid = false;
            } else {
                email.parentElement.classList.remove('error');
            }

            if (!valid) {
                const firstError = document.querySelector('.form-group.error input, .form-group.error textarea, .form-group.error select');
                if (firstError) firstError.focus();
                return;
            }

            formSuccess.classList.add('show');
            bookingForm.reset();

            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        });

        // FORMULARIO DEL MODAL
        const modalForm = document.getElementById('modal-booking-form');
        const modalSuccess = document.getElementById('modal-success');
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const mName = document.getElementById('m-name');
            const mPhone = document.getElementById('m-phone');

            let ok = true;
            if (!mName.value.trim()) { 
                mName.parentElement.classList.add('error'); 
                ok = false; 
            } else {
                mName.parentElement.classList.remove('error');
            }
            
            if (!validatePhone(mPhone.value)) { 
                mPhone.parentElement.classList.add('error'); 
                ok = false; 
            } else {
                mPhone.parentElement.classList.remove('error');
            }

            if (!ok) return;

            modalSuccess.classList.add('show');
            modalForm.reset();
            setTimeout(() => {
                modalSuccess.classList.remove('show');
                closeModal(modalReserva);
            }, 2500);
        });

        // NEWSLETTER
        const newsletterBtn = document.getElementById('newsletter-btn');
        newsletterBtn.addEventListener('click', () => {
            const input = document.getElementById('newsletter-email');
            if (validateEmail(input.value)) {
                alert('¡Gracias por suscribirte!');
                input.value = '';
            } else {
                alert('Ingresá un email válido para suscribirte.');
                input.focus();
            }
        });

        // Cerrar modals con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    lightbox.setAttribute('aria-hidden', 'true');
                    lightboxImg.src = '';
                    document.body.style.overflow = '';
                }
                if (modalReserva.classList.contains('active')) {
                    closeModal(modalReserva);
                }
            }
        });

        // Ejecutar reveal al cargar
        document.addEventListener('DOMContentLoaded', () => {
            revealOnScroll();
        });