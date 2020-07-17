<script>
  import { onDestroy } from 'svelte'
  let count = 20
  let from = null
  let timer = null
  let isCompleted = true

  $: count === 0 && reset()

  function start() {
    if (isCompleted) {
      from = count
      isCompleted = false
    }

    timer = setInterval(() => {
      count--
    }, 1000)
  }

  function pause() {
    clearInterval(timer)
    timer = null
  }

  function reset() {
    pause()
    isCompleted = true
    count = from
  }

  onDestroy(() => {
    reset()
  })
</script>

<style>
  .display {
    font-size: 2rem;
    width: 8rem;
  }

  .display:disabled {
    border-color: transparent;
    background-color: transparent;
    color: grey;
  }
</style>

<div>
  <input class="display" type="number" bind:value={count} disabled={timer}>
  <div>
    {#if timer}
      <button on:click={() => pause()} disabled={!timer}>Pause</button>
    {:else}
      <button on:click={() => start()} disabled={timer}>{isCompleted ? 'Start' : 'Continue'}</button>
    {/if}
    <button on:click={() => reset()}>Reset</button>
  </div>
</div>