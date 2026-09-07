/* =====================================================
   OPEN INVITATION + MUSIC
===================================================== */

const opening =
    document.getElementById("opening");

const openButton =
    document.getElementById("openInvitation");

const invitation =
    document.getElementById("invitation");

const music =
    document.getElementById("weddingMusic");

const musicBtn =
    document.getElementById("musicBtn");


if (openButton && opening && invitation) {

    openButton.addEventListener("click", function () {

        /* تشغيل الموسيقى تلقائياً */
        if (music) {

            music.play()
                .then(function () {

                    console.log("Music started");

                    if (musicBtn) {
                        musicBtn.classList.remove("paused");
                    }

                })
                .catch(function (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                });
        }


        /* فتح الباب */
        opening.classList.add("opened");


        /* إظهار الدعوة */
        setTimeout(function () {

            invitation.classList.add("show");

        }, 450);


        /* إخفاء شاشة البداية */
        setTimeout(function () {

            opening.classList.add("hidden");

        }, 1100);

    });

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicBtn && music) {

    musicBtn.addEventListener("click", function () {

        if (music.paused) {

            music.play();

            musicBtn.classList.remove("paused");

        } else {

            music.pause();

            musicBtn.classList.add("paused");

        }

    });

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   COUNTDOWN
===================================================== */


    const engagementDate =
        new Date("october 22, 2026 19:00:00").getTime();





function updateCountdown() {

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }



    if (!engagementDate) {

        daysElement.textContent = "--";
        hoursElement.textContent = "--";
        minutesElement.textContent = "--";
        secondsElement.textContent = "--";

        return;
    }


    const now =
        new Date().getTime();


    const difference =
        engagementDate - now;


    /* لو الموعد وصل */

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    /* Days */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* Hours */

    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    /* Minutes */

    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    /* Seconds */

    const seconds =
        Math.floor(
            (difference %
                (1000 * 60))
            /
            1000
        );


    /* Display */

    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const sections =
    document.querySelectorAll(
        "#invitation section"
    );


sections.forEach(function(section) {

    section.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


sections.forEach(function(section) {

    revealObserver.observe(section);

});





/* =====================================================
   WISH → GOOGLE SHEETS
===================================================== */

const sendWish =
    document.getElementById("sendWish");


/* ضعي هنا رابط Google Apps Script */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxiqVn5OE17VAptTQZLc8DTyNPvmPU2xMq9CCFi3yb9xC9sokHFWPmxQJiklQcDCN6gSg/exec";


if (sendWish) {

    sendWish.addEventListener(
        "click",
        async function () {

            const nameElement =
                document.getElementById("guestName");

            const wishElement =
                document.getElementById("guestWish");


            if (!nameElement || !wishElement) {
                return;
            }


            const name =
                nameElement.value.trim();

            const wish =
                wishElement.value.trim();


            /* التأكد من أن البيانات موجودة */

            if (name === "" || wish === "") {

                if (message) {

                    message.textContent =
                        "Please enter your name and your wish 💛";

                }

                return;
            }


            /* منع الضغط أكثر من مرة */

            sendWish.disabled = true;

            sendWish.textContent = "SENDING...";


            /* البيانات التي سيتم إرسالها */

            const guestData = {

                name: name,

                wish: wish,

                createdAt:
                    new Date().toISOString()

            };


            try {

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        body:
                            JSON.stringify(
                                guestData
                            ),

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        }
                    }
                );


                /* رسالة النجاح */

                if (message) {

                    message.textContent =
                        `Thank you ${name}! Your blessing has been received 🌸`;

                }


                /* مسح الفورم */

                nameElement.value = "";

                wishElement.value = "";


            } catch (error) {

                console.error(
                    "Error:",
                    error
                );


                if (message) {

                    message.textContent =
                        "Something went wrong. Please try again 💛";

                }

            }


            sendWish.disabled = false;

            sendWish.textContent =
                "SEND BLESSING";

        }
    );

}