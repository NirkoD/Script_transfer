(function() {

  const LOGO_URL = "https://github.com/NirkoD/Script_transfer/raw/refs/heads/main/logo.svg";

  // =========================
  // NOTIFICATION QUEUE
  // =========================
  const queue = [];
  let isShowing = false;

  // =========================
  // ADD NOTIFICATION
  // =========================
  function notify({ title, text, type = "info", actionText, action }) {
    queue.push({ title, text, type, actionText, action });
    if (!isShowing) showNext();
  }

  function showNext() {
    if (queue.length === 0) {
      isShowing = false;
      return;
    }

    isShowing = true;
    const n = queue.shift();
    createModal(n);
  }

  // =========================
  // MODAL SYSTEM
  // =========================
  function createModal(n) {

    const overlay = document.createElement("div");
    overlay.className = "gov-overlay " + n.type;

    overlay.innerHTML = `
      <div class="gov-box">

        <div class="gov-header">
          <img src="${LOGO_URL}" class="gov-logo">
          <div>
            <div class="gov-title">${n.title}</div>
            <div class="gov-type">${n.type.toUpperCase()}</div>
          </div>
        </div>

        <div class="gov-text">${n.text}</div>

        <div class="gov-actions">
          <button class="gov-btn primary">Понятно</button>
          ${n.actionText ? `<button class="gov-btn secondary">${n.actionText}</button>` : ""}
        </div>

      </div>
    `;

    document.documentElement.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("show"));

    const closeBtn = overlay.querySelector(".primary");
    const actionBtn = overlay.querySelector(".secondary");

    closeBtn.onclick = () => closeModal(overlay);

    if (actionBtn && n.action) {
      actionBtn.onclick = () => {
        n.action();
        closeModal(overlay);
      };
    }
  }

  function closeModal(el) {
    el.classList.remove("show");
    el.classList.add("hide");

    setTimeout(() => {
      el.remove();
      showNext();
    }, 200);
  }

  // =========================
  // BOTTOM BAR
  // =========================
  function createBottomBar() {

    const bar = document.createElement("div");
    bar.id = "govBar";

    bar.innerHTML = `
      <div class="gov-bar-wrap">
        <div>
          <b>Система уведомлений</b> — обновления портала
        </div>
        <button id="govOpen">Подробнее</button>
      </div>
    `;

    document.documentElement.appendChild(bar);

    bar.querySelector("#govOpen").onclick = () => {

      notify({
        title: "Информационное уведомление",
        text: `Информация на сайте перестала обновляться <b>31 марта 2026 года</b>.`,
        type: "warning",
        actionText: "Перейти на новый сайт",
        action: () => {
          location.href = "https://brimtspo.gosuslugi.ru/";
        }
      });

    };
  }

  // =========================
  // STYLES (SYSTEM UI)
  // =========================
  function injectStyles() {

    const style = document.createElement("style");

    style.innerHTML = `

      /* ===== OVERLAY ===== */
      .gov-overlay {
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,0.55);
        z-index:999999;
        font-family:Segoe UI, Arial;

        opacity:0;
        transition:opacity 0.2s ease;
      }

      .gov-overlay.show {
        opacity:1;
      }

      .gov-overlay.hide {
        opacity:0;
      }

      /* TYPE COLORS */
      .gov-overlay.info .gov-type { color:#3b82f6; }
      .gov-overlay.warning .gov-type { color:#f59e0b; }
      .gov-overlay.critical .gov-type { color:#ef4444; }

      /* BOX */
      .gov-box {
        width:92%;
        max-width:520px;
        background:#fff;
        border-radius:18px;
        padding:24px;
        box-shadow:0 20px 60px rgba(0,0,0,0.25);
      }

      /* HEADER */
      .gov-header {
        display:flex;
        align-items:center;
        gap:12px;
        margin-bottom:14px;
      }

      .gov-logo {
        width:56px;
        height:56px;
        object-fit:contain;
      }

      .gov-title {
        font-weight:700;
        font-size:18px;
      }

      .gov-type {
        font-size:12px;
        opacity:0.7;
      }

      /* TEXT */
      .gov-text {
        font-size:14px;
        line-height:1.6;
        margin-bottom:18px;
      }

      /* BUTTONS */
      .gov-actions {
        display:flex;
        justify-content:flex-end;
        gap:10px;
      }

      .gov-btn {
        border:none;
        padding:10px 14px;
        border-radius:12px;
        cursor:pointer;
        font-weight:600;
        color:#fff;
      }

      .gov-btn.primary {
        background:linear-gradient(135deg,#6b7280,#374151);
      }

      .gov-btn.secondary {
        background:linear-gradient(135deg,#34d399,#10b981);
      }

      /* BOTTOM BAR */
      #govBar {
        position:fixed;
        bottom:20px;
        left:50%;
        transform:translateX(-50%);
        width:min(760px, 92%);
        background:#fff;
        border:1px solid rgba(0,0,0,0.06);
        border-radius:14px;
        box-shadow:0 12px 30px rgba(0,0,0,0.12);
        z-index:999998;
        font-family:Arial;
      }

      .gov-bar-wrap {
        display:flex;
        justify-content:space-between;
        padding:14px;
        align-items:center;
      }

      #govOpen {
        border:none;
        padding:10px 14px;
        border-radius:10px;
        background:linear-gradient(135deg,#3b82f6,#2563eb);
        color:#fff;
        cursor:pointer;
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

    // пример авто-уведомления
    notify({
      title: "Системное уведомление",
      text: "Система уведомлений активирована и работает корректно.",
      type: "info"
    });

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
