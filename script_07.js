(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";
  const STORAGE_DATE = "modal_last_shown_date";

  // =========================
  // ОКНО 1 — раз в день
  // =========================
  function shouldShowModalOncePerDay() {
    const today = new Date().toISOString().split("T")[0];
    const last = localStorage.getItem(STORAGE_DATE);

    if (last === today) return false;

    localStorage.setItem(STORAGE_DATE, today);
    return true;
  }

  // =========================
  // АНИМАЦИЯ ОТКРЫТИЯ
  // =========================
  function animateShow(el) {
    requestAnimationFrame(() => {
      el.classList.add("show");
    });
  }

  function animateClose(el) {
    el.classList.remove("show");
    el.classList.add("hide");

    setTimeout(() => {
      el.remove();
    }, 250);
  }

  // =========================
  // ОКНО 1
  // =========================
  function createModal() {

    const overlay = document.createElement("div");
    overlay.id = "redirModal";
    overlay.classList.add("modal");

    overlay.innerHTML = `
      <div class="box">

        <div class="logoWrap">
          <img src="${LOGO_URL}" class="logo">
        </div>

        <h2>Уведомление</h2>

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

    document.documentElement.appendChild(overlay);
    animateShow(overlay);

    const goBtn = overlay.querySelector("#goBtn");
    const closeBtn = overlay.querySelector("#closeBtn");

    goBtn.onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    closeBtn.onclick = () => {
      animateClose(overlay);
    };
  }

  // =========================
  // ОКНО 2
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

    const btn = bar.querySelector("#reopenBtn");

    btn.onclick = () => {
      if (!document.getElementById("redirModal")) {
        createModal();
      }
    };
  }

  // =========================
  // CSS (анимации + стили)
  // =========================
  function injectStyles() {

    const style = document.createElement("style");

    style.innerHTML = `
      /* ===== MODAL ANIMATION ===== */

      .modal {
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999999;
        font-family:'Segoe UI', Roboto, Arial, sans-serif;

        opacity:0;
        transform:scale(1.08);
        transition: all 0.25s ease;
      }

      .modal.show {
        opacity:1;
        transform:scale(1);
      }

      .modal.hide {
        opacity:0;
        transform:scale(0.92);
      }

      .box {
        background:#fff;
        padding:32px;
        border-radius:18px;
        max-width:560px;
        width:92%;
        box-shadow:0 20px 50px rgba(0,0,0,0.25);
        text-align:center;
      }

      .logoWrap {
        display:flex;
        justify-content:center;
        margin-bottom:14px;
      }

      .logo {
        width:110px;
        height:110px;
        object-fit:contain;
        background:transparent;
        border-radius:14px;
      }

      h2 {
        margin:0 0 12px;
        font-size:22px;
        font-weight:700;
        color:#111;
      }

      .content {
        font-size:14px;
        line-height:1.6;
        color:#333;
        margin-bottom:22px;
      }

      .buttons {
        display:flex;
        justify-content:center;
        gap:12px;
      }

      button {
        border:none;
        padding:11px 16px;
        border-radius:12px;
        cursor:pointer;
        color:#fff;
        font-weight:600;
        transition: all 0.25s ease;
      }

      #goBtn {
        background: linear-gradient(135deg, #34d399, #10b981);
        box-shadow:0 8px 18px rgba(16,185,129,0.25);
      }

      #closeBtn {
        background: linear-gradient(135deg, #60a5fa, #3b82f6);
        box-shadow:0 8px 18px rgba(59,130,246,0.25);
      }

      button:hover {
        transform:translateY(-2px) scale(1.04);
      }
    `;

    document.head.appendChild(style);
  }

  // =========================
  // INIT
  // =========================
  function init() {

    injectStyles();
    createBottomBar();

    if (shouldShowModalOncePerDay()) {
      setTimeout(createModal, 300); // лёгкий fade-in эффект
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
