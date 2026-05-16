let i = 0,
  eP = 0,
  S = document.querySelectorAll(".slide"),
  D = document.querySelectorAll(".dot"),
  H = document.getElementById("header-section"),
  B = document.getElementById("backTop"),
  M = document.getElementById("mobileMenu"),
  hb = document.getElementById("hamburgerBtn");
function goToSlide(n) {
  S[i].classList.remove("active");
  D[i].classList.remove("active");
  i = (n + S.length) % S.length;
  S[i].classList.add("active");
  D[i].classList.add("active");
}
function moveSlide(d) {
  goToSlide(i + d);
}
setInterval(() => moveSlide(1), 5000);
function switchTab(id, btn) {
  document
    .querySelectorAll(".tab-content,.tab-btn")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}
function moveEvents(d) {
  let t = document.getElementById("eventsTrack"),
    w = t.querySelector(".event-card").offsetWidth + 24,
    m = -(t.children.length - 3) * w;
  eP = Math.min(0, Math.max(m, eP - d * w));
  t.style.transform = `translateX(${eP}px)`;
}
document.querySelectorAll(".stat-num[data-target]").forEach((el) => {
  let o = new IntersectionObserver(
    (e) => {
      if (e[0].isIntersecting) {
        let tg = +el.dataset.target,
          sx = el.querySelector("span").textContent,
          c = 0,
          s = Math.ceil(tg / 80),
          t = setInterval(() => {
            c = Math.min(c + s, tg);
            el.innerHTML = c.toLocaleString() + "<span>" + sx + "</span>";
            if (c >= tg) clearInterval(t);
          }, 18);
        o.disconnect();
      }
    },
    { threshold: 0.5 },
  );
  o.observe(el);
});
window.addEventListener(
  "scroll",
  () => {
    let y = window.scrollY;
    H.classList.toggle("scrolled", y > 50);
    B.classList.toggle("visible", y > 300);
  },
  { passive: true },
);
function openMobileMenu() {
  M.classList.add("open");
  hb.classList.add("open");
}
function closeMobileMenu() {
  M.classList.remove("open");
  hb.classList.remove("open");
}
function toggleMobileSubmenu() {
  let s = document.getElementById("pagesSubmenu"),
    ic = document.getElementById("submenuIcon");
  s.classList.toggle("open");
  ic.style.transform = s.classList.contains("open") ? "rotate(180deg)" : "";
}
hb.addEventListener("click", openMobileMenu);
document
  .getElementById("mobileClose")
  .addEventListener("click", closeMobileMenu);
document
  .getElementById("mobileBackdrop")
  .addEventListener("click", closeMobileMenu);
