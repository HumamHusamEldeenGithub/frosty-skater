
export const coinComp = {
  init: function () {
    //this.el.setAttribute("gltf-model", "#coin");
    //this.el.setAttribute("rotation" , "0 90 0"); 
    this.el.setAttribute("gltf-model" ,"#coin"); 
    this.el.setAttribute("coinValue" , 100) ; 
    this.el.setAttribute('animation',"property: rotation; to: 0 360 0; loop: true; dur:5000")
    this.el.addEventListener('model-loaded', () => {
    });
  },
}
