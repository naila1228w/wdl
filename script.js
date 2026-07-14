const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".desktop-nav");
const form = document.querySelector(".interest-form");
const formNote = document.querySelector(".form-note");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button");
  submitButton.innerHTML = "已登记，期待与你见面 <span>✓</span>";
  submitButton.disabled = true;
  formNote.textContent = "当前为演示状态，数据尚未发送。连接安全存储后才会正式开放登记。";
});
