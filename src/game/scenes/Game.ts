import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;

  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  backgroundLayer!: Phaser.Tilemaps.TilemapLayer;

  gameText!: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      "overworld_tileset-again", // <-- name from your JSON
      "overworld_tileset-again" // <-- key you used in preload
    )!;

    console.log("TILESET", tileset);
    const offsetX =
      ((this.sys.game.config.width as number) - map.widthInPixels) / 2;
    const offsetY =
      ((this.sys.game.config.height as number) - map.heightInPixels) / 2;

    map.createLayer("Tile Layer 1", tileset, offsetX, offsetY);
    map.createLayer("Tile Layer 2", tileset, offsetX, offsetY);

    // Create each layer (use the layer names from Tiled)
    // const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
    // const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
    // // create each layer
    // map.createLayer("Tile Layer 1", tileset, 0, 0);
    // map.createLayer("Tile Layer 2", tileset, 0, 0);

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
