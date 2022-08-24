<template>
	<div class="navbar">
		<div class="navbar-left">
      <slot name="left"></slot>
    </div>
		<div class="navbar-center">
      <slot name="center"></slot>
    </div>
		<div class="navbar-right" >
      <slot slot="right"></slot>
    </div>
	</div>
</template>

<script>
</script>

<style>
  .navbar {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    text-align: center;
  }
  .navbar-left {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar-right {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
