/**
* 实现webpack logo动图效果，参考链接https://www.uplabs.com/posts/pure-css-webpack-logo-animation
*/
<template>
	<div class="content">
    <div class="container-gif">
      <div class="cube innerCube">
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
      </div>
      <div class="cube outerCube">
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
      </div>
    </div>
	</div>
</template>
<script>

export default {
	name: 'webpackLogo'
}
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  @import url('https://fonts.googleapis.com/css?family=Geo&display=swap');

  @function rem($value) {
  @return unquote(($value/1px)/16+"rem");
  }
  $white:white;
  $outerCubeSize:100px;
  $innerCubeSize:50px;
  $blue:#5299c8;
  $ease:ease-in-out;
  $timing: 2s;

  @mixin cube($size){
    position:absolute;
    height: $size;
    width: $size;
    transform-style:preserve-3d;
    box-sizing:border-box;
    .side{
      height: 100%;
      width: 100%;
      position:absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin:auto;
      box-sizing:border-box;
      transform-style:preserve-3d;
      &:nth-child(1){
        transform:rotateX(90deg) translateZ(-$size / 2);
      }
      &:nth-child(2){
        transform:rotateX(-90deg) translatez(-$size / 2);
      }
      &:nth-child(3){
        transform:rotateY(-90deg) translatez(-$size / 2);
      }
      &:nth-child(4){
        transform:rotateY(90deg) translatez(-$size / 2);
      }
      &:nth-child(5){
        transform:translatez(-$size / 2);
      }
      &:nth-child(6){
        transform:rotatey(180deg) translatez(-$size / 2);
      }
    }
  }
  .container-gif{
    position:relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style:preserve-3d;
  }

  .outerCube{
  @include cube($outerCubeSize);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    transform:rotateX(-35deg) rotateY(45deg);
    animation:OuterCubeAnimate $ease $timing infinite;
    .side{
      border:2px solid #334966;
      background-color: rgba(#ffffff,0.25);
    }
  }

  .innerCube{
  @include cube($innerCubeSize);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    transform:rotateX(-35deg) rotateY(45deg);
    animation:OuterCubeAnimate $ease  $timing infinite reverse;
    .side{
      border:2px solid #ffffff;
      background-color:#00A4FF;
    }
  }


  @keyframes OuterCubeAnimate{
    0%{
      transform:rotateX(-38deg) rotateY(45deg) rotateY(0turn);
    }
    100%{
      transform:rotateX(-38deg) rotateY(45deg) rotateY(0.25turn);
    }
  }

  .table-browser-container {
    background: #ffffff;
  }
</style>
