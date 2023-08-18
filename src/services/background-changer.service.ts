export class BackgroundChangerService {
  private morningBackground() {
    document.body.style.background =
      "linear-gradient(to right top, #94daff, #95e2ff, #99e9fe, #9ff0fd, #a8f7fb, #aef9f2, #b7fae9, #c2fbe1, #d0f7d0, #e0f1c3, #f0eaba, #ffe3b7)";
    document.body.style.backgroundSize = "600% 100%";
    document.querySelector(".z-1")?.classList.add("hidden");
    document.querySelector(".z-2")?.classList.add("hidden");
    document.querySelector(".z-3")?.classList.add("hidden");
    document.querySelector(".footer")?.classList.remove("white");
  }

  private nightBackground() {
    document.body.style.background =
      "linear-gradient(to left bottom, #0b0c1a, #0d0e21, #0e1028, #0e112f, #0f1236, #14143b, #1a1741, #201946, #291e4b, #322451, #3a2956, #432f5c)";
    document.body.style.backgroundSize = "600% 100%";
    document.querySelector(".z-1")?.classList.remove("hidden");
    document.querySelector(".z-2")?.classList.remove("hidden");
    document.querySelector(".z-3")?.classList.remove("hidden");
    document.querySelector(".footer")?.classList.add("white");
  }

  private sunsetBackground() {
    document.body.style.background =
      "linear-gradient(346deg, #1f214d, #ff835d, #FFCE61, #ffe58A)";
    document.body.style.backgroundSize = "600% 100%";
    document.querySelector(".z-1")?.classList.add("hidden");
    document.querySelector(".z-2")?.classList.add("hidden");
    document.querySelector(".z-3")?.classList.add("hidden");
    document.querySelector(".footer")?.classList.remove("white");
  }

  private afternoonBackground() {
    document.body.style.background =
      "linear-gradient(to left bottom, #73b0ff, #50c2ff, #26d2ff, #00e1ff, #2aefff, #54f5f7, #73faef, #8dffe8, #a4ffe4, #b8ffe2, #c9ffe2, #d8ffe4)";
    document.body.style.backgroundSize = "600% 100%";
    document.querySelector(".z-1")?.classList.add("hidden");
    document.querySelector(".z-2")?.classList.add("hidden");
    document.querySelector(".z-3")?.classList.add("hidden");
    document.querySelector(".footer")?.classList.remove("white");
  }

  public initBackground(localTime: number) {
    if (localTime >= 6 && localTime < 12) {
      this.morningBackground();
    } else if (localTime >= 12 && localTime < 18) {
      this.afternoonBackground();
    } else if (localTime >= 18 && localTime < 23) {
      this.sunsetBackground();
    } else {
      this.nightBackground();
    }
  }
}
