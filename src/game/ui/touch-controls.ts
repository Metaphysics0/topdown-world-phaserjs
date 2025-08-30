import { Scene } from "phaser";
import { InputManager } from "../managers/InputManager";

export class TouchControls {
  private scene: Scene;
  private inputManager: InputManager;
  private controlsContainer?: Phaser.GameObjects.Container;
  private dpadContainer?: Phaser.GameObjects.Container;
  private actionContainer?: Phaser.GameObjects.Container;

  constructor(scene: Scene) {
    this.scene = scene;
    this.inputManager = InputManager.getInstance();
  }

  public create() {
    this.createControls();
  }

  private createControls() {
    this.controlsContainer = this.scene.add.container(0, 0);
    this.controlsContainer.setScrollFactor(0);
    this.controlsContainer.setDepth(1000);

    this.createDPad();
  }

  private createDPad() {
    const dpadSize = 20;
    const margin = 15;
    const opacity = 0.6;

    const dpadX = this.gameWidth - margin - dpadSize * 1.5;
    const dpadY = this.gameHeight - margin - dpadSize * 1.5;

    this.dpadContainer = this.scene.add.container(dpadX, dpadY);
    this.dpadContainer.setScrollFactor(0);

    const buttonStyle = {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#333333",
      padding: { x: 8, y: 6 },
    };

    const upButton = this.scene.add
      .text(0, -dpadSize, "↑", buttonStyle)
      .setOrigin(0.5)
      .setAlpha(opacity)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => this.inputManager.setTouchInput("up", true))
      .on("pointerup", () => this.inputManager.setTouchInput("up", false))
      .on("pointerout", () => this.inputManager.setTouchInput("up", false));

    const downButton = this.scene.add
      .text(0, dpadSize, "↓", buttonStyle)
      .setOrigin(0.5)
      .setAlpha(opacity)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => this.inputManager.setTouchInput("down", true))
      .on("pointerup", () => this.inputManager.setTouchInput("down", false))
      .on("pointerout", () => this.inputManager.setTouchInput("down", false));

    const leftButton = this.scene.add
      .text(-dpadSize, 0, "←", buttonStyle)
      .setOrigin(0.5)
      .setAlpha(opacity)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => this.inputManager.setTouchInput("left", true))
      .on("pointerup", () => this.inputManager.setTouchInput("left", false))
      .on("pointerout", () => this.inputManager.setTouchInput("left", false));

    const rightButton = this.scene.add
      .text(dpadSize, 0, "→", buttonStyle)
      .setOrigin(0.5)
      .setAlpha(opacity)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => this.inputManager.setTouchInput("right", true))
      .on("pointerup", () => this.inputManager.setTouchInput("right", false))
      .on("pointerout", () => this.inputManager.setTouchInput("right", false));

    this.dpadContainer.add([upButton, downButton, leftButton, rightButton]);
    this.controlsContainer?.add(this.dpadContainer);
  }

  private createActionButtons() {
    const buttonSize = 16;
    const margin = 15;
    const opacity = 0.6;

    const actionX = this.gameWidth - margin - buttonSize;
    const actionY = this.gameHeight - margin - buttonSize;

    this.actionContainer = this.scene.add.container(actionX, actionY);
    this.actionContainer.setScrollFactor(0);

    const actionButtonStyle = {
      fontSize: "12px",
      color: "#ffffff",
      backgroundColor: "#444444",
      padding: { x: 6, y: 4 },
    };

    const actionButton = this.scene.add
      .text(0, 0, "A", actionButtonStyle)
      .setOrigin(0.5)
      .setAlpha(opacity)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => this.inputManager.setTouchInput("action", true))
      .on("pointerup", () => this.inputManager.setTouchInput("action", false))
      .on("pointerout", () => this.inputManager.setTouchInput("action", false));

    this.actionContainer.add(actionButton);
    this.controlsContainer?.add(this.actionContainer);
  }

  public destroy() {
    if (this.controlsContainer) {
      this.controlsContainer.destroy();
    }
  }

  public setVisible(visible: boolean) {
    if (this.controlsContainer) {
      this.controlsContainer.setVisible(visible);
    }
  }

  private get gameWidth() {
    return this.scene.scale.width;
  }

  private get gameHeight() {
    return this.scene.scale.height;
  }
}
