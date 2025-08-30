import { Scene } from "phaser";

export class InputManager {
  private static instance: InputManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private scene!: Scene;
  
  private touchInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    action: false,
  };

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

    const leftPressed = this.cursors.left.isDown || this.touchInput.left;
    const rightPressed = this.cursors.right.isDown || this.touchInput.right;
    const upPressed = this.cursors.up.isDown || this.touchInput.up;
    const downPressed = this.cursors.down.isDown || this.touchInput.down;

    if (leftPressed) {
      velocityX = -speed;
    } else if (rightPressed) {
      velocityX = speed;
    }

    if (upPressed) {
      velocityY = -speed;
    } else if (downPressed) {
      velocityY = speed;
    }

    return { x: velocityX, y: velocityY };
  }

  public isMoving(): boolean {
    return (
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown ||
      this.touchInput.left ||
      this.touchInput.right ||
      this.touchInput.up ||
      this.touchInput.down
    );
  }

  public isActionPressed(): boolean {
    return this.scene.input.keyboard!.checkDown(this.scene.input.keyboard!.addKey('SPACE')) || this.touchInput.action;
  }

  public setTouchInput(direction: keyof typeof this.touchInput, pressed: boolean) {
    this.touchInput[direction] = pressed;
  }

  public getTouchInput() {
    return { ...this.touchInput };
  }
}