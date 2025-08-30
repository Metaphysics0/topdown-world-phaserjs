import { Scene } from "phaser";

export class Player {
  public sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public scene: Scene;
  public x: number = 100;
  public y: number = 100;
  private currentAnimation: string = "idle";

  constructor(scene: Scene) {
    this.scene = scene;
    this.createSprite();
  }

  private createSprite() {
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, "player");
    this.sprite.setSize(15, 18);
    this.sprite.setOrigin(0.5, 1);
    this.sprite.anims.play("idle");
  }

  public update() {
    // Store position for persistence
    this.x = this.sprite.x;
    this.y = this.sprite.y;
  }

  public move(velocityX: number, velocityY: number) {
    this.sprite.setVelocity(velocityX, velocityY);

    // Handle flip
    if (velocityX < 0) {
      this.sprite.setFlipX(true);
    } else if (velocityX > 0) {
      this.sprite.setFlipX(false);
    }

    // Handle animations - only change when needed
    const targetAnimation =
      velocityX !== 0 || velocityY !== 0 ? "walk" : "idle";
    if (this.sprite.anims.currentAnim?.key !== targetAnimation) {
      this.sprite.anims.play(targetAnimation);
    }
  }

  public destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }

  public recreateInScene(scene: Scene) {
    this.scene = scene;
    this.createSprite();
    // Restore position
    this.sprite.setPosition(this.x, this.y);
  }
}
