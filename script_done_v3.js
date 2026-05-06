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

          Вся информация перенесена на новый официальный сайт техникума.
        </div>

        <div class="rm-buttons">
          <button id="rmGo" class="btn primary">Перейти на новый сайт</button>
          <button id="rmClose" class="btn secondary">Понятно</button>
        </div>

      </div>
    `;

    document.documentElement.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("show"));

    overlay.querySelector("#rmGo").onclick = () => {
      location.href = "https://brimtspo.gosuslugi.ru/";
    };

    overlay.querySelector("#rmClose").onclick = () => {
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

        <button id="fbBtn" class="btn primary">Подробнее</button>
      </div>
    `;

    document.documentElement.appendChild(bar);

    bar.querySelector("#fbBtn").onclick = createModal;

    //floating animation
    let t = 0;

    function animate() {
      t += 0.02;
      const y = Math.sin(t) * 6;
      bar.style.transform = `translateX(-50%) translateY(${y}px)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

 // =========================
// STYLES
// =========================
function injectStyles() {

  const style = document.createElement("style");

  style.innerHTML = `

    body {
      font-family: Arial, sans-serif;
    }

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
      transition:0.28s ease;
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
      margin-bottom:14px;
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

    /* ===== UNIFIED BUTTON STYLE ===== */
    .btn {
      border:none;
      padding:11px 16px;
      border-radius:12px;
      cursor:pointer;
      color:#fff;
      font-weight:600;
      transition: all 0.25s ease;
      position:relative;
      overflow:hidden;
    }

    .primary {
      background:linear-gradient(135deg,#34d399,#10b981);
    }

    .secondary {
      background:linear-gradient(135deg,#60a5fa,#3b82f6);
    }

    /* =========================
       ✨ СВЕЧЕНИЕ (ДОБАВЛЕНО)
    ========================= */

    .primary {
      box-shadow:0 8px 18px rgba(16,185,129,0.25);
    }

    .secondary {
      box-shadow:0 8px 18px rgba(59,130,246,0.25);
    }

    .primary:hover {
      box-shadow:0 14px 30px rgba(16,185,129,0.45);
    }

    .secondary:hover {
      box-shadow:0 14px 30px rgba(59,130,246,0.45);
    }

    .btn:hover {
      transform: translateY(-3px) scale(1.03);
    }

    .btn:active {
      transform: scale(0.97);
    }

    /* shine effect */
    .btn::after {
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

    .btn:hover::after {
      left:120%;
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
      will-change: transform;
    }

    .fb-wrap {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:14px 16px;
      gap:12px;
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
