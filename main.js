const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // Close the sidebar if it's open
  } else {
    sidebar.style.left = "0"; // Open the sidebar
  }
});

closeBtn.addEventListener("click", () => {
  sidebar.style.left = "-250px"; // Close sidebar when clicking close button
});