(function() {
  function init() {
    let path = window.location.pathname;
    if (path.length > 1) path = path.replace(/\/$/, "");
    if (path === "") path = "/";

    if (
      path !== "/" &&
      path !== "/abitur" &&
      path !== "/studentu" &&
      path !== "/vypuskniku"
    ) return;

    const overlay = document.createElement("div");
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999999;display:flex;align-items:center;justify-content:center;";

    const modal = document.createElement("div");
    modal.style = "background:#fff;padding:25px;border-radius:16px;max-width:400px;text-align:center;font-family:sans-serif;";

    modal.innerHTML = `
      <h2>Сайт больше не работает</h2>
      <p>Перейдите на новый сайт:<br><b>brimtspo.gosuslugi.ru</b></p>
      <button id="goBtn">Перейти</button>
      <button id="closeBtn">Закрыть</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById("goBtn").onclick = function() {
      window.location.href = "https://brimtspo.gosuslugi.ru/";
    };

    document.getElementById("closeBtn").onclick = function() {
      overlay.remove();
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();