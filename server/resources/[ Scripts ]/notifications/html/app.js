const { createVuetify } = Vuetify;

const vuetify = createVuetify();

const app = Vue.createApp({
  data() {
    return {
      data: {
        Align: "",
        Background: "rgba(31, 40, 54, 0.8)",
        Types: [],
        Position: {},
      },

      activeNotifications: [],

      inProgress: {},

      itensNotify: [],

      positions: {
        ["top"]: "justify-start",
        ["bottom"]: "justify-end",
        ["center"]: "justify-center",
      },

      sides: {
        ["left"]: "align-start",
        ["right"]: "align-end",
      },
    };
  },
  methods: {
    createNotification(data) {
      if (this.data.UseSound) {
        this.playSound();
      }

      this.activeNotifications.push({
        title: data.title,
        type: data.type,
        message: data.message,
        duration: data.duration,
      });

      if (this.activeNotifications.length > 1) {
        return;
      }

      const intervalId = setInterval(() => {
        if (this.activeNotifications.length === 0) {
          clearInterval(intervalId);
          return;
        }

        this.activeNotifications.forEach((element) => {
          if (element.show == null) {
            element.show = true;
            element.divide = element.duration;
          }

          if (element.duration <= 0) {
            element.show = false;
          } else {
            element.progress = 100 - (element.duration / element.divide) * 100;
            element.duration = element.duration - 10;
          }
        });
      }, 10);
    },

    convertMessage(text) {
      text = text.replace(/~r~/g, "<span style='color:#ef5350';>");
      text = text.replace(/~g~/g, "<span style='color:#4caf50';>");
      text = text.replace(/~lg~/g, "<span style='color:#81c784';>");
      text = text.replace(/~lr~/g, "<span style='color:#e57373';>");
      text = text.replace(/~p~/g, "<span style='color:#7e57c2';>");
      text = text.replace(/~lp~/g, "<span style='color:#9575cd';>");
      text = text.replace(/~o~/g, "<span style='color:#ff9800';>");
      text = text.replace(/~lo~/g, "<span style='color:#ffb74d';>");
      text = text.replace(/~y~/g, "<span style='color:#FFDD32';>");
      text = text.replace(/~s~/g, "</span>");
      text = text.replace(/~w~/g, "</span>");
      text = text.replace(/~b~/g, "<b>");
      text = text.replace(/~n~/g, "<br>");
      text = "<span style='color:#eee';>" + text + "</span>";

      return text;
    },

    playSound() {
      const audio = new Audio("sound.mp3");
      audio.volume = 0.2;
      audio.play();
    },

    createProgress(timer, message) {
      if (this.inProgress.timer && this.inProgress.timer > 0) return;
      this.inProgress.initTime = timer;
      this.inProgress.timer = timer;
      this.inProgress.message = message;
      this.inProgress.porcent = 100;

      const intervalId = setInterval(() => {
        if (this.inProgress.timer <= 0) {
          clearInterval(intervalId);
          this.inProgress = {};
          return;
        }
        this.inProgress.timer = this.inProgress.timer - 100;
        this.inProgress.porcent = Math.ceil(
          (this.inProgress.timer / this.inProgress.initTime) * 100
        );
      }, 100);
    },

    createItemNotify(data) {
      if (data.item) {
        this.itensNotify.push({
          item: data.item,
          quantity: data.quantity || 1,
          icon:
            ((data.type === "ADICIONADO" || data.type === "RECEBEU") && "+") ||
            "-",
          color:
            ((data.type === "ADICIONADO" || data.type === "RECEBEU") &&
              "#2edb2e") ||
            "#e73131",
          duration: data.duration || 3000,
        });
        if (this.itensNotify.length > 1) {
          return;
        }

        const intervalId = setInterval(() => {
          if (this.itensNotify.length === 0) {
            clearInterval(intervalId);
            return;
          }
          this.itensNotify.forEach((element, i) => {
            if (element.duration <= 0) {
              this.itensNotify.splice(i, 1);
            } else {
              element.duration = element.duration - 10;
            }
          });
        }, 10);
      }
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      const { message, data, progress, itemNotify, hood } = event.data;

      if (message == "setData") {
        this.data = data;
      }

      if (message == "createNotification") {
        this.createNotification(data);
      }

      if (progress) {
        this.createProgress(event.data.time, event.data.message);
      }

      if (itemNotify) {
        this.createItemNotify(event.data);
      }
      if (hood) {
        document.getElementById("hood").style.display = "block";
      } else if (hood == false) {
        document.getElementById("hood").style.display = "none";
      }
    });
  },
});

app.use(vuetify).mount("#notifications");
