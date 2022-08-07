export const gridsFence = {
    schema : {
        position : {type : "vec3"},
        depth : {type : "float"}
    } , 
    init: function () {
        this.el.setAttribute("depth", this.data.depth);
        this.el.setAttribute("material", "color:black;");
    },
  }
  