// ── Config ──────────────────────────────────────────────────────────────────
// PUBLIC_KEY is the account-level Vapi public key (Vapi dashboard → Account → API Keys).
// ASSISTANT_ID is per-assistant (Vapi dashboard → Assistants → select → copy ID).
var PUBLIC_KEY = "07a2396d-9738-4838-af99-f6a18d946f0b";
var ASSISTANT_ID = "REPLACE_WITH_ASSISTANT_ID";
// ────────────────────────────────────────────────────────────────────────────

(function () {
  var callBtn = document.getElementById("call-btn");
  if (!callBtn) return;
  var btnLabel = document.getElementById("call-btn-label");
  var statusDot = document.getElementById("status-dot");
  var statusLbl = document.getElementById("status-label");
  var configured = ASSISTANT_ID.indexOf("REPLACE_WITH") !== 0;
  var calling = false;
  var vapi = null;

  function setStatus(modifier, label) {
    statusDot.className = "status-pill__dot";
    if (modifier) statusDot.classList.add("status-pill__dot--" + modifier);
    statusLbl.textContent = label;
  }
  function setIdle() {
    calling = false;
    callBtn.className = "btn btn-call btn-lg";
    callBtn.disabled = false;
    btnLabel.textContent = "Click to Call";
    setStatus("", "Ready to connect");
  }
  function setConnecting() {
    calling = true;
    callBtn.disabled = true;
    btnLabel.textContent = "Connecting…";
    setStatus("connecting", "Connecting…");
  }
  function setActive() {
    calling = true;
    callBtn.className = "btn btn-call btn-lg is-active";
    callBtn.disabled = false;
    btnLabel.textContent = "End Call";
    setStatus("active", "On a call");
  }
  function setError() {
    calling = false;
    callBtn.disabled = true;
    setStatus("error", "Connection failed");
    setTimeout(setIdle, 3000);
  }

  if (!configured) {
    // No assistant wired up yet: keep the page intact but disable the button.
    console.warn("[MM Estimators demo] ASSISTANT_ID is still a placeholder. Set it in assets/demo.js to enable voice calls.");
    callBtn.disabled = true;
    setStatus("error", "Assistant not configured");
    return;
  }

  var g = document.createElement("script");
  g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
  g.defer = true;
  g.async = true;
  g.onload = function () {
    vapi = window.vapiSDK.run({
      apiKey: PUBLIC_KEY,
      assistant: ASSISTANT_ID,
      config: {
        position: "bottom-right", offset: "40px", width: "50px", height: "50px",
        idle: { color: "transparent", type: "round", title: "", subtitle: "", icon: "" },
        loading: { color: "transparent", type: "round", title: "", subtitle: "", icon: "" },
        active: { color: "transparent", type: "round", title: "", subtitle: "", icon: "" },
      },
    });
    vapi.on("call-start", setActive);
    vapi.on("call-end", setIdle);
    vapi.on("error", setError);
    callBtn.addEventListener("click", function () {
      if (calling) vapi.stop();
      else { setConnecting(); vapi.start(ASSISTANT_ID); }
    });
  };
  document.head.appendChild(g);
})();
