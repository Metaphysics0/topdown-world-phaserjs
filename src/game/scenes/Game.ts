import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;

  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  backgroundLayer!: Phaser.Tilemaps.TilemapLayer;

  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  gameText!: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.createMap();
    this.createPlayer();

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

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
    this.player.setSize(15, 18);
    this.player.setOrigin(0.5, 1);
    this.player.anims.play("idle");
  }

  private createMap() {
    this.map = this.make.tilemap({ key: "map" });
    const tileset = this.map.addTilesetImage(
      "overworld_tileset-again", // <-- name from your JSON
      "overworld_tileset-again" // <-- key you used in preload
    )!;

    this.map.createLayer("Tile Layer 1", tileset, 0, 0);
    this.map.createLayer("Tile Layer 2", tileset, 0, 0);
  }

  private handleInput() {
    const speed = 100;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
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
