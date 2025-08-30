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

    this.load.spritesheet("player", "char_sprites/soldier_spritesheet.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }), // depends on your spritesheet
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 13 }),
      frameRate: 6,
      repeat: -1,
    });

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
