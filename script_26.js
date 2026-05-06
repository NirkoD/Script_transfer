(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";
  const STORAGE_DATE = "modal_last_shown_date";

  function shouldShowModalOncePerDay() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const last = localStorage.getItem(STORAGE_DATE);

      if (last === today) return false;

      localStorage.setItem(STORAGE_DATE, today);
      return true;
    } catch {
      return true;
    }
  }

  // =========================
  // ОКНО 1 + BLUR SAFE
  // =========================
  function createModal() {

    if (document.getElementById("redirModal")) return;

    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="rm-box">

        <div class="rm-logoWrap">
          <img src="${LOGO_URL}" class="rm-logo" onload="this.style.opacity=1" onerror="this.style.display='none'">
        </div>

        <h2>Уведомление</h2>

        <div class="rm-content">
          Информация на сайте перестала обновляться <b>31 марта 2026 года</b>.<br><br>

          Сайт продолжает работу до <b>10 октября 2026 года</b>, после чего будет закрыт.<br><br>

          Вся информация перенесена на официальный сайт техникума.
        </div>

        <div class="rm-buttons">
          <button id="rmGo">Перейти на новый сайт</button>
          <button id="rmClose">Понятно</button>
        </div>

      </div>
    `;

    document.documentElement.appendChild(overlay);

    // 🔥 включаем blur безопасно (через класс)
    requestAnimationFrame(() => {
      overlay.classList.add("show");
      const scrollBarCompensation = window.innerWidth - document.documentElement.clientWidth;

document.body.style.paddingRight = scrollBarCompensation + "px";
document.body.classList.add("blur-active");
    });

    overlay.querySelector("#rmGo").onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    overlay.querySelector("#rmClose").onclick = () => {

      const box = overlay.querySelector(".rm-box");

      box.style.opacity = "0";
      box.style.transform = "translateY(10px)";
      overlay.style.opacity = "0";

      document.body.classList.remove("blur-active");
      document.body.style.paddingRight = "";

      setTimeout(() => overlay.remove(), 200);
    };
  }

  // =========================
  // ОКНО 2 (ПАРЕНИЕ)
  // =========================
  function createBottomBar() {

    if (document.getElementById("floatingBar")) return;

    const bar = document.createElement("div");
    bar.id = "floatingBar";

    bar.innerHTML = `
      <div class="fb-wrap">
        <div class="fb-text">
          Публикация информации прекращена <b>31 марта 2026 года</b>
        </div>

        <button id="fbBtn">Подробнее</button>
      </div>
    `;

    document.documentElement.appendChild(bar);

    bar.querySelector("#fbBtn").onclick = createModal;
  }

  // =========================
  // STYLES (SAFE BLUR VERSION)
  // =========================
  function injectStyles() {

    const style = document.createElement("style");

    style.innerHTML = `

      /* ================= BLUR SAFE ================= */
      body.blur-active > *:not(#redirModal):not(#redirModal *) {
        filter: blur(4px);
        transition: filter 0.25s ease;
      }

      body.blur-active {
        overflow:hidden;
      }

      /* ================= MODAL ================= */
      #redirModal {
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.45);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999999;
        font-family:Segoe UI, Arial;

        opacity:0;
        transition:opacity 0.22s ease;
      }

      #redirModal.show {
        opacity:1;
      }

      .rm-box {
        background:#fff;
        padding:32px;
        border-radius:18px;
        max-width:560px;
        width:92%;
        text-align:center;
        box-shadow:0 20px 50px rgba(0,0,0,0.25);
        transition:all 0.2s ease;
      }

      .rm-logoWrap {
        display:flex;
        justify-content:center;
        margin-bottom:14px;
      }

      .rm-logo {
        width:120px;
        height:120px;
        object-fit:contain;
        opacity:0;
        transition:opacity 0.3s ease;
      }

      .rm-content {
        font-size:14px;
        line-height:1.6;
        margin-bottom:20px;
        color:#333;
      }

      .rm-buttons {
        display:flex;
        justify-content:center;
        gap:12px;
      }

      #rmGo, #rmClose {
        border:none;
        padding:11px 16px;
        border-radius:12px;
        cursor:pointer;
        color:#fff;
        font-weight:600;
        transition:all 0.2s ease;
      }

      #rmGo {
        background:linear-gradient(135deg,#34d399,#10b981);
      }

      #rmClose {
        background:linear-gradient(135deg,#60a5fa,#3b82f6);
      }

      #rmGo:hover, #rmClose:hover {
        transform:translateY(-2px) scale(1.04);
      }

      /* ================= BOTTOM BAR ================= */
      #floatingBar {
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

        animation: floatY 4s ease-in-out infinite;
      }

      .fb-wrap {
        display:flex;
        justify-content:space-between;
        padding:14px 16px;
        align-items:center;
      }

      #fbBtn {
        border:none;
        padding:10px 14px;
        border-radius:12px;
        cursor:pointer;
        color:#fff;
        background:linear-gradient(135deg,#34d399,#10b981);
        transition:all 0.2s ease;
      }

      #fbBtn:hover {
        transform:translateY(-2px) scale(1.05);
        box-shadow:0 10px 18px rgba(16,185,129,0.25);
      }

      @keyframes floatY {
        0%   { transform:translateX(-50%) translateY(0px); }
        50%  { transform:translateX(-50%) translateY(-6px); }
        100% { transform:translateX(-50%) translateY(0px); }
      }

    `;

    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    createBottomBar();

    if (shouldShowModalOncePerDay()) {
      setTimeout(createModal, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
