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
    this.background = this.add.image(512, 384, "background");
    this.logo = this.add.image(512, 300, "logo").setDepth(100);

    this.createMenu();

    EventBus.emit("current-scene-ready", this);
  }

  private createMenu() {
    const menuItemStyles = {
      fontFamily: "Arial Black",
      fontSize: 38,
      color: "#fff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    };

    for (const [idx, menuItem] of this.MENU_ITEMS.entries()) {
      const menuText = this.add
        .text(512, 460 + idx * 80, menuItem, menuItemStyles)
        .setOrigin(0.5)
        .setDepth(100)
        .setInteractive({ useHandCursor: true });

      if (menuItem === "start") {
        menuText.on("pointerdown", () => this.scene.start("Game"));
      }

      menuText.on("pointerover", () => {
        menuText.setStyle({ color: "#ffff00" }); // Yellow on hover
      });

      menuText.on("pointerout", () => {
        menuText.setStyle({ color: "#fff" }); // White when not hovered
      });
    }
  }
}
