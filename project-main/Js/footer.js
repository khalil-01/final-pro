document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("site-footer");
  if (!footerContainer) return;

  fetch("../partials/footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load footer.html");
      return response.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error("Footer load error:", err);
    });
});
