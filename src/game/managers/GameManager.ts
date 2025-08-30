import { Scene } from "phaser";
import { Player } from "../entities/Player";

export class GameManager {
  private static instance: GameManager;
  public player: Player | null = null;
  private currentScene: Scene | null = null;

  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public setCurrentScene(scene: Scene) {
    this.currentScene = scene;
  }

  public createPlayer(scene: Scene): Player {
    if (this.player) {
      // Player exists, recreate in new scene
      this.player.destroy();
      this.player.recreateInScene(scene);
    } else {
      // First time creating player
      this.player = new Player(scene);
    }
    return this.player;
  }

  public getPlayer(): Player | null {
    return this.player;
  }

  public destroyPlayer() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }

  // Add other game state management here
  public saveGameState() {
    // Save to localStorage or send to server
    const gameData = {
      playerX: this.player?.x || 100,
      playerY: this.player?.y || 100,
      // Add other game state
    };
    localStorage.setItem('gameState', JSON.stringify(gameData));
  }

  public loadGameState() {
    const savedData = localStorage.getItem('gameState');
    if (savedData) {
      const gameData = JSON.parse(savedData);
      // Restore game state
      return gameData;
    }
    return null;
  }
}