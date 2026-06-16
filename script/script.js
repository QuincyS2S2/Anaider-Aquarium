$(function () {

    AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });

    /* HEADER */
    $(window).on("scroll.header", function () {
        if ($(this).scrollTop() > 40) { $("#site-header").addClass("scrolled"); }
        else { $("#site-header").removeClass("scrolled"); }
    });

    /* NAV */
    var navTimer;
    $(".navi > li").on("mouseenter", function () {
        clearTimeout(navTimer);
        $(".navi > li").not(this).find(".submenu").stop(true,true).slideUp(150);
        $(this).find(".submenu").stop(true,true).slideDown(220);
    });
    $(".navi").on("mouseleave", function () {
        navTimer = setTimeout(function () {
            $(".submenu").stop(true,true).slideUp(180);
        }, 60);
    });

    /* CAROUSEL (Swiper) */
    var heroSwiper = new Swiper(".heroSwiper", {
        loop: true,
        speed: 1000,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        }
    });

    /* STATS COUNT-UP */
    var counted = false;
    function doCountUp() {
        if (counted) return;
        var $s = $(".stats");
        if (!$s.length) return;
        if ($(window).scrollTop() + $(window).height() > $s.offset().top + 60) {
            counted = true;
            $(".stat-num").each(function () {
                var $el = $(this);
                var target = parseInt($el.data("target"), 10);
                var dur = 1800; var start = null;
                (function tick(ts) {
                    if (!start) start = ts;
                    var p = Math.min((ts - start) / dur, 1);
                    var v = 1 - Math.pow(1 - p, 3);
                    $el.text(Math.round(v * target).toLocaleString("ko-KR"));
                    if (p < 1) requestAnimationFrame(tick);
                })(performance.now());
            });
        }
    }
    $(window).on("scroll.countup", doCountUp);
    doCountUp();

    /* MODAL */
    function openModal()  { $(".modal").addClass("active"); }
    function closeModal() { $(".modal").removeClass("active"); }
    $(".notice li:first-child a").on("click", function (e) { e.preventDefault(); openModal(); });
    $(".btn, .modal-x").on("click", closeModal);
    $(".modal").on("click", function (e) { if ($(e.target).hasClass("modal")) closeModal(); });
    $(document).on("keydown", function (e) { if (e.key === "Escape") closeModal(); });
    /* 자동 팝업 제거 - 클릭 시에만 열림 */

});
