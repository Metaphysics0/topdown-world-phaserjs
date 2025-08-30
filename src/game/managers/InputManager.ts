import { Scene } from "phaser";

export class InputManager {
  private static instance: InputManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private scene!: Scene;

  private constructor() {}

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }
    return InputManager.instance;
  }

  public initialize(scene: Scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  public getMovementVector(): { x: number; y: number } {
    const speed = 100;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
    }

    return { x: velocityX, y: velocityY };
  }

  public isMoving(): boolean {
    return (
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown
    );
  }

  // Add more input methods as needed
  public isActionPressed(): boolean {
    // Example: spacebar for action
    return this.scene.input.keyboard!.checkDown(this.scene.input.keyboard!.addKey('SPACE'));
  }
}