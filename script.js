const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".desktop-nav");
const form = document.querySelector(".interest-form");
const formNote = document.querySelector(".form-note");
const enrollmentEndpoint =
  "https://script.google.com/macros/s/AKfycbyg0z-lch9Z9A5lhlNs5myUUhNJ_9Aew_MhhsyrRE1ujn8_xsV1-IWfeKrjDutH_PI/exec";

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button");
  const originalButtonContent = submitButton.innerHTML;

  submitButton.innerHTML = "正在安全提交… <span>·</span>";
  submitButton.disabled = true;

  const formData = new FormData(form);
  formData.set("source", window.location.href);

  try {
    await fetch(enrollmentEndpoint, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(formData),
    });

    form.reset();
    submitButton.innerHTML = "登记成功，我们会尽快联系你 <span>✓</span>";
    formNote.textContent = "你的信息已安全提交，仅用于 WDL 课程咨询与通知。";
  } catch (error) {
    submitButton.innerHTML = originalButtonContent;
    submitButton.disabled = false;
    formNote.textContent = "提交暂时没有成功，请稍后重试或发送邮件联系我们。";
  }
});
