```javascript
function CoffeeMaker(molinillo, calentador, bomba) {
    this.infusion = function() {
        molinillo.moler();
        calentador.on();
        bomba.bombear();
    };
}
```

El inyector observará el nombre de los parámetros

https://github.com/angular/di.js
