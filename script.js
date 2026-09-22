/* =========================================================
   FASHA AININ NADIFA — ROMANTIC INTERACTIVE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("💕 Website Fasha siap!");

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const startBtn = document.getElementById("startBtn");
    const musicButton = document.getElementById("musicButton");

    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let currentPage = "intro";
    let musicPlaying = false;
    let audioContext = null;
    let galleryIndex = 0;

    const galleryImages = [
        "fasha2.jpg",
        "fasha123.jpeg",
        "fasha4.jpeg",
        "fasha1234.jpeg",
        "fasha1212.jpeg",
        "fasha13.jpeg"
    ];

    /* =====================================================
       START BUTTON
       ===================================================== */

    if (startBtn) {
        startBtn.addEventListener("click", function (e) {
            createRipple(e);

            setTimeout(() => {
                showPage("menu");
                createHeartBurst();
                startFloatingHearts();
            }, 300);
        });
    }

    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    window.openPage = function (pageId) {
        createHeartBurst();

        const pages = document.querySelectorAll(".screen");

        pages.forEach(page => {
            page.classList.remove("active");
            page.style.pointerEvents = "none";
        });

        const target = document.getElementById(pageId);

        if (!target) {
            console.warn("Page tidak ditemukan:", pageId);
            return;
        }

        target.classList.add("active");
        target.style.pointerEvents = "auto";

        currentPage = pageId;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        animatePage(target);
    };

    window.showPage = function (pageId) {
        openPage(pageId);
    };

    window.backToMenu = function () {
        closeAllPopups();
        openPage("menu");
        createHeartBurst();
    };

    /* =====================================================
       ANIMATE PAGE
       ===================================================== */

    function animatePage(page) {
        page.classList.remove("page-enter");

        void page.offsetWidth;

        page.classList.add("page-enter");

        const children = page.querySelectorAll(
            ".page-wrapper, .letter, .photo-card, .future-card, .birthday-card"
        );

        children.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(25px)";

            setTimeout(() => {
                item.style.transition =
                    "all .7s cubic-bezier(.22,1,.36,1)";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 100 + index * 80);
        });
    }

    /* =====================================================
       MUSIC BUTTON
       ===================================================== */

    if (musicButton) {
        musicButton.addEventListener("click", function (e) {
            createRipple(e);
            toggleMusic();
        });
    }

    function toggleMusic() {
        musicPlaying = !musicPlaying;

        if (musicPlaying) {
            musicButton.classList.add("playing");

            const icon = musicButton.querySelector("span");

            if (icon) {
                icon.textContent = "♫";
            }

            startMusicAnimation();
            playSoftTone();
        } else {
            musicButton.classList.remove("playing");

            const icon = musicButton.querySelector("span");

            if (icon) {
                icon.textContent = "♪";
            }
        }
    }

    function startMusicAnimation() {
        if (!musicPlaying || !musicButton) return;

        musicButton.style.setProperty(
            "--music-rotation",
            `${Math.random() * 10 - 5}deg`
        );

        setTimeout(startMusicAnimation, 800);
    }

    /*
       Tidak memakai file audio eksternal.
       Hanya membuat bunyi lembut menggunakan Web Audio.
    */

    function playSoftTone() {
        try {
            if (!audioContext) {
                audioContext =
                    new (window.AudioContext ||
                        window.webkitAudioContext)();
            }

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = 523.25;

            gain.gain.setValueAtTime(
                0.0001,
                audioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.04,
                audioContext.currentTime + 0.05
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                audioContext.currentTime + 0.8
            );

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(
                audioContext.currentTime + 0.8
            );
        } catch (error) {
            console.log("Audio browser dibatasi.");
        }
    }

    /* =====================================================
       RIPPLE EFFECT
       ===================================================== */

    function createRipple(event) {
        const button = event.currentTarget;

        if (!button) return;

        const ripple = document.createElement("span");

        ripple.className = "click-ripple";

        const rect = button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 700);
    }

    document.addEventListener("click", function (event) {
        const button =
            event.target.closest(
                "button, .menu-card, .photo-card"
            );

        if (!button) return;

        if (
            button.classList.contains("gallery-close") ||
            button.classList.contains("gallery-prev") ||
            button.classList.contains("gallery-next") ||
            button.classList.contains("back-button")
        ) {
            return;
        }

        if (
            event.target.closest(".menu-card") ||
            event.target.closest("button")
        ) {
            createSmallSpark(event.clientX, event.clientY);
        }
    });

    /* =====================================================
       SMALL SPARK
       ===================================================== */

    function createSmallSpark(x, y) {
        const spark = document.createElement("div");

        spark.className = "click-spark";

        spark.textContent =
            Math.random() > 0.5 ? "♥" : "✦";

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 900);
    }

    /* =====================================================
       FLOATING HEARTS
       ===================================================== */

    let heartInterval = null;

    function startFloatingHearts() {
        if (heartInterval) return;

        heartInterval = setInterval(() => {
            createFloatingHeart();
        }, 1400);
    }

    function createFloatingHeart() {
        const heart = document.createElement("div");

        heart.className = "floating-heart";

        const hearts = ["♥", "♡", "❤", "💕", "✦"];

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            `${Math.random() * 100}vw`;

        heart.style.fontSize =
            `${12 + Math.random() * 18}px`;

        heart.style.animationDuration =
            `${5 + Math.random() * 5}s`;

        heart.style.opacity =
            `${0.25 + Math.random() * 0.55}`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    /* =====================================================
       HEART BURST
       ===================================================== */

    function createHeartBurst() {
        const symbols = ["♥", "❤", "💕", "♡", "✦"];

        for (let i = 0; i < 16; i++) {
            const heart = document.createElement("div");

            heart.className = "burst-heart";

            heart.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.left = "50%";
            heart.style.top = "50%";

            const angle =
                (Math.PI * 2 * i) / 16;

            const distance =
                80 + Math.random() * 180;

            heart.style.setProperty(
                "--x",
                `${Math.cos(angle) * distance}px`
            );

            heart.style.setProperty(
                "--y",
                `${Math.sin(angle) * distance}px`
            );

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1200);
        }
    }

    /* =====================================================
       GALLERY
       ===================================================== */

    window.openGallery = function (index) {
        galleryIndex = index;

        updateGallery();

        const popup =
            document.getElementById("galleryPopup");

        if (!popup) return;

        popup.classList.add("show");
        popup.style.display = "flex";

        document.body.classList.add("popup-open");

        createHeartBurst();
    };

    window.closeGallery = function () {
        const popup =
            document.getElementById("galleryPopup");

        if (!popup) return;

        popup.classList.remove("show");

        setTimeout(() => {
            popup.style.display = "none";
        }, 350);

        document.body.classList.remove("popup-open");
    };

    function updateGallery() {
        const image =
            document.getElementById("popupPhoto");

        const number =
            document.getElementById("photoNumber");

        if (!image) return;

        image.style.opacity = "0";
        image.style.transform =
            "scale(.92)";

        setTimeout(() => {
            image.src =
                galleryImages[galleryIndex];

            image.onload = () => {
                image.style.opacity = "1";
                image.style.transform =
                    "scale(1)";
            };
        }, 120);

        if (number) {
            number.textContent =
                `${galleryIndex + 1} / ${galleryImages.length}`;
        }
    }

    window.nextPhoto = function () {
        galleryIndex++;

        if (galleryIndex >= galleryImages.length) {
            galleryIndex = 0;
        }

        updateGallery();
        playSoftTone();
    };

    window.prevPhoto = function () {
        galleryIndex--;

        if (galleryIndex < 0) {
            galleryIndex = galleryImages.length - 1;
        }

        updateGallery();
        playSoftTone();
    };

    /* =====================================================
       GALLERY KEYBOARD
       ===================================================== */

    document.addEventListener("keydown", function (event) {
        const popup =
            document.getElementById("galleryPopup");

        if (
            popup &&
            popup.classList.contains("show")
        ) {
            if (event.key === "ArrowRight") {
                nextPhoto();
            }

            if (event.key === "ArrowLeft") {
                prevPhoto();
            }

            if (event.key === "Escape") {
                closeGallery();
            }
        }

        if (event.key === "Escape") {
            closeAllPopups();
        }
    });

    /* =====================================================
       GALLERY SWIPE
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const galleryPopup =
        document.getElementById("galleryPopup");

    if (galleryPopup) {
        galleryPopup.addEventListener(
            "touchstart",
            e => {
                touchStartX =
                    e.changedTouches[0].screenX;
            },
            { passive: true }
        );

        galleryPopup.addEventListener(
            "touchend",
            e => {
                touchEndX =
                    e.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;

                if (Math.abs(distance) < 50) return;

                if (distance < 0) {
                    nextPhoto();
                } else {
                    prevPhoto();
                }
            },
            { passive: true }
        );
    }

    /* =====================================================
       GALLERY BACKGROUND CLICK
       ===================================================== */

    if (galleryPopup) {
        galleryPopup.addEventListener("click", function (e) {
            if (e.target === galleryPopup) {
                closeGallery();
            }
        });
    }

    /* =====================================================
       FOREVER POPUP
       ===================================================== */

    window.showForever = function () {
        const popup =
            document.getElementById("foreverPopup");

        if (!popup) return;

        popup.classList.add("show");
        popup.style.display = "flex";

        document.body.classList.add("popup-open");

        typeForeverMessage();

        createHeartBurst();
    };

    window.closeForever = function () {
        const popup =
            document.getElementById("foreverPopup");

        if (!popup) return;

        popup.classList.remove("show");

        setTimeout(() => {
            popup.style.display = "none";
        }, 350);

        document.body.classList.remove("popup-open");
    };

    function typeForeverMessage() {
        const title =
            document.getElementById("typingTitle");

        const message =
            document.getElementById("typingMessage");

        if (!title || !message) return;

        const titleText =
            "Untuk Selamanya, Fasha ❤️";

        const messageText =
            "Kalau suatu hari nanti semuanya berubah, " +
            "aku tetap ingin menjadi seseorang yang " +
            "memilih kamu lagi dan lagi. " +
            "Terima kasih sudah hadir dan membuat " +
            "duniaku terasa jauh lebih indah.";

        title.textContent = "";
        message.textContent = "";

        typeText(title, titleText, 70, () => {
            typeText(message, messageText, 25);
        });
    }

    function typeText(element, text, speed, callback) {
        let index = 0;

        function write() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;

                setTimeout(write, speed);
            } else if (callback) {
                callback();
            }
        }

        write();
    }

    /* =====================================================
       BIRTHDAY SURPRISE
       ===================================================== */

    window.birthdaySurprise = function () {
        const popup =
            document.getElementById("birthdayPopup");

        if (!popup) return;

        popup.classList.add("show");
        popup.style.display = "flex";

        document.body.classList.add("popup-open");

        launchConfetti();
        createHeartBurst();
        playBirthdaySound();
    };

    window.closeBirthday = function () {
        const popup =
            document.getElementById("birthdayPopup");

        if (!popup) return;

        popup.classList.remove("show");

        setTimeout(() => {
            popup.style.display = "none";
        }, 350);

        document.body.classList.remove("popup-open");
    };

    /* =====================================================
       CONFETTI
       ===================================================== */

    function launchConfetti() {
        const symbols = [
            "♥",
            "❤",
            "✦",
            "✧",
            "★",
            "♡",
            "💕"
        ];

        for (let i = 0; i < 70; i++) {
            const confetti =
                document.createElement("div");

            confetti.className = "confetti";

            confetti.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            confetti.style.left =
                `${Math.random() * 100}vw`;

            confetti.style.top =
                `${-20 - Math.random() * 100}px`;

            confetti.style.fontSize =
                `${10 + Math.random() * 20}px`;

            confetti.style.animationDuration =
                `${3 + Math.random() * 4}s`;

            confetti.style.animationDelay =
                `${Math.random() * .8}s`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 8000);
        }
    }

    /* =====================================================
       BIRTHDAY SOUND
       ===================================================== */

    function playBirthdaySound() {
        try {
            if (!audioContext) {
                audioContext =
                    new (window.AudioContext ||
                        window.webkitAudioContext)();
            }

            const notes = [
                523.25,
                659.25,
                783.99,
                1046.5
            ];

            notes.forEach((frequency, index) => {
                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();

                oscillator.type = "sine";
                oscillator.frequency.value = frequency;

                const start =
                    audioContext.currentTime +
                    index * 0.15;

                gain.gain.setValueAtTime(
                    0.0001,
                    start
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.08,
                    start + 0.04
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    start + 0.55
                );

                oscillator.connect(gain);
                gain.connect(audioContext.destination);

                oscillator.start(start);
                oscillator.stop(start + 0.6);
            });
        } catch (error) {
            console.log("Birthday sound diblokir browser.");
        }
    }

    /* =====================================================
       HEART PAGE CANVAS
       ===================================================== */

    const canvas =
        document.getElementById("canvas");

    if (canvas) {
        initializeHeartCanvas();
    }

    function initializeHeartCanvas() {
        const ctx =
            canvas.getContext("2d");

        let particles = [];

        function resizeCanvas() {
            canvas.width =
                canvas.clientWidth ||
                window.innerWidth;

            canvas.height =
                canvas.clientHeight ||
                window.innerHeight;
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 1 + Math.random() * 3,
                speed: 0.2 + Math.random() * 0.8,
                alpha: 0.2 + Math.random() * 0.7
            });
        }

        function draw() {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach(p => {
                p.y -= p.speed;

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x =
                        Math.random() *
                        canvas.width;
                }

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255, 145, 190, ${p.alpha})`;

                ctx.shadowBlur = 10;

                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

    /* =====================================================
       SECRET LOVE KEY
       ===================================================== */

    let secretInput = "";

    document.addEventListener("keydown", event => {
        if (event.key.length === 1) {
            secretInput +=
                event.key.toUpperCase();

            if (secretInput.length > 10) {
                secretInput =
                    secretInput.slice(-10);
            }

            if (secretInput.includes("LOVE")) {
                secretInput = "";

                createHeartBurst();

                setTimeout(() => {
                    showForever();
                }, 400);
            }
        }
    });

    /* =====================================================
       CLOSE ALL POPUPS
       ===================================================== */

    function closeAllPopups() {
        if (
            document
                .getElementById("galleryPopup")
                ?.classList.contains("show")
        ) {
            closeGallery();
        }

        if (
            document
                .getElementById("foreverPopup")
                ?.classList.contains("show")
        ) {
            closeForever();
        }

        if (
            document
                .getElementById("birthdayPopup")
                ?.classList.contains("show")
        ) {
            closeBirthday();
        }
    }

    /* =====================================================
       POPUP BACKGROUND CLICK
       ===================================================== */

    const foreverPopup =
        document.getElementById("foreverPopup");

    if (foreverPopup) {
        foreverPopup.addEventListener("click", e => {
            if (e.target === foreverPopup) {
                closeForever();
            }
        });
    }

    const birthdayPopup =
        document.getElementById("birthdayPopup");

    if (birthdayPopup) {
        birthdayPopup.addEventListener("click", e => {
            if (e.target === birthdayPopup) {
                closeBirthday();
            }
        });
    }

    /* =====================================================
       IMAGE ERROR HANDLER
       ===================================================== */

    document.addEventListener(
        "error",
        function (event) {
            if (
                event.target.tagName === "IMG"
            ) {
                event.target.classList.add(
                    "image-error"
                );
            }
        },
        true
    );

    /* =====================================================
       INITIAL STATE
       ===================================================== */

    document
        .querySelectorAll(".screen")
        .forEach(page => {
            if (
                !page.classList.contains("active")
            ) {
                page.style.pointerEvents = "none";
            } else {
                page.style.pointerEvents = "auto";
            }
        });

    startFloatingHearts();

    console.log(
        "💗 Semua fitur interaktif berhasil dimuat."
    );
});
/* =========================================================
   FASHA CINEMATIC SURPRISE
   DOES NOT TOUCH ORIGINAL WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cinematic =
        document.getElementById("fashaCinematic");

    const cinematicButton =
        document.getElementById("fashaCinematicStart");


    if (!cinematic || !cinematicButton) {
        return;
    }


    cinematicButton.addEventListener("click", () => {

        /* sedikit delay supaya terasa cinematic */

        cinematicButton.style.transform =
            "scale(.92)";

        cinematicButton.style.opacity =
            "0";


        setTimeout(() => {

            /* tutup cinematic */

            cinematic.classList.add(
                "fasha-hide"
            );


            /* kembalikan button setelah selesai */

            setTimeout(() => {

                cinematicButton.style.transform =
                    "";

                cinematicButton.style.opacity =
                    "";

            }, 1000);


        }, 250);

    });

});