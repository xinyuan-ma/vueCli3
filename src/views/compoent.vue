/**
* 实现webpack logo动图效果，参考链接https://www.uplabs.com/posts/pure-css-webpack-logo-animation
*/
<template>
  <div>
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
    <div>
    <!--<YjyButton>按钮</YjyButton>-->
    <!--<YjyPopup :visible="true">-->
    <!--<p>测试pop</p>-->
    <!--<button slot="close" >关闭</button>-->
    <!--</YjyPopup>-->
    <!--<waterFall :aImgListData="aImgListData"></waterFall>-->
  </div>
    <div id="app2">
    </div>
  </div>
</template>
<script>

export default {
	name: 'webpackLogo',
  data () {
	  return {
      aImgListData: [
        {
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F4034970a304e251fae75ad03a786c9177e3e534e.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632238802&t=402c7efdcf846d31e4ca5a072d544bbc'
        },
        {
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg95.699pic.com%2Fphoto%2F40190%2F2418.gif_wh300.gif%21%2Fgifto%2Ftrue&refer=http%3A%2F%2Fimg95.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632238802&t=3f9704ac5f7368336c04e13abd8b7485'
        }
      ]
    }
  },
  created() {},
  mounted() {
    import('hsjy-lcd').then(res => {
      console.log(res, 'res');
    })
  }
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
