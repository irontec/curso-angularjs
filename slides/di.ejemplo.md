
```javascript
function Cafetera() {
    var molinillo = new Molinillo();
    var bomba = Bomba.getInstance();
    var calentador = app.get('Calentador');
    this.infusion = function() {
        molinillo.moler();
        calentador.on();
        bomba.bombear();
    };
}
```

El paso de referencias de objetos resulta compleja
