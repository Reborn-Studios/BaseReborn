menuOpen = false;
animPosOpen = false;
animations = [];
quickAnimations = [];
currentCategory = null;
currentCategoryAnims = [];
favoriteAnimations = [];
translations = [];
XEMOTES = [];
let pKey = null;
let down = 1;
let defaultScrollTop = 7.8;
let defaultScrollValue = 0.268;
let currentRangeStart = 0;
let currentRangeEnd = 8;
const EMOTE_SLICE_SIZE = 8;
let layout = 0;
let favoritesActive = false;

$("#layout0").click(function (e) {
  layout = 0;
  $("#layout1").attr("src", "files/layout2.png");
  $("#layout0").attr("src", "files/selected2.png");
  $("#found").css({ display: "flex" });
  $("#mainDivRightSideBottomTop").css({ "flex-wrap": "wrap" });
  $("#mainDivRightSideBottomTop").css({ "flex-direction": "row" });
  $("#lay1").css({ display: "none" });
  $("#lay0").css({ display: "flex" });
  UpdateLayout();
  updateRange();
});
$("#layout1").click(function (e) {
  layout = 1;
  $("#layout0").attr("src", "files/layout.png");
  $("#layout1").attr("src", "files/selected.png");
  $("#mainDivRightSideBottomTop").css({ "flex-direction": "column" });
  $("#mainDivRightSideBottomTop").css({ "flex-wrap": "" });
  $("#lay0").css({ display: "none" });
  $("#lay1").css({ display: "flex" });
  updateRange();
  UpdateLayout();
});
$("#MDLSBCategoryDiv-favorites").click(function (e) {
  updateRange();
  UpdateLayout();
});

function UpdateLayout() {
  if (layout == 0) {
    $("#found").css({ display: "flex" });
    $("#mainDivRightSideBottomTop").css({ "flex-wrap": "wrap" });
    $("#mainDivRightSideBottomTop").css({ "flex-direction": "row" });
    $("#lay1").css({ display: "none" });
    $("#lay0").css({ display: "flex" });
    updateRange();
  } else if (layout == 1) {
    $("#mainDivRightSideBottomTop").css({ "flex-direction": "column" });
    $("#mainDivRightSideBottomTop").css({ "flex-wrap": "" });
    $("#lay0").css({ display: "none" });
    $("#lay1").css({ display: "flex" });
    updateRange();
  }
}

window.addEventListener("message", function (event) {
  ed = event.data;
  if (ed.action === "menu") {
    menuOpen = ed.state;

    if (menuOpen) {
      translations = ed.translations;
      updateRange();

      document.getElementById("menuTitle").innerHTML = translations.title;
      document.getElementById("menuDescription").innerHTML =
        translations.description;
      $("#MDLSBCategoryDiv-favorites").css({ display: "flex" });
      $("#found").css({ display: "flex" });

      $("#mainDiv").fadeIn(200);
    } else {
      $("#mainDiv").hide();
    }
  } else if (ed.action === "setData") {
    animations = ed.animations;
    favoriteAnimations = ed.favs;
    document.getElementById("mainDivLeftSideBottom").innerHTML = "";
    ed.categories.forEach(function (categoryData, index) {
      if (categoryData.name == "all") {
        chanCatName = "All";
      } else if (categoryData.name == "general") {
        chanCatName = "General";
      } else if (categoryData.name == "dances") {
        chanCatName = "Dances";
      } else if (categoryData.name == "expressions") {
        chanCatName = "Moods";
      } else if (categoryData.name == "walks") {
        chanCatName = "Walks";
      } else if (categoryData.name == "placedemotes") {
        chanCatName = "Placed";
      } else if (categoryData.name == "syncedemotes") {
        chanCatName = "Shared";
      } else if (categoryData.name == "favorites") {
        layout = 1;
        chanCatName = "Favorites";
      }

      var categoryHTML = `
            <div class="MDLSBCategoryDiv" id="MDLSBCategoryDiv-${categoryData.name}" onclick="clFunc('chooseCategory', '${categoryData.name}', '${categoryData.number}')">

                <p id="MDLSBCategoryDivTexts2-${categoryData.name}">${chanCatName} </p>
            </div>`;
      appendHtml(
        document.getElementById("mainDivLeftSideBottom"),
        categoryHTML
      );

      if (currentCategory === null) {
        currentCategory = categoryData.name;
        clFunc("chooseCategory", categoryData.name, categoryData.number);
      }
    });

    pKey = ed.pKey;
    let quickAnimations2 = ed.quicks;

    handleDragDrop();

    currentCategoryAnims = [];
    XEMOTES = [];
    animations.forEach(function (animData, index) {
      if (animData.category === null) {
        currentCategoryAnims.push({
          id: animData.id,
          name: animData.name,
          label: animData.label,
          category: animData.category,
          imgId: animData.imgId,
          animId: animData.animId,
        });
        XEMOTES.push({
          id: animData.id,
          name: animData.name,
          label: animData.label,
          category: animData.category,
          imgId: animData.imgId,
          animId: animData.animId,
        });
      }
    });
    clFunc("chooseCategory", "all", 4485);

    layout = 0;

    $("#found").css({ display: "flex" });
    $("#mainDivRightSideBottomTop").css({ "flex-wrap": "wrap" });
    $("#mainDivRightSideBottomTop").css({ "flex-direction": "row" });
    $("#lay1").css({ display: "none" });
    $("#lay0").css({ display: "flex" });
  } else if (ed.action === "resetQuicks") {
    quickAnimations = [];
  }
  document.onkeyup = function (data) {
    if (data.which == 27 && menuOpen) {
      menuOpen = false;
      $("#mainDiv").hide();
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ action: "close" }));
    }
    if (data.which == 27 && animPosOpen) {
      animPosOpen = false;
      $("#animPosInfoDiv")
        .css({ right: "2%", position: "absolute", display: "flex" })
        .animate({ right: "-10%" }, 400, function () {
          $("#animPosInfoDiv").fadeOut();
        });
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ action: "closeAnimPos" }));
    }
  };
});

function clFunc(name1, name2, name3, name4, name5, name6) {
  if (name1 === "chooseCategory") {
    UpdateLayout();
    updateRange();
    if (currentCategory) {
      document
        .getElementById(`MDLSBCategoryDiv-${currentCategory}`)
        .classList.remove("MDLSBCategoryDivActive");
    }

    totalItems = Number(name3);
    currentCategory = name2;

    currentRangeStart = 0;
    currentRangeEnd = 8;
    document
      .getElementById(`MDLSBCategoryDiv-${name2}`)
      .classList.add("MDLSBCategoryDivActive");
    $("#found").css({ display: "flex" });
    $("#layout0").css({ display: "block" });
    if (name2 === "favorites") {
      //layout = 0;
      //UpdateLayout();
      favoritesActive = true;
      document.getElementById("mainDivRightSideBottomTop").innerHTML = "";
      document.getElementById("mainDivRightSideBottomTop").scrollTop = 0;
      $("#found").css({ display: "none" });
      // $("#layout0").css({'display': 'none'});
      // $("#found").css({'display': 'none'});
      // $("#mainDivRightSideBottomTop").css({'flex-direction': 'column'});
      // $("#mainDivRightSideBottomTop").css({'flex-wrap': 'nowrap'});
      // $("#lay0").css({'display': 'none'});
      // $("#lay1").css({'display': 'flex'});
      favoriteAnimations.forEach(function (favData, index) {
        let name = "/e " + favData.name;
        if (name.length > 9) {
          name = name.slice(0, 9) + "...";
        }
        let category = favData.category;
        if (favData.category === "general") {
          category = "emotes";
        }
        $(`#mainDivRightSideBottomTopDiv-${favData.id}`).hover(
          function () {
            $(`#MDRSBTDTopDivCommand-${favData.id}`).html(
              `<h4>/e ${favData.name}</h4>`
            );
          },
          function () {
            $(`#MDRSBTDTopDivCommand-${favData.id}`).html(`<h4>${name}</h4>`);
          }
        );
        var animHTML = `
                <div class="flex MDLSBasdDiv  w-[15.2083vw] h-[5.5556vh] shrink-0 border  rounded-[.2604vw] border-solid border-[rgba(255,255,255,0.05)]" id="mainDivRightSideBottomTopDiv-${favData.id}" onclick="clFunc('playAnim', '${favData.animId}', '${favData.category}')">
   
                            <div class="flex justify-center items-center w-[20%] h-full">
                                <div class="flex justify-center items-center w-[1.8229vw] h-[3.2407vh] shrink-0 border [background:rgba(255,255,255,0.03)] rounded-[.2604vw] border-solid border-[rgba(255,255,255,0.05)]">
                                    <img src="./files/danceicon.png" class="h-[1.5741vh]">
                                </div>
                            </div>
                            <div class="flex w-[80%] h-full">
                                <div class="w-[50%] h-full">
                                    <div class="w-full h-[20%]"></div>
                                    <div class="w-full h-[30%] text-[#FFF] [font-family:'DM_Sans'] text-[.7292vw] textttb" id="MDRSBTDBottomDiv" onclick="clFunc('playAnim', '${favData.animId}', '${favData.category}')">${favData.label}</div>
                                    <div class="w-full h-[30%] text-[#AAA] [font-family:'DM_Sans'] text-[.6771vw] textttb"> ${name}</div>
                                    <div class="flex justify-center items-end w-full h-[20%]"  onclick="clFunc('playAnim', '${favData.animId}', '${favData.category}')"></div>
                                </div>
                                <div class="w-[50%] h-full flex justify-end items-center px-[0.7vw] z-[12312321]">
                                <div id="MDRSBTDTopDiv-${favData.id}" class="MDRSBTDTopDiv MDRSBTDTopDivFav">
                                    <img src="./files/fav.png"  onclick="clFunc('addAnimToFavorites', '${favData.id}')" class="w-[11px] h-[11px]">
                                    </div>
                                </div>
                               
                            </div>
                        </div>`;

        appendHtml(
          document.getElementById("mainDivRightSideBottomTop"),
          animHTML
        );
        $(`#mainDivRightSideBottomTopDiv-${favData.id}`).data(
          "animData",
          favData
        );
      });
      handleDragDrop();
      return;
    } else {
      favoritesActive = false;
    }
    if (name2 === "all") {
      favoritesActive = false;
      currentCategoryAnims = animations;
      XEMOTES = animations;
      defaultScrollValue = 0.268;
    } else {
      currentCategoryAnims = [];
      XEMOTES = [];
      animations.forEach(function (animData, index) {
        if (animData.category === name2) {
          currentCategoryAnims.push({
            id: animData.id,
            name: animData.name,
            label: animData.label,
            category: animData.category,
            imgId: animData.imgId,
            animId: animData.animId,
          });
          XEMOTES.push({
            id: animData.id,
            name: animData.name,
            label: animData.label,
            category: animData.category,
            imgId: animData.imgId,
            animId: animData.animId,
          });
        }
      });
      defaultScrollValue = 70 / (currentCategoryAnims.length / 21) - 0.3;
    }
    // defaultScrollValue = (window.innerHeight / currentCategoryAnims.length * 162) * 0.268;
    setTimeout(() => {
      updateRange();
    }, 100);
  } else if (name1 === "addAnimToFavorites") {
    let existingFavAnim = favoriteAnimations.find(
      (item) => item.id === Number(name2)
    );
    if (existingFavAnim) {
      favoriteAnimations = favoriteAnimations.filter(
        (item) => item.id !== Number(name2)
      );
      playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
      document
        .getElementById(`MDRSBTDTopDiv-${Number(name2)}`)
        .classList.remove("MDRSBTDTopDivFav");
      if (
        document.getElementById(`mainDivRightSideBottomTopDiv-${Number(name2)}`)
      ) {
        document
          .getElementById(`mainDivRightSideBottomTopDiv-${Number(name2)}`)
          .remove();
      }
      document.getElementById(
        `MDLSBCategoryDivTexts2-favorites`
      ).innerHTML = `Favorites`;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          action: "saveFavAnims",
          favoriteAnimations: favoriteAnimations,
        })
      );
    } else {
      let existingAnim = currentCategoryAnims.find(
        (item) => item.id === Number(name2)
      );
      if (existingAnim) {
        favoriteAnimations.push({
          id: existingAnim.id,
          name: existingAnim.name,
          label: existingAnim.label,
          category: existingAnim.category,
          imgId: existingAnim.imgId,
          animId: existingAnim.animId,
        });
        playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            action: "saveFavAnims",
            favoriteAnimations: favoriteAnimations,
          })
        );
        document.getElementById(
          `MDLSBCategoryDivTexts2-favorites`
        ).innerHTML = `Favorites`;
        document
          .getElementById(`MDRSBTDTopDiv-${existingAnim.id}`)
          .classList.add("MDRSBTDTopDivFav");
      }
    }
    if (favoriteAnimations.length >= 1) {
      document.getElementById("MDLSBCategoryDiv-favorites").style.display =
        "flex";
    } else {
      document.getElementById("MDLSBCategoryDiv-favorites").style.display =
        "none";
    }
  } else if (name1 === "playAnim") {
    playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({ action: "playAnim", id: Number(name2), category: name3 })
    );
  }
}
function appendHtml(el, str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

const mainDiv = document.getElementById("mainDivRightSideBottomTop");

mainDiv.addEventListener("wheel", function (event) {
  event.preventDefault();
  if (typeof favoritesActive !== "undefined" && favoritesActive) {
    if (event.deltaY > 0) {
      mainDiv.scrollTop += 30;
    } else {
      mainDiv.scrollTop -= 30;
    }
    return;
  }
  if (event.deltaY >= 0) {
    if (currentRangeEnd > XEMOTES.length) {
      currentRangeStart = 0;
      currentRangeEnd = 8;
      return updateRange();
    }
    currentRangeStart += EMOTE_SLICE_SIZE;
    currentRangeEnd += EMOTE_SLICE_SIZE;
    updateRange();
  } else if (event.deltaY < 0) {
    if (currentRangeStart <= 0) {
      currentRangeStart = 0;
      currentRangeEnd = 8;
      return updateRange();
    }
    currentRangeStart -= EMOTE_SLICE_SIZE;
    currentRangeEnd -= EMOTE_SLICE_SIZE;
    updateRange();
  }
});
document
  .getElementById("mainDivRightSideBottomTop")
  .setAttribute("tabindex", "0");

function getArraySlice(array, startIndex, endIndex) {
  return array.slice(startIndex, Math.min(endIndex, array.length) + 7);
}

function updateContent(emotes) {
  document.getElementById("mainDivRightSideBottomTop").innerHTML = "";
  const fragment = document.createDocumentFragment();
  emotes.forEach((item, index) => {
    let existingAnim = currentCategoryAnims.find(
      (animation) => animation.id === item.id
    );

    if (existingAnim) {
      let name = "/e " + item.name;
      if (name.length > 9) {
        name = name.slice(0, 9) + "...";
      }
      // Fav Exists
      let dclass = "";
      let existingFavAnim = favoriteAnimations.find(
        (animation) => animation.id === item.id
      );
      if (existingFavAnim) {
        dclass = "MDRSBTDTopDivFav";
      }
      let category = item.category;
      if (item.category === "general") {
        category = "emotes";
      }
      let src = "";
      if (category === "placedemotes" || category == "syncedemotes") {
        src = "files/unknown.png";
      }
      const divItem = document.createElement("div");
      //divItem.addEventListener("click", function(e) {clFunc('playAnim', item.animId, item.category)}, false);

      // divItem.id = `mainDivRightSideBottomTopDiv-${item.id}`;
      // $(`mainDivRightSideBottomTopDiv-${item.id}`).data("animData", existingAnim);
      $(divItem).data("animData", item);
      $(divItem).hover(
        function () {
          $(`#MDRSBTDTopDivCommand-${item.id}`).html(
            `<h4>/e ${item.name}</h4>`
          );
        },
        function () {
          $(`#MDRSBTDTopDivCommand-${item.id}`).html(`<h4>${name}</h4>`);
        }
      );
      if (layout == 0) {
        divItem.innerHTML = `
                <div id="lay0" class="flex flex-col justify-end items-start px-[0.2vw] py-[1.4vh] w-[7.2917vw] h-[12.963vh] shrink-0 border [background:rgba(255,255,255,0.03)] rounded-[.2604vw] border-solid border-[rgba(255,255,255,0.05)]"  onclick="clFunc('playAnim', '${item.animId}', '${item.category}')">
                <div id="MDRSBTDTopDiv-${item.id}" class="MDRSBTDTopDiv ${dclass}">
                <img src="./files/fav.png" onclick="clFunc('addAnimToFavorites', '${item.id}')" class="w-[11px] h-[11px] z-[12312321]">
                </div>
                <div class="flex justify-center items-center w-full h-[70%]" id="geniun-${item.id}">
                
                </div>
                <div class="w-full h-[25%]">
                        <div class="w-full h-[20%]"></div>
                        <div class="flex justify-center items-center w-full h-[30%] text-[#FFF] [font-family:'DM_Sans'] text-[.7292vw] textttb">${item.label}</div>
                        <div class="flex justify-center items-start w-full h-[30%] text-[#AAA] [font-family:'DM_Sans'] text-[.5771vw] textttb">commands : ${name}</div>
                        <div class="w-full h-[20%]"></div>
                </div>
                <div class="w-full h-[5%]"></div>
                </div>`;
      } else if (layout == 1) {
        divItem.innerHTML = `
                <div id="lay1" class="flex w-[15.2083vw] h-[5.5556vh] shrink-0 border [background:rgba(255,255,255,0.03)] rounded-[.2604vw] border-solid border-[rgba(255,255,255,0.05)]"  onclick="clFunc('playAnim', '${item.animId}', '${item.category}')">
                <img onclick="clFunc('addAnimToFavorites', '${item.id}')">
                            <div class="flex justify-center items-center w-[20%] h-full">
                                <div class="flex justify-center items-center w-[1.8229vw] h-[3.2407vh] shrink-0 border [background:rgba(255,255,255,0.03)] rounded-[.2604vw] border-solid border-[rgba(255,255,255,0.05)]">
                                    <img src="./files/danceicon.png" class="h-[1.5741vh]">
                                </div>
                            </div>
                            <div class="flex w-[80%] h-full">
                                <div class="w-[50%] h-full">
                                    <div class="w-full h-[20%]"></div>
                                    <div class="w-full h-[30%] text-[#FFF] [font-family:'DM_Sans'] text-[.7292vw] textttb">${item.label}</div>
                                    <div class="w-full h-[30%] text-[#AAA] [font-family:'DM_Sans'] text-[.6771vw] textttb"> ${name}</div>
                                    <div class="flex justify-center items-end w-full h-[20%]"></div>
                                </div>
                                <div class="w-[50%] h-full flex justify-end items-center px-[0.7vw] z-[12312321]">
                                <div id="MDRSBTDTopDiv-${item.id}" class="MDRSBTDTopDiv ${dclass}">
                                    <img src="./files/fav.png" onclick="clFunc('addAnimToFavorites', '${item.id}')" class="w-[11px] h-[11px]">
                                    </div>
                                </div>
                               
                            </div>
                        </div>`;
      }
      createStaticImageFromGif(src, function (staticImageUrl) {
        const img = new Image();
        img.classList.add("h-full");
        img.src = staticImageUrl;
        img.classList.add("mainDivRightSideBottomTopDivWEBP");
        img.addEventListener("mouseenter", function () {
          img.src = src;
        });
        img.addEventListener("mouseleave", function () {
          img.src = staticImageUrl;
        });
        img.onerror = function () {
          img.src = "files/unknown.png";
        };
        img.setAttribute(
          "onclick",
          `clFunc('playAnim', '${item.animId}', '${item.category}')`
        );
        // divItem.appendChild(img);
        if (document.getElementById(`geniun-${item.id}`)) {
          document.getElementById(`geniun-${item.id}`).innerHTML = "";
          document.getElementById(`geniun-${item.id}`).appendChild(img);
        }
      });

      fragment.appendChild(divItem);
    }
  });
  document.getElementById("mainDivRightSideBottomTop").appendChild(fragment);
  handleDragDrop();
  setTimeout(() => {
    document.getElementById("mainDivRightSideBottomTop").scrollTop = 0;
  }, 150);
}

function createStaticImageFromGif(gifUrl, callback) {
  var img = new Image();
  checkIfImageExists(gifUrl, function (imgExists) {
    if (imgExists === false) {
      img.src = "files/unknown.png";
      callback("files/unknown.png");
    }
  });
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var staticImageUrl = canvas.toDataURL("image/png");
    callback(staticImageUrl);
  };
  img.src = gifUrl;
}

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
}

function updateRange() {
  let newEmoteRange = getArraySlice(
    XEMOTES,
    currentRangeStart,
    currentRangeEnd
  );
  updateContent(newEmoteRange);
}

const inputElement = document.getElementById("MDBSearchInput");
inputElement.addEventListener("input", function (event) {
  const userInput = event.target.value;
  if (userInput.length !== 0) {
    XEMOTES = findEmoteByPartialLabel(currentCategoryAnims, userInput);
    currentRangeStart = 0;
    currentRangeEnd = 8;
    updateRange();
  } else {
    XEMOTES = currentCategoryAnims;
    currentRangeStart = 0;
    currentRangeEnd = 8;
    updateRange();
  }
});

function findEmoteByPartialLabel(emotes, partialLabel) {
  const matchingLabels = emotes.filter((emote) =>
    emote.label.toLowerCase().includes(partialLabel.toLowerCase())
  );
  return matchingLabels;
}

function playSound(sound, type) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ action: "playSound", sound: sound, type: type }));
}

IsDragging = false;
function handleDragDrop() {
  // Normal
  $(".mainDivRightSideBottomTopDivDraggable").draggable({
    helper: "clone",
    appendTo: "body",
    scroll: false,
    revertDuration: 0,
    revert: "invalid",
    start: function (event, ui) {
      IsDragging = true;
      let data = $(this).data("animData");
      let dclass = "";
      let existingFavAnim = favoriteAnimations.find(
        (animation2) => animation2.id === data.id
      );
      if (existingFavAnim) {
        dclass = "MDRSBTDTopDivFav";
      }
      let name2 = "/e " + data.name;
      if (name2.length > 9) {
        name2 = name2.slice(0, 9) + "...";
      }
      $(ui.helper).html(`
            <div id="MDRSBTDTopDiv-${data.id}" class="MDRSBTDTopDiv ${dclass}">
                <img>
                <div class="MDRSBTDTopDivCommand" id="MDRSBTDTopDivCommand-${data.id}"><h4>${name2}</h4></div>
            </div>
            <div id="MDRSBTDBottomDiv"><span>${data.label}</span></div>
            <div id="MDRSBTDBottomLineDiv"></div>`);
      $(ui.helper).css({
        width: $(this).width(),
        height: $(this).height(),
      });
      document.getElementById("mainDivRightSideBottomTopImp").style.display =
        "block";
    },
    stop: function () {
      setTimeout(function () {
        IsDragging = false;
        document.getElementById("mainDivRightSideBottomTopImp").style.display =
          "none";
      }, 300);
    },
  });
  $(".mainDivRightSideBottomTopDiv2").droppable({
    accept: ".mainDivRightSideBottomTopDiv",
    drop: function (event, ui) {
      setTimeout(function () {
        IsDragging = false;
      }, 300);
      fromData = ui.draggable.data("animData");
      addAnimToQuick(fromData, Number($(this).attr("data-slot")));
    },
  });
  //
  $(".mainDivRightSideBottomTopDiv2").draggable({
    helper: "clone",
    appendTo: "body",
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
        document.getElementById("mainDivRightSideBottomTopImp").style.display =
          "block";
      } else {
        event.preventDefault();
      }
    },
    stop: function () {
      setTimeout(function () {
        IsDragging = false;
        document.getElementById("mainDivRightSideBottomTopImp").style.display =
          "none";
      }, 300);
    },
  });
  $("#mainDivRightSideBottomTopImp").droppable({
    accept: ".mainDivRightSideBottomTopDiv2",
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
  quickAnimations[id] = {
    id: data.id,
    name: data.name,
    label: data.label,
    category: data.category,
    imgId: data.imgId,
    slot: id,
    animId: data.animId,
  };
  let category = data.category;
  if (category === "general") {
    category = "emotes";
  }
  let src = "";
  if (category === "placedemotes" || category == "syncedemotes") {
    src = "files/unknown.png";
  }
  // document.getElementById(`mainDivRightSideBottomBottomDiv-Slot${id}`).classList.add("mainDivRightSideBottomTopDivQuick");
  document.getElementById(
    `mainDivRightSideBottomBottomDiv-Slot${id}`
  ).innerHTML = `
    <div class="mainDivRightSideBottomTopDiv mainDivRightSideBottomTopDivSlot">
        <div class="MDRSBTDTopDiv" style="height: 0;"></div>
        <img class="mainDivRightSideBottomTopDivWEBP" src="${src}" style="bottom: 25%; width: 3vw;">
        <div id="MDRSBTDBottomDiv" style="padding-top: 0; position: absolute; left: 0; right: 0; bottom: 8%; margin: auto;"><span>${data.label}</span></div>
    </div>
    <div class="mainDivRightSideBottomTopDiv2KeyDiv">${pKey} + ${id}</div>`;
  document
    .getElementById(`mainDivRightSideBottomBottomDiv-Slot${id}`)
    .addEventListener(
      "click",
      function (e) {
        clFunc("playAnim", data.animId, data.category);
      },
      false
    );
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      action: "saveQuickAnims",
      quickAnimations: quickAnimations,
    })
  );
  playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
}

function removeAnimFromQuick(id) {
  if (quickAnimations[id]) {
    quickAnimations[id] = null;
  }
  document.getElementById(
    `mainDivRightSideBottomBottomDiv-Slot${id}`
  ).innerHTML = `<div class="mainDivRightSideBottomTopDiv mainDivRightSideBottomTopDivSlot"></div>`;
  document
    .getElementById(`mainDivRightSideBottomBottomDiv-Slot${id}`)
    .addEventListener("click", function (e) {}, false);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      action: "saveQuickAnims",
      quickAnimations: quickAnimations,
    })
  );
  playSound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE");
}

$(document).ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `https://${GetParentResourceName()}/callback`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ action: "send_load" }));
});
