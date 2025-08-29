import { type GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background!: GameObjects.Image;
  logo!: GameObjects.Image;
  title!: GameObjects.Text;
  logoTween!: Phaser.Tweens.Tween | null;

  MENU_ITEMS = ["start", "controls", "about"];

  constructor() {
    super("MainMenu");
  }

  create() {
    this.background = this.add.image(512, 384, "background");

    this.logo = this.add.image(512, 300, "logo").setDepth(100);

    const menuItemStyles = {
      fontFamily: "Arial Black",
      fontSize: 38,
      color: "#fff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    };

    for (const [idx, menuItem] of this.MENU_ITEMS.entries()) {
      this.add
        .text(512, 460 + idx * 80, menuItem, menuItemStyles)
        .setOrigin(0.5)
        .setDepth(100);
    }

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start("Game");
  }
}
