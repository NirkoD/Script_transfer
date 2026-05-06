(function() {

  const STORAGE_DATE = "modal_last_shown_date";

  // =========================
  // ОКНО 1 — 1 раз в день
  // =========================
  function shouldShowModalOncePerDay() {
    const today = new Date().toISOString().split("T")[0];
    const last = localStorage.getItem(STORAGE_DATE);

    if (last === today) return false;

    localStorage.setItem(STORAGE_DATE, today);
    return true;
  }

  function createModal() {

    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="box">
        <h2>Сайт больше не работает</h2>

        <p>
          Публикация новой информации прекращена<br>
          <b>31 марта 2026 года</b>.
        </p>

        <div class="buttons">
          <button id="goBtn">Перейти на новый сайт</button>
          <button id="closeBtn">Понятно</button>
        </div>
      </div>
    `;

    overlay.style = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.6);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:999999;
      font-family:Arial,sans-serif;
    `;

    overlay.querySelector(".box").style = `
      background:#fff;
      padding:24px;
      border-radius:16px;
      max-width:380px;
      text-align:center;
      box-shadow:0 10px 30px rgba(0,0,0,0.2);
    `;

    document.documentElement.appendChild(overlay);

    document.getElementById("goBtn").onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    document.getElementById("closeBtn").onclick = () => {
      overlay.remove();
    };
  }

  // =========================
  // ОКНО 2 — ВСЕ СТРАНИЦЫ
  // =========================
  function createBottomBar() {

    const bar = document.createElement("div");
    bar.id = "floatingBar";

    bar.innerHTML = `
      <div class="wrap">
        <div class="text">
          Публикация информации прекращена <b>31 марта 2026 года</b>
        </div>

        <button id="reopenBtn">Подробнее</button>
      </div>
    `;

    document.documentElement.appendChild(bar);

    bar.style = `
      position:fixed;
      bottom:20px;
      left:50%;
      transform:translateX(-50%);
      width:min(720px, calc(100% - 20px));
      background:#fff;
      border-radius:16px;

      /* ✔ лёгкий контур */
      border:1px solid rgba(0,0,0,0.06);

      /* ✔ мягкая тень */
      box-shadow:
        0 12px 30px rgba(0,0,0,0.12),
        0 1px 0 rgba(255,255,255,0.7) inset;

      z-index:999998;
      font-family:Arial,sans-serif;

      animation: floatUpDown 4s ease-in-out infinite;
      transition: transform 0.3s ease;
    `;

    bar.querySelector(".wrap").style = `
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:14px 16px;
      gap:12px;
    `;

    bar.querySelector(".text").style = `
      font-size:14px;
      color:#222;
    `;

    const btn = bar.querySelector("#reopenBtn");

    btn.style = `
      border:none;
      padding:10px 14px;
      border-radius:12px;
      cursor:pointer;
      color:#fff;
      font-weight:500;
      background: linear-gradient(135deg, #34d399, #10b981);
      box-shadow:0 6px 14px rgba(16,185,129,0.25);
      transition: all 0.2s ease;
    `;

    btn.onmouseover = () => btn.style.transform = "scale(1.05)";
    btn.onmouseout = () => btn.style.transform = "scale(1)";

    btn.onclick = () => {
      if (!document.getElementById("redirModal")) {
        createModal();
      }
    };

    // лёгкое “плавание при скролле”
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * 0.01;
      bar.style.transform = `translateX(-50%) translateY(${offset}px)`;
    });

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatUpDown {
        0% { transform: translateX(-50%) translateY(0px); }
        50% { transform: translateX(-50%) translateY(-5px); }
        100% { transform: translateX(-50%) translateY(0px); }
      }
    `;
    document.head.appendChild(style);
  }

  // =========================
  // INIT — ВАЖНО (без условий страниц)
  // =========================
  function init() {

    // Окно 2 ВСЕГДА
    createBottomBar();

    // Окно 1 — раз в день
    if (shouldShowModalOncePerDay()) {
      createModal();
    }
  }

  // гарантированный запуск
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
