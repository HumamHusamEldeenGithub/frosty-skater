
export const coinComp = {
  schema : {
    coinType : {type : "int" , value : -1}
  },
  multiple: true,
  init: function () {
    if (this.chanceGenerator())
      this.el.setAttribute("coin_comp" , "coinType : 1"); 
    this.el.setAttribute("gltf-model" ,"#coin"); 
    this.el.setAttribute("coinValue" , 100) ; 
    this.el.setAttribute("material" , "color:red");
    this.el.setAttribute('animation',"property: rotation; to: 0 360 0; loop: true; dur:5000")
    this.el.addEventListener('model-loaded', () => {
    });
  },
  chanceGenerator: function () {
    var chance = Math.random() ; 
    return chance > 0.8 ? true : false ; 
  }
}
