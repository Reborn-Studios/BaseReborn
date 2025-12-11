function RequestManager() {
  let _this = this;
  setInterval(function () {
    _this.tick();
  }, 1000);
  this.requests = [];
  this.div = document.createElement("div");
  this.div.classList.add("requestManager");
  document.body.appendChild(this.div);
}

RequestManager.prototype.buildTime = function (time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};

RequestManager.prototype.buildText = function (id, text, time) {
  return `
      <div class="request-container">
        <div class="diamond">
          <div id="diamond-icon-${id}" class="diamond-icon">${this.buildTime(
    time
  )}</div>
        </div>
        <div id="NotifyBackground">
          <div id="requestLabel">
            ${text}
          </div>
          <div id="requestButtons">
            <div class="requestButtonText">
              <div id="accept">Y</div>
              <div class="requestText">Aceitar</div>
            </div>
            <div class="requestButtonText">
              <div id="denied">U</div>
              <div class="requestText">Negar</div>
            </div>
          </div>
        </div>
      </div>
    `;
};

RequestManager.prototype.addRequest = function (id, text, time) {
  const request = {};
  request.div = document.createElement("div");
  request.id = id;
  request.time = time;
  request.text = text;
  request.div.innerHTML = this.buildText(id, text, time - 1);
  this.requests.push(request);
  this.div.appendChild(request.div);
};

RequestManager.prototype.respond = function (ok) {
  if (this.requests.length > 0) {
    const request = this.requests[0];
    if (this.onResponse) this.onResponse(request.id, ok);
    if (request.div.parentNode === this.div) {
      this.div.removeChild(request.div);
    }
    this.requests.splice(0, 1);
  }
};

RequestManager.prototype.tick = function () {
  for (let i = this.requests.length - 1; i >= 0; i--) {
    let request = this.requests[i];
    request.time -= 1;
    request.diamondIcon = document.getElementById(`diamond-icon-${request.id}`);
    request.diamondIcon.innerHTML = this.buildTime(request.time);
    if (request.time <= 0) {
      request.div.classList.add("slide-in-bottom");
      setTimeout(() => {
        if (request.div.parentNode === this.div) {
          this.div.removeChild(request.div);
        }
        let index = this.requests.indexOf(request);
        if (index !== -1) {
          this.requests.splice(index, 1);
        }
      }, 500);
    }
  }
};
