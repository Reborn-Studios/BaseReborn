let currentUserId = null;
let allGroups = [];
let selectedGroups = {}; // { ["Admin"]: 1 }

$(document).ready(function () {
  const groupsPanel = $("#groups-panel");
  const groupsList = $("#groups-list");
  const searchInput = $("#groups-search-input");
  const saveBtn = $("#groups-save");
  const cancelBtn = $("#groups-cancel");
  const closeBtn = $("#groups-close");

  window.addEventListener("message", function (event) {
    const data = event.data;

    if (data.action === "openGroups") {
      currentUserId = data.userId;
      allGroups = data.groups;
      selectedGroups = { ...data.userGroups };
      $(".groups-title").text(`Controle de grupos (${currentUserId})`);
      renderGroups(allGroups);
      groupsPanel.show();
    }
  });

  function renderGroups(groups) {
    groupsList.empty();

    groups.forEach((group) => {
      const isInGroup =
        selectedGroups[group.groupName] &&
        group.groupName + "-" + selectedGroups[group.groupName] === group.value;
      const item = $(`
        <div class="group-item ${isInGroup ? "active" : ""}" data-group="${group.groupName}">
          <div class="group-info">
            <div class="group-name">${group.label}</div>
            <div class="group-label">${group.groupName + " - " + group.level}</div>
          </div>
          <div class="group-status">
            <span class="status-badge ${isInGroup ? "in" : "out"}">
              ${isInGroup ? "No grupo" : "Fora"}
            </span>
          </div>
        </div>
      `);

      item.click(function () {
        toggleGroup(group.groupName, group.level);
      });

      groupsList.append(item);
    });
  }

  function toggleGroup(groupName, level) {
    if (selectedGroups[groupName]) {
      delete selectedGroups[groupName];
    } else {
      selectedGroups[groupName] = level;
    }
    renderGroups(allGroups);
  }

  searchInput.on("input", function () {
    const searchTerm = $(this).val().toLowerCase();
    const filteredGroups = allGroups.filter(
      (group) =>
        group.groupName.toLowerCase().includes(searchTerm) ||
        (group.label && group.label.toLowerCase().includes(searchTerm)),
    );
    renderGroups(filteredGroups);
  });

  saveBtn.click(function () {
    groupsPanel.hide();
    $.post(
      "https://AdminControl/saveGroups",
      JSON.stringify({
        userId: currentUserId,
        selectedGroups: selectedGroups,
      }),
    );
  });

  cancelBtn.click(function () {
    groupsPanel.hide();
    $.post("https://AdminControl/closeGroups", JSON.stringify({}));
  });

  closeBtn.click(function () {
    groupsPanel.hide();
    $.post("https://AdminControl/closeGroups", JSON.stringify({}));
  });

  document.onkeyup = function (data) {
    if (data.which === 27) {
      groupsPanel.hide();
      $.post("https://AdminControl/closeGroups", JSON.stringify({}));
    }
  };
});
