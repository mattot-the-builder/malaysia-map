import { State2DPath } from "../types";
import svgData from "../assets/MalaysiaMapSvgData.json";
import { camelToTitleCase } from "../utils";

export default class MalaysiaMap {
  stateSvgPath: State2DPath[] = [];
  canvas: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  canvasBoundingClient!: DOMRect;
  currentActiveState: State2DPath | null = null;
  dpr = window.devicePixelRatio;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    this.initCanvas();
    this.initStates();
    this.draw();

    this.canvas.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    });

    this.canvas.addEventListener("click", (e) => {
      this.handleMouseClick(e);
    });
  }

  private initCanvas() {
    if (!this.canvas.getContext) {
      throw new Error("Canvas not supported");
    }

    this.ctx = this.canvas.getContext("2d");

    this.canvasBoundingClient = this.canvas.getBoundingClientRect();
    this.canvas.width = 704 * this.dpr;
    this.canvas.height = 300 * this.dpr;
    this.ctx!.canvas.width = this.canvas.width;
    this.ctx!.canvas.height = this.canvas.height;

    const scaleX = (window.innerWidth / this.canvas.width) * 0.8;
    const scaleY = (window.innerHeight / this.canvas.height) * 0.8;

    const scaleToFit = Math.min(scaleX, scaleY);
    // const scaleToCover = Math.max(scaleX, scaleY);

    this.canvas.style.transformOrigin = "0 0"; //scale from top left
    this.canvas.style.transform = `scale(${scaleToFit})`;
    this.canvas.style.margin = "4rem";
  }

  private initStates() {
    const perlis: State2DPath = {
      stateName: "perlis",
      pathData: new Path2D(),
    };
    const kedah: State2DPath = { stateName: "kedah", pathData: new Path2D() };
    const pulauPinang: State2DPath = {
      stateName: "pulauPinang",
      pathData: new Path2D(),
    };
    const perak: State2DPath = { stateName: "perak", pathData: new Path2D() };
    const kelantan: State2DPath = {
      stateName: "kelantan",
      pathData: new Path2D(),
    };
    const terengganu: State2DPath = {
      stateName: "terengganu",
      pathData: new Path2D(),
    };
    const pahang: State2DPath = {
      stateName: "pahang",
      pathData: new Path2D(),
    };
    const johor: State2DPath = { stateName: "johor", pathData: new Path2D() };
    const melaka: State2DPath = {
      stateName: "melaka",
      pathData: new Path2D(),
    };
    const negeriSembilan: State2DPath = {
      stateName: "negeriSembilan",
      pathData: new Path2D(),
    };
    const selangor: State2DPath = {
      stateName: "selangor",
      pathData: new Path2D(),
    };
    const kualaLumpur: State2DPath = {
      stateName: "kualaLumpur",
      pathData: new Path2D(),
    };
    const putrajaya: State2DPath = {
      stateName: "putrajaya",
      pathData: new Path2D(),
    };
    const sabah: State2DPath = { stateName: "sabah", pathData: new Path2D() };
    const sarawak: State2DPath = {
      stateName: "sarawak",
      pathData: new Path2D(),
    };

    this.stateSvgPath.push(
      perlis,
      kedah,
      pulauPinang,
      perak,
      kelantan,
      terengganu,
      pahang,
      johor,
      melaka,
      negeriSembilan,
      selangor,
      kualaLumpur,
      putrajaya,
      sabah,
      sarawak,
    );

    this.stateSvgPath.forEach((statePath, index) => {
      svgData[index].pathData.forEach((pathData) => {
        statePath.pathData.addPath(new Path2D(pathData));
      });
    });
  }

  private draw() {
    if (!this.ctx) return;
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stateSvgPath.forEach((statePath) => {
      if (this.ctx) {
        this.ctx.fillStyle = "#e4e4e7";

        if (this.currentActiveState === statePath) {
          this.ctx.fillStyle = "#015caa";
        }

        this.ctx.fill(statePath.pathData);
      }
    });
  }

  private handleMouseMove(e: MouseEvent) {
    this.stateSvgPath.forEach((statePath) => {
      if (this.ctx) {
        this.ctx.fillStyle = "#e4e4e7";

        console.log(e.offsetX, e.offsetY);

        if (
          this.ctx.isPointInPath(statePath.pathData, e.offsetX, e.offsetY) ||
          this.currentActiveState === statePath
        ) {
          console.log("current hovering state: ", statePath.stateName);
          this.ctx.fillStyle = "#015caa";
        }
        this.ctx.fill(statePath.pathData);
      }
    });
  }

  private handleMouseClick(e: MouseEvent) {
    this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stateSvgPath.forEach((statePath) => {
      if (this.ctx) {
        this.ctx.fillStyle = "#e4e4e7";

        if (this.ctx.isPointInPath(statePath.pathData, e.offsetX, e.offsetY)) {
          this.setCurrentActiveState(statePath);
          console.log(
            "current active state: ",
            this.currentActiveState?.stateName,
          );

          this.ctx.fillStyle = "#015caa";

          this.ctx.font = "48px sans-serif";
          this.ctx.fillText(camelToTitleCase(statePath.stateName), 200, 80);
        }

        this.ctx.fill(statePath.pathData);
      }
    });
  }

  private setCurrentActiveState(statePath: State2DPath) {
    if (this.currentActiveState === statePath) {
      this.currentActiveState = null;
      return;
    }

    this.currentActiveState = statePath;
  }
}
