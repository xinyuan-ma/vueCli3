/**
 * @interface 接口  https://mp.weixin.qq.com/s/KfOAu983zg8d0Uc-jhM84w
 * interface与type的区别：一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type
 * */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function getUserInfo(user) {
    return "" + user.name + user.age;
}
console.log(getUserInfo({ name: 'ming', age: 18 }));
var user = {
    name: 'xing',
    age: 18
};
console.log(user);
var per = {
    name: 'xe',
    age: "18",
    score: 'score',
    getName: function () {
        return '123';
    },
    getAge: function () {
        console.log(this.age);
    }
};
console.log(per);
console.log(per.getName('123'));
per.getAge();
var fn = function (x) {
    console.log(x);
};
fn(1);
/**
 * 接口的实现（类implements实现接口）
 * 类型规范，让一个类去实现某个接口，那么这个类就必须明确去拥有这个接口中的属性和实现其方法
 * */
var Post = /** @class */ (function () {
    function Post(title, name) {
        this.title = title;
        this.name = name;
    }
    Post.prototype.log = function () {
        console.log(this.title);
    };
    return Post;
}());
console.log(Post, 'post');
var fnn = function (name) {
    return name;
};
console.log(fnn(1));
console.log(fnn('123'));
function identify(name) {
    return name;
}
console.log(typeof identify(1), typeof identify(1));
console.log(identify('str'));
function change(name, age) {
    return age;
}
console.log(change('1', 2));
console.log(change(1, "2"));
var enumArr = [1, '123'];
console.log(enumArr);
var fn1 = function (name) {
    return name;
};
var genericeFn = function (name) {
    return name;
};
console.log(genericeFn('abcd'));
console.log(genericeFn(1234));
function getName(name) {
    return name;
}
console.log(getName(666));
var Gun = /** @class */ (function () {
    function Gun(value) {
        this.value = value;
    }
    Gun.prototype.getValue = function () {
        return this.value;
    };
    return Gun;
}());
var gun1 = new Gun(1);
var gun2 = new Gun("tttt");
console.log(gun1, gun2);
var GerMin = /** @class */ (function () {
    function GerMin(name) {
        this.name = name;
    }
    return GerMin;
}());
var germin = new GerMin(123);
var germin1 = new GerMin('germin');
console.log(germin, germin1);
// 泛型函数
function getAge(age) {
    return age;
}
var gn = function (name) {
    return name;
};
// 泛型类
var Gan = /** @class */ (function () {
    function Gan(name) {
        this.name = name;
    }
    return Gan;
}());
var gan = new Gan('gan');
console.log(gan);
var gyn = {
    name: '123',
    age: '234'
};
console.log(gyn, 'gyn');
var Gon = /** @class */ (function () {
    function Gon(name, age) {
        this.name = name;
        this.age = age;
    }
    return Gon;
}());
var gon = new Gon('gon', '2');
console.log(gon);
function getLength(str) {
    console.log(str.length);
    return str;
}
function map(tuple) {
    return [tuple[1], tuple[0]];
}
console.log(map([1, 'st']));
function longIdentify(str) {
    console.log(str.length);
    return str;
}
console.log(longIdentify('123'));
var defaultFn = {
    name: '123'
};
console.log(defaultFn, '1234');
var ina = function (name) {
    return name;
};
console.log(ina('123'), 'ina');
var generics = {
    name: "str",
    des: 'des'
};
console.log(generics, 'generics');
var ClassT = /** @class */ (function () {
    function ClassT(title) {
        this.title = title;
    }
    return ClassT;
}());
var classT = new ClassT('123');
console.log(classT, 'classT');
/**
 * class 类
 * */
var list = [1, 23, 4];
var strList = ['a', 'b', 'c'];
var tuple = ['123', 12]; // 元祖类型
var numberList = [1, 3, 4];
var stringList = ['1,3', '3', '34'];
var Days;
(function (Days) {
    Days[Days["sun"] = 0] = "sun";
    Days[Days["mon"] = 1] = "mon";
    Days[Days["tue"] = 2] = "tue";
    Days[Days["web"] = 3] = "web";
    Days[Days["thu"] = 123] = "thu";
    Days[Days["fri"] = 124] = "fri";
})(Days || (Days = {})); // Days后面没有=， 也不需要用let const
console.log(Days['sun'] === 0, Days[0] === 'sun'); // true true
console.log(Days['mon'] === 1, Days[1] === 'mon'); // true true
console.log(Days['thu'] === 123, Days[123] === 'thu'); // true true
console.log(Days['fri'] === 124, Days[124] === 'fri'); // true true
var Types;
(function (Types) {
    Types["sun"] = "3001";
    Types["mon"] = "3002";
    Types["tue"] = "3003";
})(Types || (Types = {}));
console.log(Types['sun'] === '3001'); // true
/**
 * @decorator 装饰器
 *
 * */
function helloWorld(str) {
    console.log('hello world');
}
var DecoratorClass = /** @class */ (function () {
    function DecoratorClass() {
    }
    DecoratorClass = __decorate([
        helloWorld
    ], DecoratorClass);
    return DecoratorClass;
}());
function addAge(age) {
    return function (target) {
        target.prototype.age = age;
    };
}
var Hello = /** @class */ (function () {
    function Hello() {
        this.name = 'ming';
    }
    Hello = __decorate([
        addAge(18)
    ], Hello);
    return Hello;
}());
var hello = new Hello();
console.log(hello, 'hello');
function addSex(sex) {
    return function (target) {
        target.prototype.sex = sex;
    };
}
function addFn(sex) {
    return function (target) {
        target.prototype.sex = sex;
        target.prototype.newFn = function () {
            console.log(this.name);
        };
    };
}
var PersonFn = /** @class */ (function () {
    function PersonFn() {
        this.name = 'per';
    }
    PersonFn = __decorate([
        addFn('男')
    ], PersonFn);
    return PersonFn;
}());
var pr = new PersonFn();
console.log(pr);
pr.newFn();
