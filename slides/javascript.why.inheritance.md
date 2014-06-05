## Prototypal inheritance

![](assets/inheritance.png)

```javascript
var object;
object = {
    "a": 1,
    "b": true,
    "c": [1,2,3]
};

object.__proto__ = {
    "d": 1,
    "e": true,
    "f": [1,2,3]
};

object.__proto__.__proto__ === {}.__proto__;

object.__proto__.__proto__.__proto__ === null;
```
