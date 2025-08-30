import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../managers/GameManager";
import { InputManager } from "../managers/InputManager";
import { CameraController } from "../managers/CameraController";
import { Player } from "../entities/Player";
import { TouchControls } from "../ui/touch-controls";

export class Game extends Scene {
  private gameManager: GameManager;
  private inputManager: InputManager;
  private cameraController!: CameraController;
  private player!: Player;
  private touchControls!: TouchControls;

  map!: Phaser.Tilemaps.Tilemap;
  tileset!: Phaser.Tilemaps.Tileset;
  backgroundLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super("Game");
    this.gameManager = GameManager.getInstance();
    this.inputManager = InputManager.getInstance();
  }

  create() {
    this.gameManager.setCurrentScene(this);

    this.inputManager.initialize(this);
    this.cameraController = new CameraController(this);

    this.createMap();
    this.createPlayer();

    this.cameraController.setBounds(
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameraController.followTarget(this.player.sprite);

    this.touchControls = new TouchControls(this);
    this.touchControls.create();

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.handleInput();
    this.player.update();
  }

  changeScene() {
    this.scene.start("GameOver");
  }

  private createPlayer() {
    this.player = this.gameManager.createPlayer(this);
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
    const movement = this.inputManager.getMovementVector();
    this.player.move(movement.x, movement.y);
  }
}
