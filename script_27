(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";
  const STORAGE_DATE = "modal_last_shown_date";

  if (!document || !document.documentElement) return;

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
  // MODAL
  // =========================
  function createModal() {

    if (document.getElementById("redirModal")) return;

    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="rm-box">

        <div class="rm-logoWrap">
          <img src="${LOGO_URL}" class="rm-logo" onerror="this.style.display='none'">
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

    requestAnimationFrame(() => {
      overlay.classList.add("show");
    });

    const go = overlay.querySelector("#rmGo");
    const close = overlay.querySelector("#rmClose");

    go.onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    close.onclick = () => {
      overlay.classList.add("hide");
      setTimeout(() => overlay.remove(), 280);
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
    btn.onclick = createModal;

    // =========================
    // 🔥 FLOAT ANIMATION (парение)
    // =========================
    let t = 0;

    function floatAnimation() {
      t += 0.02;

      const y = Math.sin(t) * 6; // амплитуда "плавания"

      bar.style.transform = `translateX(-50%) translateY(${y}px)`;

      requestAnimationFrame(floatAnimation);
    }

    requestAnimationFrame(floatAnimation);
  }

  // =========================
  // STYLES
  // =========================
  function injectStyles() {

    const style = document.createElement("style");

    style.innerHTML = `

      /* ===== MODAL ===== */
      #redirModal {
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.55);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:999999;

        opacity:0;
        backdrop-filter: blur(0px);
        transition: opacity 0.28s ease, backdrop-filter 0.28s ease;
        font-family:Segoe UI, Arial, sans-serif;
      }

      #redirModal.show {
        opacity:1;
        backdrop-filter: blur(6px);
      }

      #redirModal.hide {
        opacity:0;
      }

      .rm-box {
        background:#fff;
        padding:32px;
        border-radius:18px;
        max-width:560px;
        width:92%;
        box-shadow:0 20px 50px rgba(0,0,0,0.25);
        text-align:center;
      }

      .rm-logo {
        width:110px;
        height:110px;
        display:block;
        margin:0 auto 14px;
      }

      h2 {
        margin:0 0 10px;
        font-size:22px;
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
        transition: all 0.2s ease;
      }

      #rmGo {
        background:linear-gradient(135deg,#34d399,#10b981);
      }

      #rmClose {
        background:linear-gradient(135deg,#60a5fa,#3b82f6);
      }

      #rmGo:hover, #rmClose:hover {
        transform: translateY(-2px);
      }

      /* ===== BOTTOM BAR ===== */
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
        font-family:Arial;

        will-change: transform;
      }

      .fb-wrap {
        display:flex;
        justify-content:space-between;
        padding:14px 16px;
        align-items:center;
        gap:12px;
      }

      /* 🔥 BUTTON "Подробнее" */
      #fbBtn {
        border:none;
        padding:10px 14px;
        border-radius:12px;
        cursor:pointer;
        color:#fff;
        background:linear-gradient(135deg,#34d399,#10b981);
        transition: all 0.25s ease;
        position:relative;
        overflow:hidden;
      }

      #fbBtn:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow:0 10px 18px rgba(16,185,129,0.35);
      }

      #fbBtn:active {
        transform: scale(0.97);
      }

      /* light shine */
      #fbBtn::after {
        content:"";
        position:absolute;
        top:-60%;
        left:-60%;
        width:40%;
        height:200%;
        background:rgba(255,255,255,0.25);
        transform:rotate(25deg);
        transition: left 0.5s ease;
      }

      #fbBtn:hover::after {
        left:120%;
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
      setTimeout(createModal, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
