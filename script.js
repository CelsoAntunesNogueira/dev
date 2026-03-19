
    document.addEventListener('DOMContentLoaded', () => {

        // --- CANVAS BACKGROUND ---
        const canvas = document.getElementById('ps-canvas');
        const ctx = canvas.getContext('2d');
        let W, H;

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const orbs = [
            { x: 0.3, y: 0.4, r: 0.6, hue: 240 },
            { x: 0.8, y: 0.2, r: 0.5, hue: 190 },
            { x: 0.6, y: 0.7, r: 0.7, hue: 210 }
        ];

        const stars = Array.from({ length: 80 }, () => ({
            x: Math.random(), y: Math.random(),
            size: 0.5 + Math.random() * 1.2,
            speed: 0.00001 + Math.random() * 0.00004
        }));

        function drawStars(ts) {
            ctx.fillStyle = "white";
            stars.forEach((s, i) => {
                s.y -= s.speed;
                s.x += Math.sin(ts * 0.0005 + i) * 0.0001;
                if (s.y < 0) s.y = 1;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        function drawPS5(ts) {
            orbs.forEach((o, i) => {
                const cx = (o.x + Math.sin(ts * 0.0004 + i) * 0.03) * W;
                const cy = (o.y + Math.cos(ts * 0.0004 + i) * 0.03) * H;
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r * Math.min(W, H));
                g.addColorStop(0, `hsla(${o.hue}, 80%, 40%, 0.15)`);
                g.addColorStop(1, `transparent`);
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, W, H);
            });
        }

        function animate(ts) {
            ctx.fillStyle = '#07091a';
            ctx.fillRect(0, 0, W, H);
            drawStars(ts);
            drawPS5(ts);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Para de observar após revelar (performance)
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // --- VER MAIS ---
        function setupVerMais(btnId) {
            const btn = document.getElementById(btnId);
            if (!btn) return;
            const items = btn.closest('section').querySelectorAll('.hidden-item');
            const textoProjetos = btnId === 'btn-mais-projetos';
            let expanded = false;

            btn.addEventListener('click', () => {
                expanded = !expanded;
                items.forEach((item, i) => {
                    if (expanded) {
                        setTimeout(() => item.classList.add('visible'), i * 100);
                    } else {
                        item.classList.remove('visible');
                    }
                });
                btn.classList.toggle('expanded', expanded);
                const label = expanded
                    ? (textoProjetos ? 'Ver menos projetos' : 'Ver menos certificações')
                    : (textoProjetos ? 'Ver mais projetos' : 'Ver mais certificações');
                btn.innerHTML = `${label} <i class="fa-solid fa-chevron-down"></i>`;
            });
        }

        setupVerMais('btn-mais-projetos');
        setupVerMais('btn-mais-certs');

    });
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('nav a');

// 1. Abre e fecha o menu ao clicar no ícone
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Troca o ícone de 'bars' para 'x' (fechar)
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// 2. Fecha o menu automaticamente quando clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});