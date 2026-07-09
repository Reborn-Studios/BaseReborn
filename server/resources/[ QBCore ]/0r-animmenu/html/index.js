let menuOpen = false;
let currentCategoryAnims = [];
let currentCategory = null;
let favoriteAnimations = [];
let quickAnimations = [];
let translations = [];
let theme = "";
let animListID = "mainContainerRightAnimations";
let lastKey = null;
let lastSoundTime = 0;
const soundCooldown = 200;
let gangPropMenuState = false;
let gangAnimInfoOpen = false;
let quickKeys = [];
let quickAnimationsState = false;
let infoMenuState = false;
let activeKeybind = false;
let currentKeybindAnimSlot = null;
let defaultQuickKeys = [];
let quickPrimaryKey = null;
let animations = [];
window.addEventListener("message", function (event) {
  ed = event.data;
  if (ed.action === "textUI") {
    if (ed.show) {
      document.getElementById("TUKeyDivInside").innerHTML =
        `<span>${ed.key}</span>`;
      document.getElementById("textUIH4").innerHTML = ed.text;
      $("#textUI")
        .show()
        .css({ bottom: "-10%", position: "absolute", display: "flex" })
        .animate({ bottom: "4%" }, 800, function () {});
      if (ed.hide) {
        document.getElementById("TUKeyDiv").style.display = "none";
      } else {
        document.getElementById("TUKeyDiv").style.display = "flex";
      }
    } else {
      $("#textUI")
        .show()
        .css({ bottom: "4%", position: "absolute", display: "flex" })
        .animate({ bottom: "-10%" }, 800, function () {});
    }
  } else if (ed.action === "textUIUpdate") {
    document.getElementById("TUKeyDivInside").innerHTML =
      `<span>${ed.key}</span>`;
    document.getElementById("textUIH4").innerHTML = ed.text;
  } else if (ed.action === "menu") {
    menuOpen = ed.state;
    theme = localStorage.getItem("theme");
    if (theme === null) {
      localStorage.setItem("theme", "modern");
      theme = "modern";
    }
    if (menuOpen) {
      if (ed.menu) {
        clFunc("chooseCategory", ed.menu, ed.label);
      }
      if (theme === "modern") {
        document.getElementById("mainContainer").style.display = "flex";
      } else {
        document.getElementById("mainContainer2").style.display = "flex";
      }
    } else {
      if (theme === "modern") {
        document.getElementById("mainContainer").style.display = "none";
      } else {
        document.getElementById("mainContainer2").style.display = "none";
      }
      menuOpen = false;
    }
  } else if (ed.action === "resetQuicks") {
    quickAnimations = [];
    for (let i = 1; i <= 7; i++) {
      const slotDivs = document.querySelectorAll(
        `.mainContainerRightAnimationDiv-Slot${i}`,
      );
      if (!slotDivs.length) return;
      slotDivs.forEach((slotDiv) => {
        slotDiv.innerHTML = "";
        slotDiv.addEventListener("click", function (e) {}, false);
      });
    }
  } else if (ed.action === "openInfoMenu") {
    animPosOpen = ed.state;
    if (animPosOpen) {
      infoMenuState = true;
      $("#animPosInfoDiv")
        .show()
        .css({ bottom: "-10%", position: "absolute", display: "flex" })
        .animate({ bottom: "2%" }, 500, function () {});
    } else {
      if (infoMenuState) {
        $("#animPosInfoDiv")
          .css({ bottom: "2%", position: "absolute", display: "flex" })
          .animate({ bottom: "-10%" }, 400, function () {
            $("#animPosInfoDiv").fadeOut();
          });
      }
      infoMenuState = false;
    }
  } else if (ed.action === "openGangInfoMenu") {
    if (ed.state !== undefined) {
      gangAnimInfoOpen = ed.state;
    } else {
      gangAnimInfoOpen = !gangAnimInfoOpen;
    }
    if (gangAnimInfoOpen) {
      $("#gangInfoDiv")
        .show()
        .css({ bottom: "-10%", position: "absolute", display: "flex" })
        .animate({ bottom: "2%" }, 500, function () {});
    } else {
      $("#gangInfoDiv")
        .css({ bottom: "2%", position: "absolute", display: "flex" })
        .animate({ bottom: "-10%" }, 400, function () {
          $("#gangInfoDiv").fadeOut();
        });
    }
  } else if (ed.action === "setData") {
    if (ed.quickPrimaryKey) quickPrimaryKey = ed.quickPrimaryKey;
    if (ed.defaultQuickKeys) defaultQuickKeys = ed.defaultQuickKeys;
    if (ed.quickAnimationsState !== undefined) {
      quickAnimationsState = ed.quickAnimationsState;
      if (quickAnimationsState === true) {
        document.getElementById(
          "mainContainerRightQuickAnimations",
        ).style.display = "flex";
        document.getElementById(
          "mainContainerRightTopQuickTitle",
        ).style.display = "flex";
        document.getElementById("mainContainerRightAnimations").style.height =
          "57.1vh";
      } else {
        document.getElementById(
          "mainContainerRightQuickAnimations",
        ).style.display = "none";
        document.getElementById(
          "mainContainerRightTopQuickTitle",
        ).style.display = "none";
        document.getElementById("mainContainerRightAnimations").style.height =
          "77.1vh";
      }
    }
    if (ed.quickKeys) {
      quickKeys = ed.quickKeys;
    }
    theme = localStorage.getItem("theme");
    if (theme === null) {
      localStorage.setItem("theme", "modern");
      theme = "modern";
    }
    translations = ed.translations;
    for (var key in translations) {
      if (translations.hasOwnProperty(key)) {
        var elements = document.getElementsByClassName(key);
        for (var i = 0; i < elements.length; i++) {
          if (
            elements[i].tagName === "INPUT" ||
            elements[i].tagName === "TEXTAREA"
          ) {
            elements[i].setAttribute("placeholder", translations[key]);
          } else {
            elements[i].innerHTML = translations[key];
          }
        }
      }
    }
    if (theme === "modern") {
      animListID = "mainContainerRightAnimations";
    } else {
      animListID = "mainContainer2BottomRightInside";
      const categoryDiv = document.getElementById("mainContainer2BottomRight2");
      let categoryDivState = localStorage.getItem("showCategory");
      if (categoryDivState === "active") {
        categoryDiv.style.display = "flex";
        document.getElementById("show_hide_categories").innerHTML =
          translations.hide_categories;
      } else {
        categoryDiv.style.display = "none";
        document.getElementById("show_hide_categories").innerHTML =
          translations.show_categories;
      }
    }
    animations = ed.animations;
    favoriteAnimations = ed.favs;
    document.getElementById("mainContainerLeftInsideCategoriesDiv").innerHTML =
      "";
    document.getElementById("mainContainer2BottomRight2").innerHTML = "";
    currentCategory = null;
    if (theme === "modern") {
      ed.categories.forEach(function (categoryData, index) {
        var categoryDiv = document.createElement("div");
        categoryDiv.id = `category-${categoryData.name}`;
        categoryDiv.classList.add("mainContainerLeftInsideCategoryDiv");
        let anim_number_text = "";
        if (ed.translations && ed.translations.animations_number) {
          anim_number_text = ed.translations.animations_number;
        }
        categoryDiv.innerHTML = `
                <img src="files/${categoryData.icon}.svg">
                <div id="mainContainerLeftInsideCategoryDivTexts">
                    <h4>${categoryData.label}</h4>
                    <span id="mainContainerLeftInsideCategoryDivTexts-${categoryData.name}">${categoryData.number} ${anim_number_text}</span>
                </div>
                <i class="fa-solid fa-chevron-right" style="color: rgba(255, 255, 255, 0.24); font-size: 1.067vh;"></i>`;
        categoryDiv.addEventListener("click", function () {
          clFunc(
            "chooseCategory",
            categoryData.name,
            categoryData.label,
            categoryData.number,
          );
        });
        if (categoryData.number === 0) {
          categoryDiv.style.display = "none";
        }
        document
          .getElementById("mainContainerLeftInsideCategoriesDiv")
          .appendChild(categoryDiv);
        if (currentCategory === null) {
          clFunc(
            "chooseCategory",
            categoryData.name,
            categoryData.label,
            categoryData.number,
          );
        }
      });
    } else {
      ed.categories.forEach(function (categoryData, index) {
        var categoryDiv = document.createElement(
          "mainContainer2BottomRight2Div",
        );
        categoryDiv.id = `category-${categoryData.name}`;
        categoryDiv.classList.add("mainContainer2BottomRight2Div");
        let anim_number_text = "";
        if (ed.translations && ed.translations.animations_number) {
          anim_number_text = ed.translations.animations_number;
        }
        categoryDiv.innerHTML = `<h4>${categoryData.label}</h4>`;
        categoryDiv.addEventListener("click", function () {
          clFunc(
            "chooseCategory",
            categoryData.name,
            categoryData.label,
            categoryData.number,
          );
        });
        const favCount = Array.isArray(favoriteAnimations)
          ? favoriteAnimations.length
          : 0;
        if (categoryData.name === "favorites" && favCount === 0) {
          categoryDiv.style.display = "none";
        }
        document
          .getElementById("mainContainer2BottomRight2")
          .appendChild(categoryDiv);
        if (currentCategory === null) {
          clFunc(
            "chooseCategory",
            categoryData.name,
            categoryData.label,
            categoryData.number,
          );
        }
      });
    }
    if (ed.quicks) {
      for (let i = 1; i <= 7; i++) {
        const slotDivs = document.querySelectorAll(
          `.mainContainerRightAnimationDiv-Slot${i}`,
        );
        slotDivs.forEach((slotDiv) => {
          if (theme === "modern") {
            slotDiv.style.width = "12.85vh";
            slotDiv.style.height = "15.4vh";
          } else {
            slotDiv.style.width = "11.75vh";
            slotDiv.style.height = "12.5vh";
          }
        });
      }
      let quickAnimations2 = ed.quicks;
      quickAnimations2.forEach(function (quickData, index) {
        const slotDivs = document.querySelectorAll(
          `.mainContainerRightAnimationDiv-Slot${quickData.slot}`,
        );
        if (!slotDivs.length) return;
        slotDivs.forEach((slotDiv) => {
          slotDiv.innerHTML = "";
          const quickItem = createQuickAnimationItem(quickData, quickData.slot);
          while (quickItem.firstChild) {
            slotDiv.appendChild(quickItem.firstChild);
          }
          slotDiv.className = quickItem.className;
          slotDiv.style.cssText = quickItem.style.cssText;
          $(slotDiv).data("animData", $(quickItem).data("animData"));
          slotDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            clFunc("playAnim", quickData.name, quickData.category);
          });
          slotDiv.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentKeybindAnimSlot = quickData.slot;
            const menu = document.getElementById("keybindMenu");
            const title = document.getElementById("keybindTitle");
            const keyContainer = document.getElementById("keybindKeys");
            const emojis = [
              "🧰",
              "🛠️",
              "⚙️",
              "🧱",
              "📦",
              "🪛",
              "🔧",
              "🔩",
              "🗜️",
            ];
            const randomEmoji =
              emojis[Math.floor(Math.random() * emojis.length)];
            title.textContent = `${translations.keybind_for} ${randomEmoji} ${quickData.label}`;
            keyContainer.innerHTML = "";
            const vh = window.innerHeight / 100;
            const vw = window.innerWidth / 100;
            const topVH = e.clientY / vh;
            const leftVW = e.clientX / vw;
            menu.style.setProperty("--menu-top", `${topVH + 1}vh`);
            menu.style.setProperty("--menu-left", `${leftVW + 1}vw`);
            menu.classList.add("dynamic-position");
            menu.style.display = "flex";
            if (theme === "modern") {
              document.getElementById(
                "mainContainerInsideEffect",
              ).style.display = "flex";
            }
            const pressedKey = quickData.key;
            keyContainer.innerHTML = "";
            const keyBox = document.createElement("div");
            keyBox.className = "keybox";
            keyBox.id = pressedKey;
            keyBox.textContent = pressedKey;
            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-key";
            removeBtn.innerHTML = "&times;";
            removeBtn.onclick = () => (keyContainer.innerHTML = "");
            const keyWrapper = document.createElement("div");
            keyWrapper.className = "keybind-keys";
            keyWrapper.appendChild(keyBox);
            keyWrapper.appendChild(removeBtn);
            keyContainer.appendChild(keyWrapper);
          });
        });
        quickAnimations[quickData.slot] = {
          name: quickData.name,
          label: quickData.label,
          category: quickData.category,
          slot: quickData.slot,
          key: quickData.key,
        };
      });
      handleDragDrop();
    }
    if (ed.sender === "0RES") {
      post({ action: "dataReady" });
    }
    if (ed.gangEmoteProps) {
      document.getElementById("propMenuContainer").innerHTML =
        `<h2>${translations.prop_options}</h2>`;
      ed.gangEmoteProps.forEach(function (propData, index) {
        var propDiv = document.createElement("div");
        propDiv.id = `prop-item-${propData.objName}`;
        propDiv.classList.add("prop-item");
        propDiv.innerHTML = `
                <span class="prop-title">${propData.label}</span>
                <div class="hand-options">
                    <label class="checkbox-container">
                        <input type="checkbox" class="prop-item-ch" id="${`prop-item-lh-${propData.objName}`}">
                        <span class="checkmark"></span>
                        ${translations.left_hand}
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" class="prop-item-ch" id="${`prop-item-rh-${propData.objName}`}">
                        <span class="checkmark"></span>
                        ${translations.right_hand}
                    </label>
                </div>`;
        document.getElementById("propMenuContainer").appendChild(propDiv);
        let lhCheckbox = document.getElementById(
          `prop-item-lh-${propData.objName}`,
        );
        lhCheckbox.addEventListener("change", function () {
          if (this.checked) {
            post({
              action: "addGangProp",
              objName: propData.objName,
              hand: "left",
              pos: propData.handOffsets.leftHand.pos,
              rot: propData.handOffsets.leftHand.rot,
              bone: propData.handOffsets.leftHand.bone,
            });
          } else {
            post({ action: "removeGangProp", hand: "left" });
          }
        });
        let rhCheckbox = document.getElementById(
          `prop-item-rh-${propData.objName}`,
        );
        rhCheckbox.addEventListener("change", function () {
          if (this.checked) {
            post({
              action: "addGangProp",
              objName: propData.objName,
              hand: "right",
              pos: propData.handOffsets.rightHand.pos,
              rot: propData.handOffsets.rightHand.rot,
              bone: propData.handOffsets.rightHand.bone,
            });
          } else {
            post({ action: "removeGangProp", hand: "right" });
          }
        });
      });
    }
  } else if (ed.action === "updateQuicks") {
    if (ed.quicks) {
      for (let i = 1; i <= 7; i++) {
        const slotDivs = document.querySelectorAll(
          `.mainContainerRightAnimationDiv-Slot${i}`,
        );
        slotDivs.forEach((slotDiv) => {
          if (theme === "modern") {
            slotDiv.style.width = "12.85vh";
            slotDiv.style.height = "15.4vh";
          } else {
            slotDiv.style.width = "11.75vh";
            slotDiv.style.height = "12.5vh";
          }
        });
      }
      let quickAnimations2 = ed.quicks;
      quickAnimations2.forEach(function (quickData, index) {
        const slotDivs = document.querySelectorAll(
          `.mainContainerRightAnimationDiv-Slot${quickData.slot}`,
        );
        if (!slotDivs.length) return;
        slotDivs.forEach((slotDiv) => {
          slotDiv.innerHTML = "";
          const quickItem = createQuickAnimationItem(quickData, quickData.slot);
          while (quickItem.firstChild) {
            slotDiv.appendChild(quickItem.firstChild);
          }
          slotDiv.className = quickItem.className;
          slotDiv.style.cssText = quickItem.style.cssText;
          $(slotDiv).data("animData", $(quickItem).data("animData"));
          slotDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            clFunc("playAnim", quickData.name, quickData.category);
          });
          slotDiv.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentKeybindAnimSlot = quickData.slot;
            const menu = document.getElementById("keybindMenu");
            const title = document.getElementById("keybindTitle");
            const keyContainer = document.getElementById("keybindKeys");
            const emojis = [
              "🧰",
              "🛠️",
              "⚙️",
              "🧱",
              "📦",
              "🪛",
              "🔧",
              "🔩",
              "🗜️",
            ];
            const randomEmoji =
              emojis[Math.floor(Math.random() * emojis.length)];
            title.textContent = `${translations.keybind_for} ${randomEmoji} ${quickData.label}`;
            keyContainer.innerHTML = "";
            const vh = window.innerHeight / 100;
            const vw = window.innerWidth / 100;
            const topVH = e.clientY / vh;
            const leftVW = e.clientX / vw;
            menu.style.setProperty("--menu-top", `${topVH + 1}vh`);
            menu.style.setProperty("--menu-left", `${leftVW + 1}vw`);
            menu.classList.add("dynamic-position");
            menu.style.display = "flex";
            if (theme === "modern") {
              document.getElementById(
                "mainContainerInsideEffect",
              ).style.display = "flex";
            }
            const pressedKey = quickData.key;
            keyContainer.innerHTML = "";
            const keyBox = document.createElement("div");
            keyBox.className = "keybox";
            keyBox.id = pressedKey;
            keyBox.textContent = pressedKey;
            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-key";
            removeBtn.innerHTML = "&times;";
            removeBtn.onclick = () => (keyContainer.innerHTML = "");
            const keyWrapper = document.createElement("div");
            keyWrapper.className = "keybind-keys";
            keyWrapper.appendChild(keyBox);
            keyWrapper.appendChild(removeBtn);
            keyContainer.appendChild(keyWrapper);
          });
        });
        quickAnimations[quickData.slot] = {
          name: quickData.name,
          label: quickData.label,
          category: quickData.category,
          slot: quickData.slot,
          key: quickData.key,
        };
      });
      handleDragDrop();
    }
  } else if (ed.action === "resetGangProps") {
    const chs = document.querySelectorAll(`.prop-item-ch`);
    if (!chs.length) return;
    chs.forEach((chDiv) => {
      chDiv.checked = false;
    });
  } else if (ed.action === "updatePropCheckbox") {
    document.querySelectorAll(`.prop-item-ch`).forEach((cb) => {
      if (cb.id.includes(`-${ed.hand[0]}h-`) && !cb.id.includes(ed.objName)) {
        cb.checked = false;
      }
    });
  } else if (ed.action === "enableGangPropMenu") {
    document.getElementById("propMenuContainer").style.display = "flex";
    gangPropMenuState = true;
  } else if (ed.action === "closeGangPropMenu") {
    document.getElementById("propMenuContainer").style.display = "none";
    gangPropMenuState = false;
  }
  document.onkeyup = function (data) {
    if (data.which == 27 && gangPropMenuState) {
      gangPropMenuState = false;
      document.getElementById("propMenuContainer").style.display = "none";
      post({ action: "close" });
      const chs = document.querySelectorAll(`.prop-item-ch`);
      if (!chs.length) return;
      chs.forEach((chDiv) => {
        chDiv.checked = false;
      });
    }
    if (data.which == 27 && menuOpen) {
      menuOpen = false;
      if (theme === "modern") {
        document.getElementById("mainContainer").style.display = "none";
      } else {
        document.getElementById("mainContainer2").style.display = "none";
      }
      post({ action: "close" });
      activeKeybind = false;
      const menu = document.getElementById("keybindMenu");
      const keyContainer = document.getElementById("keybindKeys");
      keyContainer.innerHTML = "";
      menu.style.display = "none";
      if (theme === "modern") {
        document.getElementById("mainContainerInsideEffect").style.display =
          "none";
      }
    }
  };
  document.addEventListener("keydown", (e) => {
    if (!activeKeybind) return;
    const keyContainer = document.getElementById("keybindKeys");
    const pressedKey = e.key.toUpperCase();
    keyContainer.innerHTML = "";
    const keyBox = document.createElement("div");
    keyBox.className = "keybox";
    keyBox.id = pressedKey;
    keyBox.textContent = pressedKey;
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-key";
    removeBtn.innerHTML = "&times;";
    removeBtn.onclick = () => {
      keyContainer.innerHTML = "";
    };
    const keyWrapper = document.createElement("div");
    keyWrapper.className = "keybind-keys";
    keyWrapper.appendChild(keyBox);
    keyWrapper.appendChild(removeBtn);
    keyContainer.appendChild(keyWrapper);
    activeKeybind = false;
  });
});

function clFunc(name1, name2, name3, name4, name5, name6) {
  if (name1 === "chooseCategory") {
    document.querySelectorAll(".searchInput").forEach((inputElement) => {
      inputElement.value = "";
    });
    if (theme === "compact") {
      if (document.getElementById(`category-${currentCategory}`)) {
        document
          .getElementById(`category-${currentCategory}`)
          .classList.remove("mainContainer2BottomRight2DivSelected");
      }
    } else if (theme === "modern") {
      if (document.getElementById(`category-${currentCategory}`)) {
        document
          .getElementById(`category-${currentCategory}`)
          .classList.remove("mainContainerLeftInsideCategoryDivSelected");
      }
    }
    currentCategory = name2;
    if (theme === "compact") {
      if (document.getElementById(`category-${currentCategory}`)) {
        document
          .getElementById(`category-${currentCategory}`)
          .classList.add("mainContainer2BottomRight2DivSelected");
      }
    } else if (theme === "modern") {
      if (document.getElementById(`category-${currentCategory}`)) {
        document
          .getElementById(`category-${currentCategory}`)
          .classList.add("mainContainerLeftInsideCategoryDivSelected");
      }
    }
    if (name3) {
      if (name3 === "All" && translations && translations.all_animations) {
        name3 = translations.all_animations;
      }
      document.getElementById("mainContainerRightTopTitle").innerHTML = name3;
    }
    if (name4)
      document.getElementById("mainContainerRightTopNumber").innerHTML = name4;
    if (name2 === "favorites") {
      const favCount = Array.isArray(favoriteAnimations)
        ? favoriteAnimations.length
        : 0;
      document.getElementById("mainContainerRightTopNumber").innerHTML =
        favCount;
      document.getElementById(animListID).innerHTML = "";
      document.getElementById(animListID).scrollTop = 0;
      const fragment = document.createDocumentFragment();
      favoriteAnimations.forEach(function (favData, index) {
        const divItem = createAnimationItem(favData);
        fragment.appendChild(divItem);
      });
      document.getElementById(animListID).appendChild(fragment);
      return;
    }
    currentRangeEnd = 5;
    if (name2 === "all") {
      currentCategoryAnims = animations;
    } else {
      currentCategoryAnims = [];
      animations.forEach(function (animData, index) {
        if (animData.category === name2) {
          currentCategoryAnims.push({
            id: animData.id,
            name: animData.name,
            label: animData.label,
            category: animData.category,
            imageId: animData.imageId,
          });
        }
      });
    }
    renderInfiniteScroll(currentCategoryAnims, 50);
    document.getElementById(animListID).style.overflowY = "scroll";
  } else if (name1 === "playAnim") {
    playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
    post({ action: "playAnim", id: name2, category: name3 });
  } else if (name1 === "addAnimToFavorites") {
    let existingFavAnim = favoriteAnimations.find(
      (item) => item.category === name2 && item.name === name3,
    );
    if (existingFavAnim) {
      favoriteAnimations = favoriteAnimations.filter(
        (item) => !(item.category === name2 && item.name === name3),
      );
      playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
      // document.getElementById(`animation-favbtn-${existingFavAnim.category}-${existingFavAnim.name}`).className = 'fa-solid fa-star';
      document
        .querySelectorAll(
          `.animation-favbtn-${existingFavAnim.category}-${existingFavAnim.name}`,
        )
        .forEach((el) => {
          el.className = `fa-solid fa-star animation-favbtn-${existingFavAnim.category}-${existingFavAnim.name}`;
        });
      post({ action: "saveFavAnims", favoriteAnimations: favoriteAnimations });
    } else {
      let existingAnim = currentCategoryAnims.find(
        (item) => item.category === name2 && item.name === name3,
      );
      if (existingAnim) {
        favoriteAnimations.push({
          id: existingAnim.id,
          name: existingAnim.name,
          label: existingAnim.label,
          category: existingAnim.category,
        });
        playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
        post({
          action: "saveFavAnims",
          favoriteAnimations: favoriteAnimations,
        });
        // document.getElementById(`animation-favbtn-${existingAnim.category}-${existingAnim.name}`).className = 'fa-solid fa-star active';
        document
          .querySelectorAll(
            `.animation-favbtn-${existingAnim.category}-${existingAnim.name}`,
          )
          .forEach((el) => {
            el.className = `fa-solid fa-star active animation-favbtn-${existingAnim.category}-${existingAnim.name}`;
          });
      }
    }
    if (currentCategory === "favorites") clFunc("chooseCategory", "favorites");
    const favCount = Array.isArray(favoriteAnimations)
      ? favoriteAnimations.length
      : 0;
    if (
      document.getElementById(
        "mainContainerLeftInsideCategoryDivTexts-favorites",
      )
    )
      document.getElementById(
        "mainContainerLeftInsideCategoryDivTexts-favorites",
      ).innerHTML = favCount + " animations";
    if (favCount === 0) {
      document.getElementById(`category-favorites`).style.display = "none";
    } else {
      document.getElementById(`category-favorites`).style.display = "flex";
    }
  }
}

function renderInfiniteScroll(items, chunkSize) {
  const container = document.getElementById(animListID);
  container.innerHTML = "";
  container.style.overflowY = "scroll";
  let index = 0;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.remove();
          loadNextChunk();
        }
      });
    },
    {
      root: container,
      rootMargin: "0px",
      threshold: 1.0,
    },
  );
  function loadNextChunk() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < chunkSize && index < items.length; i++, index++) {
      const divItem = createAnimationItem(items[index]);
      fragment.appendChild(divItem);
    }
    container.appendChild(fragment);
    handleDragDrop();
    if (index < items.length) {
      const sentinel = document.createElement("div");
      sentinel.id = "sentinel";
      sentinel.style.height = "20px";
      container.appendChild(sentinel);
      observer.observe(sentinel);
    }
  }
  loadNextChunk();
}

// function renderInfiniteScroll(items, chunkSize) {
//     const container = document.getElementById(animListID);
//     container.innerHTML = '';
//     container.style.overflowY = 'scroll';
//     let index = 0;
//     function loadNextChunk() {
//         const fragment = document.createDocumentFragment();
//         for (let i = 0; i < chunkSize && index < items.length; i++, index++) {
//             const divItem = createAnimationItem(items[index]);
//             fragment.appendChild(divItem);
//         }
//         container.appendChild(fragment);
//         if (index < items.length) {
//             const sentinel = document.createElement('div');
//             sentinel.id = 'sentinel';
//             sentinel.style.height = '20px';
//             container.appendChild(sentinel);
//             observer.observe(sentinel);
//         }
//     }
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 observer.unobserve(entry.target);
//                 entry.target.remove();
//                 loadNextChunk();
//             }
//         });
//     }, {
//         root: container,
//         rootMargin: '0px',
//         threshold: 1.0
//     });
//     loadNextChunk();
//     handleDragDrop();
// }

// function renderInfiniteScroll(items, chunkSize) {
//     const container = document.getElementById(animListID);
//     container.innerHTML = '';
//     container.style.overflowY = 'scroll';
//     let index = 0;
//     function loadNextChunk() {
//         const fragment = document.createDocumentFragment();
//         for (let i = 0; i < chunkSize && index < items.length; i++, index++) {
//             const divItem = createAnimationItem(items[index]);
//             fragment.appendChild(divItem);
//         }
//         container.appendChild(fragment);
//         if (index < items.length) {
//             const sentinel = document.createElement('div');
//             sentinel.id = 'sentinel';
//             container.appendChild(sentinel);
//             observer.observe(sentinel);
//         }
//     }
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 observer.unobserve(entry.target);
//                 entry.target.remove();
//                 loadNextChunk();
//             }
//         });
//     });
//     loadNextChunk();
//     handleDragDrop();
// }

function createAnimationItem(item) {
  const div = document.createElement("div");
  div.id = "mainContainerRightAnimationDiv";
  // if (quickAnimationsState === true) {
  //     div.style.height = "27%";
  // } else {
  //     div.style.height = "20%";
  // }
  div.style.height = "15vh";
  if (theme === "compact") {
    div.style.width = "11.75vh";
    div.style.height = "13vh";
  }
  div.className = "mainContainerRightAnimationDivDraggable";
  $(div).data("animData", item);
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-star";
  if (
    favoriteAnimations.find(
      (anim) => anim.category === item.category && anim.name === item.name,
    )
  ) {
    icon.className = "fa-solid fa-star active";
  }
  icon.id = `animation-favbtn-${item.category}-${item.name}`;
  icon.classList.add(`animation-favbtn-${item.category}-${item.name}`);
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    clFunc("addAnimToFavorites", item.category, item.name);
  });
  div.appendChild(icon);
  const img = document.createElement("img");
  let imgName = item.imageId;
  if (item.category === "dances") {
    imgName = "dance-" + item.imageId.slice(5);
  }
  img.src = `https://i.fmfile.com/EI03ULvj42WpoUwKFDTIP/${imgName}.webp?v=9999`;
  img.onerror = () => {
    img.src = "files/unknown.png";
    img.style.width = "14.222vh";
    img.style.top = "0";
  };
  if (item.category === "expressions") {
    img.style.width = "14.222vh";
    img.style.top = "0";
  }
  img.addEventListener("mouseenter", () => {
    img.src = `https://i.fmfile.com/bTP7lh6JOmERPOmtSyTun/${imgName}.webp?v=9999`;
  });
  img.addEventListener("mouseleave", () => {
    img.src = `https://i.fmfile.com/EI03ULvj42WpoUwKFDTIP/${imgName}.webp?v=9999`;
  });
  div.appendChild(img);
  const label = document.createElement("span");
  let ilabel = item.label;
  if (ilabel.length > 25) {
    ilabel = ilabel.slice(0, 25) + "...";
  }
  if (theme === "modern") {
    label.style.marginTop = "8.5vh";
  } else {
    label.style.marginTop = "7.5vh";
  }
  label.style.zIndex = "2";
  label.textContent = ilabel;
  if (item.label.length >= 25) {
    label.style.fontSize = "0.889vh";
  } else if (item.label.length >= 20) {
    label.style.fontSize = "0.978vh";
  }
  div.appendChild(label);
  const commandDiv = document.createElement("div");
  commandDiv.id = "mainContainerRightAnimationDivCommand";
  const commandSpan = document.createElement("span");
  let command = item.name;
  if (command.length > 12) {
    command = command.slice(0, 12) + "...";
  }
  commandSpan.textContent = "/e " + command;
  $(div).hover(
    function () {
      commandSpan.textContent = "/e " + item.name;
      label.textContent = item.label;
    },
    function () {
      commandSpan.textContent = "/e " + command;
      label.textContent = ilabel;
    },
  );
  commandDiv.appendChild(commandSpan);
  div.appendChild(commandDiv);
  div.addEventListener("click", (e) => {
    e.stopPropagation();
    clFunc("playAnim", item.name, item.category);
    // if (item.category === "gang") {
    //     post({action: "enableGangPropMenu"});
    // }
  });
  return div;
}

window.addEventListener("DOMContentLoaded", (event) => {
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", `https://${GetParentResourceName()}/nuiReady`, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.send(JSON.stringify({}));
});

function playSound(sound, type) {
  post({ action: "playSound", sound: sound, type: type });
}

const typingSound = new Audio("sounds/writing.mp3");
typingSound.volume = 0.3;
document.querySelectorAll(".searchInput").forEach((inputElement) => {
  inputElement.addEventListener("input", function (event) {
    const userInput = event.target.value;
    if (userInput.length !== 0) {
      let emotes = findEmoteByPartialLabel(currentCategoryAnims, userInput);
      document.getElementById("mainContainerRightTopNumber").innerHTML =
        emotes.length;
      renderInfiniteScroll(emotes, 50);
    } else {
      renderInfiniteScroll(currentCategoryAnims, 50);
      document.getElementById("mainContainerRightTopNumber").innerHTML =
        currentCategoryAnims.length;
    }
  });
  inputElement.addEventListener("keydown", () => {
    typingSound.currentTime = 0;
    typingSound.play();
  });
  inputElement.addEventListener("focusin", (event) => {
    post({ action: "disableMovement" });
  });
  inputElement.addEventListener("focusout", (event) => {
    post({ action: "enableMovement" });
  });
});

function findEmoteByPartialLabel(emotes, partialLabel) {
  const partial = partialLabel.toLowerCase();
  return emotes.filter((emote) => {
    if (!emote?.label || !emote?.name) return false;
    return (
      emote.label.toLowerCase().includes(partial) ||
      emote.name.toLowerCase().includes(partial)
    );
  });
}

function post(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}

IsDragging = false;
function handleDragDrop() {
  // Normal
  $(".mainContainerRightAnimationDivDraggable").draggable({
    helper: function () {
      return $(this).clone();
    },
    appendTo: "body",
    scroll: false,
    revertDuration: 0,
    revert: "invalid",
    start: function (event, ui) {
      IsDragging = true;
      $(ui.helper).css({
        width: $(this).width(),
        height: $(this).height(),
      });
    },
    stop: function () {
      setTimeout(function () {
        IsDragging = false;
      }, 300);
    },
  });
  $(".mainContainerRightQuickAnimations > div").droppable({
    accept: ".mainContainerRightAnimationDivDraggable",
    drop: function (event, ui) {
      const fromData = ui.draggable.data("animData");
      const slotId = Number($(this).attr("data-slot"));
      addAnimToQuick(fromData, slotId);
      setTimeout(function () {
        IsDragging = false;
      }, 300);
    },
  });
  $(".mainContainer2BottomLeftInside > div").droppable({
    accept: ".mainContainerRightAnimationDivDraggable",
    drop: function (event, ui) {
      const fromData = ui.draggable.data("animData");
      const slotId = Number($(this).attr("data-slot"));
      addAnimToQuick(fromData, slotId);
      setTimeout(function () {
        IsDragging = false;
      }, 300);
    },
  });
  //
  $(".mainContainerRightAnimationDivDraggable2").draggable({
    appendTo: "body",
    helper: function () {
      return $(this).clone();
    },
    scroll: false,
    revertDuration: 0,
    revert: "invalid",
    start: function (event, ui) {
      currentQuickDragSlot = Number($(this).attr("data-slot"));
      if (quickAnimations[currentQuickDragSlot]) {
        IsDragging = true;
        $(ui.helper).css({
          width: $(this).width(),
          height: $(this).height(),
        });
      } else {
        event.preventDefault();
      }
    },
    stop: function () {
      setTimeout(function () {
        IsDragging = false;
      }, 300);
    },
  });
  $("#" + animListID).droppable({
    accept: ".mainContainerRightAnimationDivDraggable2",
    drop: function (event, ui) {
      setTimeout(function () {
        IsDragging = false;
      }, 300);
      removeAnimFromQuick(currentQuickDragSlot);
    },
  });
}

function addAnimToQuick(data, id) {
  if (quickAnimations[id]) {
    quickAnimations[id] = null;
  }
  let key = id;
  if (defaultQuickKeys[id - 1]) key = defaultQuickKeys[id - 1].Key;
  data.key = key;
  quickAnimations[id] = {
    name: data.name,
    label: data.label,
    category: data.category,
    slot: id,
    key: key,
  };
  const slotDivs = document.querySelectorAll(
    `.mainContainerRightAnimationDiv-Slot${id}`,
  );
  if (!slotDivs.length) return;
  slotDivs.forEach((slotDiv) => {
    slotDiv.innerHTML = "";
    const quickItem = createQuickAnimationItem(data, id);
    while (quickItem.firstChild) {
      slotDiv.appendChild(quickItem.firstChild);
    }
    slotDiv.className = quickItem.className;
    slotDiv.style.cssText = quickItem.style.cssText;
    $(slotDiv).data("animData", $(quickItem).data("animData"));
    slotDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      clFunc("playAnim", data.name, data.category);
    });
    slotDiv.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentKeybindAnimSlot = id;
      const menu = document.getElementById("keybindMenu");
      const title = document.getElementById("keybindTitle");
      const keyContainer = document.getElementById("keybindKeys");
      const emojis = ["🧰", "🛠️", "⚙️", "🧱", "📦", "🪛", "🔧", "🔩", "🗜️"];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      title.textContent = `${translations.keybind_for} ${randomEmoji} ${data.label}`;
      keyContainer.innerHTML = "";
      const vh = window.innerHeight / 100;
      const vw = window.innerWidth / 100;
      const topVH = e.clientY / vh;
      const leftVW = e.clientX / vw;
      menu.style.setProperty("--menu-top", `${topVH + 1}vh`);
      menu.style.setProperty("--menu-left", `${leftVW + 1}vw`);
      menu.classList.add("dynamic-position");
      menu.style.display = "flex";
      if (theme === "modern") {
        document.getElementById("mainContainerInsideEffect").style.display =
          "flex";
      }
      const pressedKey = key;
      keyContainer.innerHTML = "";
      const keyBox = document.createElement("div");
      keyBox.className = "keybox";
      keyBox.id = pressedKey;
      keyBox.textContent = pressedKey;
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-key";
      removeBtn.innerHTML = "&times;";
      removeBtn.onclick = () => (keyContainer.innerHTML = "");
      const keyWrapper = document.createElement("div");
      keyWrapper.className = "keybind-keys";
      keyWrapper.appendChild(keyBox);
      keyWrapper.appendChild(removeBtn);
      keyContainer.appendChild(keyWrapper);
    });
  });
  post({ action: "saveQuickAnims", quickAnimations: quickAnimations });
  playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
  handleDragDrop();
}

function createQuickAnimationItem(data, slotId) {
  const div = document.createElement("div");
  div.setAttribute("data-slot", slotId);
  div.id = "mainContainerRightAnimationDiv";
  div.classList.add("mainContainerRightAnimationDiv-Slot" + slotId);
  div.classList.add("mainContainerRightAnimationDivDraggable2");
  if (theme === "modern") {
    div.style.width = "12.85vh";
    div.style.height = "15.4vh";
  } else {
    div.style.width = "11.75vh";
    div.style.height = "13vh";
  }
  $(div).data("animData", data);
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-star";
  if (
    favoriteAnimations.find(
      (anim) => anim.category === data.category && anim.name === data.name,
    )
  ) {
    icon.className = "fa-solid fa-star active";
  }
  icon.classList.add(`animation-favbtn-${data.category}-${data.name}`);
  icon.id = `animation-favbtn-${data.category}-${data.name}`;
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    clFunc("addAnimToFavorites", data.category, data.name);
  });
  div.appendChild(icon);
  let category = data.category;
  if (category === "general") category = "emotes";
  const img = document.createElement("img");
  img.src = `https://i.fmfile.com/EI03ULvj42WpoUwKFDTIP/${data.imageId}.webp?v=9999`;
  img.onerror = () => {
    img.src = "files/unknown.png";
    img.style.width = "14.222vh";
    img.style.top = "0";
  };
  if (category === "expressions") {
    img.style.width = "14.222vh";
    img.style.top = "0";
  }
  img.addEventListener("mouseenter", () => {
    img.src = `https://i.fmfile.com/bTP7lh6JOmERPOmtSyTun/${data.imageId}.webp?v=9999`;
  });
  img.addEventListener("mouseleave", () => {
    img.src = `https://i.fmfile.com/EI03ULvj42WpoUwKFDTIP/${data.imageId}.webp?v=9999`;
  });
  div.appendChild(img);
  const label = document.createElement("span");
  if (theme === "modern") {
    label.style.marginTop = "8.5vh";
  } else {
    label.style.marginTop = "7vh";
  }
  label.style.zIndex = "2";
  label.textContent = data.label;
  if (data.label.length >= 25) {
    label.style.fontSize = "0.889vh";
  } else if (data.label.length >= 20) {
    label.style.fontSize = "0.978vh";
  }
  div.appendChild(label);
  const commandDiv = document.createElement("div");
  commandDiv.id = "mainContainerRightAnimationDivCommand";
  const commandSpan = document.createElement("span");
  let key = new String(data.key);
  if (key.includes("NUM")) {
    key = quickPrimaryKey + " + " + data.key;
  }
  commandSpan.textContent = "Key: " + key;
  commandDiv.appendChild(commandSpan);
  div.appendChild(commandDiv);
  div.addEventListener("click", (e) => {
    e.stopPropagation();
    clFunc("playAnim", data.name, data.category);
  });
  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    currentKeybindAnimSlot = slotId;
    const menu = document.getElementById("keybindMenu");
    const title = document.getElementById("keybindTitle");
    const keyContainer = document.getElementById("keybindKeys");
    const emojis = ["🧰", "🛠️", "⚙️", "🧱", "📦", "🪛", "🔧", "🔩", "🗜️"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    title.textContent = `${translations.keybind_for} ${randomEmoji} ${data.label}`;
    keyContainer.innerHTML = "";
    const vh = window.innerHeight / 100;
    const vw = window.innerWidth / 100;
    const topVH = e.clientY / vh;
    const leftVW = e.clientX / vw;
    menu.style.setProperty("--menu-top", `${topVH + 1}vh`);
    menu.style.setProperty("--menu-left", `${leftVW + 1}vw`);
    menu.classList.add("dynamic-position");
    menu.style.display = "flex";
    if (theme === "modern") {
      document.getElementById("mainContainerInsideEffect").style.display =
        "flex";
    }
    const pressedKey = data.key;
    keyContainer.innerHTML = "";
    const keyBox = document.createElement("div");
    keyBox.className = "keybox";
    keyBox.id = pressedKey;
    keyBox.textContent = pressedKey;
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-key";
    removeBtn.innerHTML = "&times;";
    removeBtn.onclick = () => {
      keyContainer.innerHTML = "";
    };
    const keyWrapper = document.createElement("div");
    keyWrapper.className = "keybind-keys";
    keyWrapper.appendChild(keyBox);
    keyWrapper.appendChild(removeBtn);
    keyContainer.appendChild(keyWrapper);
  });
  return div;
}

function removeAnimFromQuick(id) {
  if (quickAnimations[id]) {
    quickAnimations[id] = null;
  }
  const slotDivs = document.querySelectorAll(
    `.mainContainerRightAnimationDiv-Slot${id}`,
  );
  if (!slotDivs.length) return;
  slotDivs.forEach((slotDiv) => {
    slotDiv.innerHTML = "";
    slotDiv.addEventListener("click", function (e) {}, false);
  });
  post({ action: "saveQuickAnims", quickAnimations: quickAnimations });
  playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
  handleDragDrop();
}

// document.addEventListener('DOMContentLoaded', function() {
//     const toggleButton = document.getElementById('interfaceToggleButton');
//     const dropdownMenu = document.getElementById('interfaceDropdownMenu');
//     const interface1Content = document.getElementById('mainContainer');
//     const interface2Content = document.getElementById('mainContainer2');
//     let currentInterface = 1;
//     toggleButton.addEventListener('click', function(event) {
//         event.stopPropagation();
//         dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//     });
//     dropdownMenu.addEventListener('click', function(event) {
//         if (event.target.tagName === 'A') {
//             const selectedInterface = parseInt(event.target.dataset.interface);
//             interface1Content.style.display = 'none';
//             interface2Content.style.display = 'none';
//             if (selectedInterface === 1) {
//                 interface1Content.style.display = 'flex';
//             } else if (selectedInterface === 2) {
//                 interface2Content.style.display = 'flex';
//             }
//             currentInterface = selectedInterface;
//             dropdownMenu.style.display = 'none';
//             if (currentInterface === 1) {
//                 localStorage.setItem('theme', 'modern');
//             } else {
//                 localStorage.setItem('theme', 'compact');
//             }
//         }
//     });
//     document.addEventListener('click', function(event) {
//         if (!dropdownMenu.contains(event.target) && event.target !== toggleButton) {
//             dropdownMenu.style.display = 'none';
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".interface-toggle-button");
  const dropdownMenus = document.querySelectorAll(".interface-dropdown-menu");
  const interface1Content = document.getElementById("mainContainer");
  const interface2Content = document.getElementById("mainContainer2");
  let currentInterface = 1;
  toggleButtons.forEach((toggleButton, index) => {
    const dropdownMenu = dropdownMenus[index];
    toggleButton.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
    dropdownMenu.addEventListener("click", function (event) {
      if (event.target.dataset.interface === "3") {
        const categoryDiv = document.getElementById(
          "mainContainer2BottomRight2",
        );
        categoryDiv.style.display =
          categoryDiv.style.display === "flex" ? "none" : "flex";
        if (categoryDiv.style.display === "flex") {
          localStorage.setItem("showCategory", "active");
          document.getElementById("show_hide_categories").innerHTML =
            translations.hide_categories;
        } else {
          localStorage.setItem("showCategory", "hidden");
          document.getElementById("show_hide_categories").innerHTML =
            translations.show_categories;
        }
        return;
      }
      if (event.target.tagName === "A") {
        const selectedInterface = parseInt(event.target.dataset.interface);
        interface1Content.style.display = "none";
        interface2Content.style.display = "none";
        currentInterface = selectedInterface;
        dropdownMenu.style.display = "none";
        if (currentInterface === 1) {
          localStorage.setItem("theme", "modern");
        } else {
          localStorage.setItem("theme", "compact");
        }
        menuOpen = false;
        post({ action: "close" });
        post({ action: "resetState" });
      }
    });
    document.addEventListener("click", function (event) {
      if (
        !dropdownMenu.contains(event.target) &&
        event.target !== toggleButton
      ) {
        dropdownMenu.style.display = "none";
      }
    });
  });
});

const clickSound = new Audio("sounds/writing.mp3");
clickSound.volume = 0.3;
function playClickSound() {
  const newSound = clickSound.cloneNode();
  newSound.play().catch((error) => console.log("Ses çalma hatası:", error));
}

const addKeyBtn = document.getElementById("addKeyBtn");
addKeyBtn.addEventListener("click", () => {
  activeKeybind = true;
});

const cancelKeyBtn = document.getElementById("cancelKeyBtn");
cancelKeyBtn.addEventListener("click", () => {
  activeKeybind = false;
  const menu = document.getElementById("keybindMenu");
  const keyContainer = document.getElementById("keybindKeys");
  keyContainer.innerHTML = "";
  menu.style.display = "none";
  if (theme === "modern") {
    document.getElementById("mainContainerInsideEffect").style.display = "none";
  }
});

document.querySelector(".save-key").addEventListener("click", () => {
  if (!currentKeybindAnimSlot)
    return showNotify(
      "Invalid Animation",
      "There is a problem with animation data.",
    );
  const keyBox = document.querySelector("#keybindKeys .keybox");
  if (!keyBox) return showNotify("Invalid Key", "Press a key to save.");
  const key = keyBox.id.toUpperCase();
  if (key === undefined) {
    showNotify("Invalid Key", `Unsupported key: ${key}`);
    return;
  }
  post({ action: "keybindSaved", key: key, slot: currentKeybindAnimSlot });
  document.getElementById("keybindMenu").style.display = "none";
  if (theme === "modern") {
    document.getElementById("mainContainerInsideEffect").style.display = "none";
  }
});
