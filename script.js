(function() {

  const target = "https://brimtspo.gosuslugi.ru/";
  const STORAGE_KEY = "redirect_modal_visits";

  function getVisits() {
    return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  }

  function setVisits(v) {
    localStorage.setItem(STORAGE_KEY, v.toString());
  }

  function shouldShow() {
    let v = getVisits() + 1;
    setVisits(v);

    // показываем только каждый 3-й визит
    return v % 3 === 0;
  }

  function createModal() {
    const overlay = document.createElement("div");
    overlay.id = "redirModal";

    overlay.innerHTML = `
      <div class="box">
        <h2>Сайт больше не работает</h2>

        <p>
          Публикация новой информации прекратилась
          <b>31 марта 2026 года</b>.
        </p>

        <div class="buttons">
          <button id="goBtn">Перейти на новый сайт</button>
          <button id="closeBtn">Понятно</button>
        </div>
      </div>
    `;

    overlay.style = `
      position:fixed;inset:0;
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
      location.href = target;
    };

    document.getElementById("closeBtn").onclick = () => {
      overlay.remove();
    };
  }

  function createBottomBar() {
    const bar = document.createElement("div");

    bar.innerHTML = `
      <span>
        Публикация информации прекращена <b>31 марта 2026 года</b>
      </span>
      <button id="reopenBtn">Подробнее</button>
    `;

    bar.style = `
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      background:#1f2937;
      color:#fff;
      padding:12px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      font-family:Arial,sans-serif;
      z-index:999998;
    `;

    bar.querySelector("button").style = `
      background:#4CAF50;
      border:none;
      padding:8px 12px;
      border-radius:8px;
      color:#fff;
      cursor:pointer;
    `;

    document.documentElement.appendChild(bar);

    bar.querySelector("#reopenBtn").onclick = () => {
      if (!document.getElementById("redirModal")) {
        createModal();
      }
    };
  }

  function init() {

    const path = location.pathname.replace(/\/$/, "");

    const allowed = [
      "/",
      "/abitur",
      "/studentu",
      "/vypuskniku"
    ];

    if (!allowed.includes(path)) return;

    // нижняя плашка всегда
    createBottomBar();

    // модалка только раз в 3 визита
    if (shouldShow()) {
      createModal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
