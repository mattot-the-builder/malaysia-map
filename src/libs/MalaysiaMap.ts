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

    const scaleX = (window.innerWidth / this.canvas.width);
    const scaleY = (window.innerHeight / this.canvas.height);

    const scaleToFit = Math.min(scaleX * 0.5, scaleY * 0.5);
    // const scaleToCover = Math.max(scaleX, scaleY);

    this.canvas.style.transformOrigin = "0 0"; //scale from top left
    this.canvas.style.transform = `scale(${scaleToFit})`;
    this.canvas.style.margin = "4rem";
  }

  private initStates() {
    const perlis: State2DPath = {
      stateName: "perlis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const kedah: State2DPath = {
      stateName: "kedah",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const pulauPinang: State2DPath = {
      stateName: "pulauPinang",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const perak: State2DPath = {
      stateName: "perak",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const kelantan: State2DPath = {
      stateName: "kelantan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const terengganu: State2DPath = {
      stateName: "terengganu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const pahang: State2DPath = {
      stateName: "pahang",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const johor: State2DPath = {
      stateName: "johor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const melaka: State2DPath = {
      stateName: "melaka",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const negeriSembilan: State2DPath = {
      stateName: "negeriSembilan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const selangor: State2DPath = {
      stateName: "selangor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const kualaLumpur: State2DPath = {
      stateName: "kualaLumpur",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const putrajaya: State2DPath = {
      stateName: "putrajaya",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const sabah: State2DPath = {
      stateName: "sabah",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
      pathData: new Path2D(),
    };
    const sarawak: State2DPath = {
      stateName: "sarawak",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
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

  private renderStateInfoCard(x: number, y: number) {
    const stateImage = new Image();
    const imageDimension = {
      width: 100,
      height: 100,
    };

    stateImage.src = "https://picsum.photos/100";

    if (this.currentActiveState) {
      stateImage.addEventListener("load", () => {
        this.ctx!.drawImage(stateImage, x, y);
      });
    }

    const svg = this.generateSvgCardTemplate();

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgObjectUrl = URL.createObjectURL(svgBlob);

    console.log("init tempImage");
    const tempImage = new Image();
    tempImage.src = svgObjectUrl;

    tempImage.addEventListener("load", () => {
      this.ctx!.drawImage(tempImage, x, y + imageDimension.height);
      URL.revokeObjectURL(svgObjectUrl);
    });
  }

  private generateSvgCardTemplate() {
    if (!this.currentActiveState) {
      return "";
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${this.canvas.width}" height="${this.canvas.height}">
        <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="max-width: 200px">
              <h4>${this.currentActiveState.stateName}</h4>
              <p>${this.currentActiveState.description}</p>
            </div>
        </foreignObject>
      </svg>
    `;
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

        if (
          this.ctx.isPointInPath(statePath.pathData, e.offsetX, e.offsetY) ||
          this.currentActiveState === statePath
        ) {
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
          this.renderStateInfoCard(200, 0);
        }

        this.ctx.fill(statePath.pathData);
      }
    });
  }

  private setCurrentActiveState(statePath: State2DPath | null) {
    if (this.currentActiveState === statePath) {
      this.currentActiveState = null;
      return;
    }

    this.currentActiveState = statePath;
    // alert(this.currentActiveState?.stateName);
  }
}
