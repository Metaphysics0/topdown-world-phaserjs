import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const progressBar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    this.load.on("progress", (progress: number) => {
      progressBar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("adventure-assets");
    this.load.tilemapTiledJSON("map", "overworld-map.json");
    this.load.image("overworld_tileset-again", "overworld_tileset.png");
    this.load.bitmapFont(
      "retro",
      "fonts/click-font.png",
      "fonts/click-font.xml"
    );

    this.load.atlas(
      "player",
      "char_sprites/soldier_spritesheet.png",
      "soldier-sprites-tp-hash.json"
    );
  }

  create() {
    const idleFrames = [];
    for (let i = 1; i <= 6; i++) {
      idleFrames.push({ key: "player", frame: `sprite${i}` });
    }
    this.anims.create({
      key: "idle",
      frames: idleFrames,
      frameRate: 6,
      repeat: -1,
    });

    const walkFrames = [];
    for (let i = 7; i <= 12; i++) {
      walkFrames.push({ key: "player", frame: `sprite${i}` });
    }
    this.anims.create({
      key: "walk",
      frames: walkFrames,
      frameRate: 12,
      repeat: -1,
    });

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
