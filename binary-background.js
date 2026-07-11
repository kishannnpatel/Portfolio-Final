(function () {
    const startBinaryBackground = () => {
        const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!supportsFinePointer || reducedMotion || document.getElementById('binaryCursor')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'binaryCursor';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.prepend(canvas);

        const context = canvas.getContext('2d');
        const particles = [];
        let frameId = null;
        let lastFrameTime = 0;
        let previousPointer = { x: -100, y: -100 };

        const resizeCanvas = () => {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(window.innerWidth * pixelRatio);
            canvas.height = Math.round(window.innerHeight * pixelRatio);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.font = '600 14px "JetBrains Mono", monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
        };

        const draw = (time) => {
            const elapsed = Math.min(time - lastFrameTime || 16, 32);
            lastFrameTime = time;
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let index = particles.length - 1; index >= 0; index -= 1) {
                const particle = particles[index];
                particle.age += elapsed;

                if (particle.age >= particle.duration) {
                    particles.splice(index, 1);
                    continue;
                }

                const progress = particle.age / particle.duration;
                const opacity = (1 - progress) * particle.opacity;
                particle.x += particle.velocityX * (elapsed / 16);
                particle.y += particle.velocityY * (elapsed / 16);

                const binaryColor = document.documentElement.classList.contains('dark') ? '255, 255, 255' : '0, 0, 0';
                context.fillStyle = `rgba(${binaryColor}, ${opacity})`;
                context.shadowBlur = 0;
                context.fillText(particle.digit, particle.x, particle.y);
            }

            context.shadowBlur = 0;
            frameId = particles.length ? window.requestAnimationFrame(draw) : null;
        };

        const addParticleField = (x, y, intensity) => {
            const count = intensity ? 24 : 12;

            for (let index = 0; index < count; index += 1) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 18 + Math.random() * (intensity ? 170 : 90);
                particles.push({
                    x: x + Math.cos(angle) * distance,
                    y: y + Math.sin(angle) * distance,
                    velocityX: Math.cos(angle) * (Math.random() * 0.8),
                    velocityY: -0.25 - Math.random() * 0.9,
                    digit: Math.random() > 0.5 ? '1' : '0',
                    opacity: 0.26 + Math.random() * 0.36,
                    age: 0,
                    duration: 500 + Math.random() * 700
                });
            }

            if (particles.length > 150) particles.splice(0, particles.length - 150);
            if (!frameId) frameId = window.requestAnimationFrame(draw);
        };

        const handlePointerMove = (event) => {
            const { clientX: x, clientY: y } = event;
            const distance = Math.hypot(x - previousPointer.x, y - previousPointer.y);

            document.body.classList.add('has-binary-cursor');
            document.body.style.setProperty('--cursor-x', `${x}px`);
            document.body.style.setProperty('--cursor-y', `${y}px`);

            if (distance > 14) {
                addParticleField(x, y, distance > 70);
                previousPointer = { x, y };
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startBinaryBackground, { once: true });
    } else {
        startBinaryBackground();
    }
})();
