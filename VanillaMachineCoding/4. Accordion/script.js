// Design and implement an accordion component using vanilla JS.
//
// Requirements:
// - Create an accordion that includes at least three sections (expandable/collapsible).
// - Ensure that the active section is visually distinct from inactive sections.
// - Implement the solution using clean and readable code.
//
// Bonus:
// - Implement a default section that is expanded on the initial page load.
// - Consider scalability and discuss how you might handle adding more accordions or content sections
//   dynamically.

const sections = [
  {
    title: "Section 1",
    content: "Section 1 content",
  },
  {
    title: "Section 2",
    content: "Section 2 content",
  },
  {
    title: "Section 3",
    content: "Section 3 content",
  },
  // More can be added here
];

document.addEventListener("DOMContentLoaded", function () {
  let accordionContainer = document.querySelector("#accordion");

  sections.forEach((item, index) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("accordion-item");

    const sectionHeader = document.createElement("div");
    sectionHeader.classList.add("accordion-header");
    sectionHeader.textContent = item.title;

    const sectionContent = document.createElement("div");
    sectionContent.classList.add("accordion-content");
    sectionContent.innerHTML = `<p>${item.content}</p>`;

    sectionItem.appendChild(sectionHeader).appendChild(sectionContent);
    accordionContainer.appendChild(sectionItem);

    if (index === 0) {
      sectionItem.classList.add("active");
      sectionContent.style.display = "block";
    }
  });

  accordionContainer.addEventListener("click", function (e) {
    const header = e.target.closest(".accordion-header");
    if (!header) return;

    const sectionItem = header.parentNode;
    const content = sectionItem.querySelector(".accordion-content");
    const isActive = sectionItem.classList.contains("active");

    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.display = "none";
    });

    if (!isActive) {
      sectionItem.classList.add("active");
      content.style.display = "block";
    }
  });
});
