import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;

  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  backgroundLayer!: Phaser.Tilemaps.TilemapLayer;

  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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

    const offsetX =
      ((this.sys.game.config.width as number) - map.widthInPixels) / 2;
    const offsetY =
      ((this.sys.game.config.height as number) - map.heightInPixels) / 2;

    map.createLayer("Tile Layer 1", tileset, offsetX, offsetY);
    map.createLayer("Tile Layer 2", tileset, offsetX, offsetY);

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setScale(0.8); // Scale down if needed
    // this.player.play("idle"); // Start with idle animation

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
