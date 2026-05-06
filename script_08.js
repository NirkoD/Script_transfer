(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";
  const STORAGE_DATE = "modal_last_shown_date";

  // =========================
  // SAFE CHECK
  // =========================
  if (!document || !document.documentElement) return;

  function shouldShowModalOncePerDay() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const last = localStorage.getItem(STORAGE_DATE);

      if (last === today) return false;

      localStorage.setItem(STORAGE_DATE, today);
      return true;
    } catch (e) {
      return true;
    }
  }

  // =========================
  // MODAL
  // =========================
  function createModal() {

    if (document.getElementById("redirModal")) return;

    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="rm-box">

        <div class="rm-logoWrap">
          <img src="${LOGO_URL}" class="rm-logo">
        </div>

        <h2 class="rm-title">Уведомление</h2>

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

    // OPEN ANIMATION
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.style.transform = "scale(1)";
    });

    const go = overlay.querySelector("#rmGo");
    const close = overlay.querySelector("#rmClose");

    go.onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    close.onclick = () => {
      overlay.style.opacity = "0";
      overlay.style.transform = "scale(0.95)";
      setTimeout(() => overlay.remove(), 200);
    };
  }

  // =========================
  // BOTTOM BAR
  // =========================
  function createBottomBar() {

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

    const btn = bar.querySelector("#fbBtn");

    btn.onclick = () => {
      createModal();
    };
  }

  // =========================
  // SAFE STYLES (NO GLOBAL IMPACT)
  // =========================
  function injectStyles() {

    const style = document.createElement("style");

    style.innerHTML = `
      #redirModal {
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999999;

        opacity:0;
        transform:scale(1.05);
        transition: all 0.25s ease;
        font-family:Segoe UI, Arial, sans-serif;
      }

      .rm-box {
        background:#fff;
        padding:30px;
        border-radius:18px;
        width:92%;
        max-width:560px;
        text-align:center;
        box-shadow:0 20px 50px rgba(0,0,0,0.25);
      }

      .rm-logoWrap {
        display:flex;
        justify-content:center;
        margin-bottom:12px;
      }

      .rm-logo {
        width:110px;
        height:110px;
        object-fit:contain;
        background:transparent;
      }

      .rm-title {
        margin:0 0 10px;
        font-size:22px;
        font-weight:700;
      }

      .rm-content {
        font-size:14px;
        line-height:1.6;
        color:#333;
        margin-bottom:20px;
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
        transition: all 0.2s ease;
      }

      #rmGo {
        background:linear-gradient(135deg,#34d399,#10b981);
      }

      #rmClose {
        background:linear-gradient(135deg,#60a5fa,#3b82f6);
      }

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
      setTimeout(createModal, 300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
