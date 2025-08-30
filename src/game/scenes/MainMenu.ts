import { type GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background!: GameObjects.Image;
  logo!: GameObjects.Image;
  title!: GameObjects.Text;

  MENU_ITEMS = ["begin"];

  constructor() {
    super("MainMenu");
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(width / 2, height / 2, "background");
    this.background.setDisplaySize(width, height);

    this.createMenuItems();
    this.createFooter();

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
          24
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      if (menuItem === "begin") {
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

  private createFooter() {
    this.add
      .bitmapText(this.scale.width / 2, 150, "retro", "ryan roberts", 12)
      .setOrigin(0.5)
      // .setTint(0x) // Gray color
      .setAlpha(0.6); // Low opacity (60%)
  }
}
