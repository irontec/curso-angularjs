### Clase JavaScript
```
function Coche(puertas) {
    this.puertas = puertas;
}

Coche.tipos = ["grande", "pequeño"];

Coche.prototype = {
    numPuertas: function () {
        return this.puertas;
    }
}

Coche coche = new Coche(3);
```
