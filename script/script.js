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

    /* CAROUSEL */
    var cur = 0;
    var TOTAL = $(".slidelist > ul > li").length;
    var running = false;
    var autoTimer;

    function goTo(n, isAuto) {
        if (running) return;
        if (!isAuto) clearInterval(autoTimer);
        running = true;
        n = ((n % TOTAL) + TOTAL) % TOTAL;
        $(".slidelist > ul > li").eq(cur).removeClass("active");
        cur = n;

        var $ul = $(".slidelist > ul");
        $ul.css("margin-left", -(n * 100) + "%");
        setTimeout(function () { $(".slidelist > ul > li").eq(cur).addClass("active"); }, 180);
        $(".dot").removeClass("active").eq(cur).addClass("active");

        /* CSS margin-left transition(0.8s)에 맞춘 잠금 해제 */
        setTimeout(function () {
            running = false;
            if (!isAuto) startAuto();
        }, 800);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function () { goTo(cur + 1, true); }, 4000);
    }

    $(".slidelist > ul > li").eq(0).addClass("active");
    $(".slide-next").on("click", function () { goTo(cur + 1, false); });
    $(".slide-prev").on("click", function () { goTo(cur - 1, false); });
    $(".dot").on("click", function () { goTo(parseInt($(this).data("idx"), 10), false); });
    $(".hero").on("mouseenter", function () { clearInterval(autoTimer); });
    $(".hero").on("mouseleave", function () { startAuto(); });
    startAuto();

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
