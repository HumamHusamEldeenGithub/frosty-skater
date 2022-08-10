export const coinComp = {
  schema: {
    coinType: { type: "int", value: -1 },
  },
  multiple: true,
  init: function () {
    this.el.setAttribute("coin_comp", "coinType : " + this.chanceGenerator());
    console.log(this.el.getAttribute("coin_comp"));
    this.el.setAttribute("gltf-model", "#coin");
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
