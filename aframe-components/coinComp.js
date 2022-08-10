export const coinComp = {
  schema: {
    coinType: { type: "int", value: -1 },
  },
  multiple: true,
  init: function () {
    var coinType = this.chanceGenerator() ; 
    if(coinType < 1.5){
        this.el.setAttribute("gltf-model", "#coin1");
        this.el.setAttribute("coin_comp", "coinType : " + 1);
    }
    else if(coinType < 3.5){
        this.el.setAttribute("gltf-model", "#coin2");
        this.el.setAttribute("coin_comp", "coinType : " + 2);
      }
    else{
        this.el.setAttribute("gltf-model", "#coin");
        this.el.setAttribute("coin_comp", "coinType : " + 0);
    }
    this.el.setAttribute("coinValue", 100);
    this.el.setAttribute(
      "animation",
      "property: rotation; to: 0 360 0; loop: true; dur:2500 ; easing : linear"
    );
    this.el.addEventListener("model-loaded", () => {
      //console.log(this.el.getObject3D('mesh').material.color);
    });
  },
  chanceGenerator: function () {
    var chance = parseInt(Math.random() * 10);
    return chance;
  },
};
