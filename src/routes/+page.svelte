<script lang="ts">
  import type { Scene } from "phaser";
  import PhaserGame, { type TPhaserRef } from "../PhaserGame.svelte";

  let phaserRef: TPhaserRef = { game: null, scene: null };

  const currentScene = (scene: Scene) => {
    console.log("scene", scene);
  };
</script>

<div id="app">
  <PhaserGame bind:phaserRef currentActiveScene={currentScene} />
</div>

<style>
  #app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
