const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resetPassBtn = document.getElementById("resetPassBtn");
const msg = document.getElementById("msg");
const timer = document.getElementById("timer");

let generatedOtp;
let otpExpiry;

sendOtpBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    msg.textContent = "Please enter your Email";
    msg.className = "error";
    return;
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msg.textContent = "Please enter a valid email address";
    msg.className = "error";
    return;
  }

  generatedOtp = Math.floor(100000 + Math.random() * 900000);
  otpExpiry = Date.now() + 60000;

  localStorage.setItem("mockOtp", generatedOtp);
  localStorage.setItem("mockEmail", email);

  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
  msg.textContent = `OTP Sent to ${email} (mock): ${generatedOtp}`;
  msg.className = "success";
  startTimer();
});

verifyOtpBtn.addEventListener("click", () => {
  const otp = document.getElementById("otp").value.trim();
  if (Date.now() > otpExpiry) {
    msg.textContent = "OTP expired! Please request again.";
    return;
  }
  if (otp === localStorage.getItem("mockOtp")) {
    msg.textContent = "OTP Verified";
    msg.className = "success";
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-3").classList.add("active");
  } else {
    msg.textContent = "Invalid OTP";
    msg.className = "error";
  }
});
resetPassBtn.addEventListener("click", () => {
    const newPass = document.getElementById('newPass').value.trim();
    if (newPass.length < 6) {
        msg.textContent = "Password must be at least 6 characters";
        msg.className = "error";
        return;
    }
    localStorage.setItem('mockPassword', newPass);
    msg.textContent = "Password updated successfully";
    msg.className = "success";
    document.getElementById('step-3').innerHTML = "<h3>Password Updated</h3>";
});
function startTimer() {
  let interval = setInterval(() => {
    const remaining = Math.max(0, otpExpiry - Date.now());
    const seconds = Math.floor(remaining / 1000);
    timer.textContent = `OTP is valid for: ${seconds} seconds`;
    if (remaining <= 0) {
      clearInterval(interval);
      timer.textContent = "OTP expired";
    }
  }, 1000);
}
