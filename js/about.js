import "./common.js";

async function loadAboutContent() {
  const container = document.querySelector("#about-content");
  if (!container) return;

  try {
    const response = await fetch("about.md", { cache: "no-cache" });
    if (!response.ok) throw new Error(`加载失败：${response.status}`);
    const markdown = await response.text();

    if (typeof marked !== "undefined") {
      container.innerHTML = marked.parse(markdown, {
        breaks: true,
        gfm: true,
      });
    } else {
      container.textContent = markdown;
    }
  } catch (error) {
    container.innerHTML = `<p class="note">内容加载失败，请稍后重试。</p>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAboutContent();
});
