import { type GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background!: GameObjects.Image;
  logo!: GameObjects.Image;
  title!: GameObjects.Text;

  MENU_ITEMS = ["start", "controls", "about"];

  constructor() {
    super("MainMenu");
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(width / 2, height / 2, "background");
    this.background.setDisplaySize(width, height);

    this.createMenuItems();

    EventBus.emit("current-scene-ready", this);
  }

  private createMenuItems() {
    const baseY = 100; // where menu starts
    const spacing = 30; // vertical spacing between items

    for (const [idx, menuItem] of this.MENU_ITEMS.entries()) {
      const menuText = this.add
        .bitmapText(
          this.scale.width / 2,
          baseY + idx * spacing,
          "retro",
          menuItem.toUpperCase(),
          16
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      if (menuItem === "start") {
        menuText.on("pointerdown", () => this.scene.start("Game"));
      }
      menuText.on("pointerover", () => {
        menuText.setTint(0xffff00); // yellow
      });

      menuText.on("pointerout", () => {
        menuText.clearTint(); // back to white
      });
    }
  }
}
