<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "./main.less";

  #app{
    -background-color: gray;
    height: @viewport-height;
  }
</style>
