const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s),
  hamburger = $("#hamburger"),
  navMenu = $("#navMenu"),
  typedEl = $("#typedRole"),
  roles = ["Junior Web Developer"],
  F = ["msgName", "msgEmail", "msgSubject", "msgBody"],
  E = ["errName", "errEmail", "errSubject", "errBody"];
let ri = 0,
  ci = 0,
  del = false;

hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", hamburger.classList.contains("open"));
};
$$(".nav-link").forEach(
  (l) =>
    (l.onclick = () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }),
);

function typeLoop() {
  const c = roles[ri];
  typedEl.textContent = c.slice(0, del ? --ci : ++ci);
  if (!del && ci === c.length)
    return setTimeout(() => {
      del = true;
      typeLoop();
    }, 3500);
  if (del && !ci) {
    del = false;
    ri = (ri + 1) % roles.length;
    return setTimeout(typeLoop, 400);
  }
  setTimeout(typeLoop, del ? 40 : 80);
}
setTimeout(typeLoop, 600);

addEventListener("scroll", () => {
  let cur = "";
  $$("section").forEach((s) => scrollY >= s.offsetTop - 80 && (cur = s.id));
  $$(".nav-link").forEach((l) =>
    l.classList.toggle("active", l.hash === "#" + cur),
  );
});

function switchTab(t, b) {
  const y = window.scrollY;
  $("#tab-projects").style.display = t === "projects" ? "block" : "none";
  $("#tab-skills").style.display = t === "skills" ? "block" : "none";
  $$(".tab-btn").forEach((x) => x.classList.toggle("active", x === b));
  // Kunci scroll position agar tidak loncat saat tinggi konten berubah
  window.scrollTo({ top: y, behavior: "instant" });
  t === "skills" &&
    $$(".skill-bar").forEach((b) => {
      b.style.width = "0%";
      setTimeout(() => (b.style.width = b.dataset.width), 80);
    });
}

F.forEach((id, i) =>
  $("#" + id).addEventListener("input", (e) => {
    if (!e.target.value.trim()) return;
    e.target.classList.remove("is-invalid-custom");
    $("#" + E[i]).classList.remove("show");
  }),
);

const chk = (id, ei) => {
  const el = $("#" + id),
    x = !el.value.trim();
  el.classList.toggle("is-invalid-custom", x);
  $("#" + ei).classList.toggle("show", x);
  return !x;
};

function sendMsg(btn) {
  if (F.map((id, i) => chk(id, E[i])).includes(false)) return;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim…';
  btn.style.opacity = ".7";
  btn.disabled = true;
  setTimeout(() => {
    btn.style.background = "linear-gradient(135deg,#16a34a,#4ade80)";
    btn.style.opacity = "1";
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Pesan Terkirim!';
    setTimeout(() => {
      F.forEach((id) => {
        $("#" + id).value = "";
        $("#" + id).classList.remove("is-invalid-custom");
      });
      E.forEach((id) => $("#" + id).classList.remove("show"));
      btn.style.background = "";
      btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
      btn.disabled = false;
    }, 1800);
  }, 900);
}
