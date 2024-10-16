// Create a simple tabbed interface using vanilla JS, HTML, CSS
// The tabs should switch content when clicked and have a visual indication for the active tab.
// Design the structure and functionality of these tabs.

// Requirements:
// - Create 3 tabs labelled Tab 1, Tab2, and Tab 3.
// - Implement functionality such that clicking on the tab changes the displayed content and visibly
// identifies the active tab.
// - Ensure code readability, modularity, and appropriate comments.

// Bonus:
// - Implement a default tab that is active on the page load.
// - Consider scalability and discuss how you might handle adding more tabs ot content sections dynamically.

// Following server driven UI approach
const tabsData = [
  {
    id: "tab1",
    title: "Tab 1",
    content: "Tab 1 content",
  },
  {
    id: "tab2",
    title: "Tab 2",
    content: "Tab 2 content",
  },
  {
    id: "tab3",
    title: "Tab 3",
    content: "Tab 3 content",
  },
  // More tabs can be add here as per the need
];

document.addEventListener("DOMContentLoaded", function () {
  let activeTab = tabsData[0].id;

  function renderTabs() {
    const tabContainer = document.querySelector("#tab-container");
    const tabContentContainer = document.querySelector(
      "#tab-content-container"
    );

    tabsData.forEach(function (tab) {
      const tabButton = document.createElement("button");
      tabButton.className = "tab-links";
      tabButton.textContent = tab.title;
      tabButton.setAttribute("data-tab", tab.id);
      tabContainer.appendChild(tabButton);

      const tabContent = document.createElement("div");
      tabContent.id = tab.id;
      tabContent.className = "tab-content";
      tabContent.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`;
      tabContentContainer.appendChild(tabContent);
    });

    tabContainer.addEventListener("click", function (e) {
      if (e.target.matches(".tab-links")) {
        const tabId = e.target.getAttribute("data-tab");
        if (tabId !== activeTab) {
          openTab(tabId);
          activeTab = tabId;
        }
      }
    });

    function openTab(tabId) {
      const tabLinks = document.querySelectorAll(".tab-links");
      const tabContents = document.querySelectorAll(".tab-content");

      tabContents.forEach((tab) => {
        tab.classList.remove("active");
      });

      tabLinks.forEach((tab) => {
        tab.classList.remove("active");
      });

      document.getElementById(tabId).classList.add("active");
      document
        .querySelector(`button[data-tab=${tabId}]`)
        .classList.add("active");
    }
  }

  renderTabs();
  document.getElementById(activeTab).classList.add("active");
  document
    .querySelector(`button[data-tab=${activeTab}]`)
    .classList.add("active");
});
