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

    this.createMap();
    this.createPlayer();

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.handleInput();
  }

  changeScene() {
    this.scene.start("GameOver");
  }

  private createPlayer() {
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setSize(15, 19);
    this.player.anims.play("idle");
  }

  private createMap() {
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
  }

  private handleInput() {
    const cursors = this.input.keyboard!.createCursorKeys();
    const speed = 100;

    this.player.setVelocity(0);

    if (cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    }

    if (cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }

    if (
      this.player.body.velocity.x !== 0 ||
      this.player.body.velocity.y !== 0
    ) {
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.play("idle", true);
    }
  }
}
