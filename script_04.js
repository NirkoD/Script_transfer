(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";

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

  // =========================
  // ОКНО 1 (ЦЕНТРАЛЬНОЕ)
  // =========================
  function createModal() {

    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="box">

        <div class="header">
          <img src="${LOGO_URL}" class="logo">

          <div class="title">
            <h2>Уведомление</h2>
            <p class="sub">Важная информация о работе сайта</p>
          </div>
        </div>

        <div class="content">
          Информация на сайте перестала обновляться <b>31 марта 2026 года</b>.<br><br>

          Сайт продолжает работу до <b>10 октября 2026 года</b>, после чего будет полностью закрыт и недоступен.<br><br>

          Вся информация перенесена на официальный сайт техникума.
        </div>

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
      font-family:'Segoe UI', Roboto, Arial, sans-serif;
    `;

    const box = overlay.querySelector(".box");

    box.style = `
      background:#fff;
      padding:28px;
      border-radius:18px;
      max-width:520px;
      width:92%;
      box-shadow:0 20px 50px rgba(0,0,0,0.25);
    `;

    // HEADER
    overlay.querySelector(".header").style = `
      display:flex;
      align-items:center;
      gap:14px;
      margin-bottom:18px;
    `;

    overlay.querySelector(".logo").style = `
      width:64px;
      height:64px;
      border-radius:12px;
      object-fit:cover;
      box-shadow:0 6px 18px rgba(0,0,0,0.15);
    `;

    overlay.querySelector(".title h2").style = `
      margin:0;
      font-size:20px;
      font-weight:700;
      color:#111;
    `;

    overlay.querySelector(".sub").style = `
      margin:2px 0 0;
      font-size:13px;
      color:#666;
    `;

    // CONTENT
    overlay.querySelector(".content").style = `
      font-size:14px;
      line-height:1.6;
      color:#333;
      margin-bottom:20px;
    `;

    // BUTTONS
    overlay.querySelector(".buttons").style = `
      display:flex;
      gap:10px;
      justify-content:flex-end;
    `;

    const goBtn = overlay.querySelector("#goBtn");
    const closeBtn = overlay.querySelector("#closeBtn");

    goBtn.style = `
      border:none;
      padding:10px 14px;
      border-radius:12px;
      cursor:pointer;
      color:#fff;
      font-weight:600;
      background: linear-gradient(135deg, #34d399, #10b981);
      box-shadow:0 8px 18px rgba(16,185,129,0.25);
      transition: all 0.25s ease;
    `;

    closeBtn.style = `
      border:none;
      padding:10px 14px;
      border-radius:12px;
      cursor:pointer;
      color:#fff;
      font-weight:600;
      background: linear-gradient(135deg, #60a5fa, #3b82f6);
      box-shadow:0 8px 18px rgba(59,130,246,0.25);
      transition: all 0.25s ease;
    `;

    function hover(btn, shadow) {
      btn.onmouseover = () => {
        btn.style.transform = "translateY(-2px) scale(1.03)";
        btn.style.boxShadow = shadow;
      };
      btn.onmouseout = () => {
        btn.style.transform = "translateY(0) scale(1)";
      };
    }

    hover(goBtn, "0 12px 24px rgba(16,185,129,0.35)");
    hover(closeBtn, "0 12px 24px rgba(59,130,246,0.35)");

    goBtn.onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    closeBtn.onclick = () => {
      overlay.remove();
    };

    document.documentElement.appendChild(overlay);
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
      border:1px solid rgba(0,0,0,0.06);
      box-shadow:0 12px 30px rgba(0,0,0,0.12);
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
      box-shadow:0 8px 18px rgba(16,185,129,0.25);
      transition: all 0.2s ease;
    `;

    btn.onmouseover = () => {
      btn.style.transform = "scale(1.05)";
    };

    btn.onmouseout = () => {
      btn.style.transform = "scale(1)";
    };

    btn.onclick = () => {
      if (!document.getElementById("redirModal")) {
        createModal();
      }
    };

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
  // INIT
  // =========================
  function init() {

    createBottomBar();

    if (shouldShowModalOncePerDay()) {
      createModal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
