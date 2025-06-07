// Durasi default (dalam detik)
const DURATIONS = {
  wash: 37 * 60, // 30 menit
  dry: 45 * 60, // 40 menit
};

// Element HTML
const btnWash = document.getElementById("btnWash");
const btnDry = document.getElementById("btnDry");
const timerSection = document.getElementById("timerSection");
const countdownEl = document.getElementById("countdown");
const progressBar = document.getElementById("progressBar");
const statusEl = document.getElementById("status");

let timerInterval;
let timeRemaining;


// 1. MULAI TIMER
function startTimer(type) {
  // Sembunyikan tombol, tampilkan timer
  btnWash.parentElement.classList.add("hidden");
  timerSection.classList.remove("hidden");

  // Set durasi
  timeRemaining = DURATIONS[type];
  updateDisplay();

  // Jalankan timer per detik
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateDisplay();

    // Jika waktu habis
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerSelesai();
    }
  }, 1000);
}

// 2. UPDATE TAMPILAN
function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Format menit:detik
  countdownEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update progress bar
  const progressValue = (timeRemaining / DURATIONS.wash) * 100;
  progressBar.value = progressValue;
}

// 3. SAAT TIMER SELESAI
function timerSelesai() {
  statusEl.textContent = "PENCUCIAN SELESAI! 🎉";

  // Play sound
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
  );
  audio.play();

  // Getar (jika didukung)
  if (navigator.vibrate) navigator.vibrate([500, 200, 500]);

  // Notifikasi
  if (Notification.permission === "granted") {
    new Notification("⏰ Waktu Habis", {
      body: "Cucian/keringanmu sudah selesai!",
      icon: "https://cdn-icons-png.flaticon.com/512/3081/3081980.png",
    });
  }
}

// Event Listeners
btnWash.addEventListener("click", () => startTimer("wash"));
btnDry.addEventListener("click", () => startTimer("dry"));

// Minta izin notifikasi saat pertama kali
if ("Notification" in window) {
  Notification.requestPermission();
}
