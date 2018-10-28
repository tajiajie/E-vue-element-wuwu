<template>
  <div>
    <h1>谷歌插件安装文档</h1>
    <h3>简介</h3>
    <p>此文档为新版插件安装教程，我司各平台通用，包括（携程，马蜂窝，途牛，去哪儿）。</p>
    <p>根据以下教程安装插件完成后，您在接单打完首呼后，填写备注点击发送备注时，会将此订单的数据传至公司直连系统。</p>
    <br/><br/>
    <h3>第一步： 下载谷歌浏览器插件。</h3>
    <p>(1) 请点击右边下载并耐心等待下载完成，如果有问题请联系IT组。   <a style="color: blue;" href="http://112.124.107.209:9090/file/shimo">点我下载</a></p>
    <br/>

    <h3>第二步：解压文件至电脑 </h3>
    <p>(1)，请右击下方下载后的压缩包，选择 【在文件夹中显示】选项。</p>
    <p>(2)，请在您将要解压的地方新建一个文件夹，请将下载后的压缩包解压至此文件夹。 </p>
    <div style="width: 700px; height:260px; margin: 0 auto;"><img src="./static/img/1.jpg"   style="width: 100%; height: 100%"></div>
    <div style="width: 600px; height:360px; margin: 0 auto;"><img src="./static/img/2.jpg"   style="width: 100%; height: 100%"></div>
    <h3>第三步：安装插件</h3>
    <p>(1)，打开谷歌浏览器，输入或复制 chrome://extensions/ 至网址处，按回车键进入谷歌插件页面。</p>
    <div style="width: 650px; height:160px; margin: 0 auto;"><img src="./static/img/8.jpg"   style="width: 100%; height: 100%"></div>
    <p>(2)，首先请删除老版本的插件，如图，点击垃圾桶图标确认删除。</p>
    <p>(如果没有老版本插件，请直接跳过看（3）)</p>
    <div style="width: 700px; height:460px; margin: 0 auto;"><img src="./static/img/3.jpg"   style="width: 100%; height: 100%"></div>
    <p>(3)，删除成功后，点击按钮【加载已解压的扩展程序】。</p>
    <div style="width: 700px; height:360px; margin: 0 auto;"><img src="./static/img/4.jpg"   style="width: 100%; height: 100%"></div>
    <p>(4)，弹出文件选择框后，请选择您第二步时解压的文件。</p>
    <div style="width: 700px; height:400px; margin: 0 auto;"><img src="./static/img/5.jpg"   style="width: 100%; height: 100%"></div>
    <p>(5)，安装完成。</p>
    <h3>第四步：去除【加载不安全脚本】<span style="color: red;">（重要）</span> </h3>
    <p>(1)，进入桌面，右键您的谷歌浏览器，点击属性。</p>
    <div style="width: 300px; height:300px; margin: 0 auto;"><img src="./static/img/6.jpg"   style="width: 100%; height: 100%"></div>
    <p>(2)，进入属性设置后，请在 快捷方式 - 目标 处粘贴下方链接。 <br/>（注意前面有空格哟） <span style="color: white; background:rgba(85, 90, 90, 0.8); font-weight: 500;"> &nbsp;--allow-running-insecure-content</span></p>
    <div style="width: 420px; height:600px; margin: 0 auto;"><img src="./static/img/7.jpg"   style="width: 100%; height: 100%"></div>
    <p>(3)，点击右下角应用，再点击确定。以此图标打开谷歌浏览器才有效哦。</p>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
  h1{
    text-align: center;
    font-weight: 400;
  }
  h3 {
    margin-left: 50px;
    font-weight: 300;
  }
  p{
    margin-left: 100px;
    font-weight: bolder;
  }
</style>
