import { Scene } from "phaser";

export class CameraController {
  private camera: Phaser.Cameras.Scene2D.Camera;
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.camera = scene.cameras.main;
    this.setupCamera();
  }

  private setupCamera() {
    this.camera.setBackgroundColor(0x00ff00);
    this.camera.roundPixels = true; // Critical for pixel art!
  }

  public setBounds(width: number, height: number) {
    this.camera.setBounds(0, 0, width, height);
  }

  public followTarget(target: Phaser.GameObjects.GameObject) {
    this.camera.startFollow(target);
  }

  public stopFollowing() {
    this.camera.stopFollow();
  }

  public setZoom(zoom: number) {
    this.camera.setZoom(zoom);
  }

  public fadeIn(duration: number = 500, callback?: () => void) {
    this.camera.fadeIn(duration, 0, 0, 0, callback);
  }

  public fadeOut(duration: number = 500, callback?: () => void) {
    this.camera.fadeOut(duration, 0, 0, 0, callback);
  }

  public shake(duration: number = 100, intensity: number = 0.01) {
    this.camera.shake(duration, intensity);
  }

  // Add more camera effects as needed
  public pan(x: number, y: number, duration: number = 1000, callback?: () => void) {
    this.camera.pan(x, y, duration, 'Linear', false, callback);
  }
}