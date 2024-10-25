$(document).ready(function () {
  window.addEventListener("message", function (event) {
    let item = event.data;
    if (item.open) {
      $(".container").show();
      showInfos(item.infos);
    } else if (item.close) {
      $(".container").hide();
    } else if (item.type == "convert") {
      Convert(item.pMugShotTxd, item.id);
    }
  });
});

const showInfos = (info) => {
  $("#userId").html(`#${info.userId}`);
  $("#name").html(`${info.name}`);
  $("#phone").html(`${info.phone}`);
  $("#job").html(`${info.job}`);
  $("#bank").html(`R$${info.bank}`);
  $("#fines").html(`R$${info.fines}`);
  $("#vip").html(`${info.vip}`);
  $("#gems").html(`${info.gems}`);
  $("#serverName").html(`${info.serverName.toUpperCase()}`);
  $("#mugshot").attr("src", info.mugshot);
};

function getBase64Image(src, callback, outputFormat) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };

  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = src;
  }
}

function Convert(pMugShotTxd, id) {
  let tempUrl =
    "https://nui-img/" +
    pMugShotTxd +
    "/" +
    pMugShotTxd +
    "?t=" +
    String(Math.round(new Date().getTime() / 1000));
  if (pMugShotTxd == "none") {
    tempUrl =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";
  }
  getBase64Image(tempUrl, function (dataUrl) {
    $.post(
      "http://identity/Answer",
      JSON.stringify({
        Answer: dataUrl,
        Id: id,
      })
    );
  });
}
