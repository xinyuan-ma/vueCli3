/**
 * @interface 接口
 * */
function getUserInfo(user) {
    return "" + user.name + user.age;
}
console.log(getUserInfo({ name: 'ming', age: 18 }));
function getUser(user) {
    return "" + user.name + user.age;
}
console.log(getUser({ name: 'ming', age: 18 }));
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
 * */
//类型规范，让一个类去实现某个接口，那么这个类就必须明确去拥有这个接口中的属性和实现其方法
var Post = /** @class */ (function () {
    function Post(title) {
        this.title = title;
    }
    Post.prototype.log = function () {
        console.log(this.title);
    };
    Post.prototype.getName = function () {
        console.log(this.title);
    };
    return Post;
}());
console.log(Post);
var child = {
    name: 'extends',
    age: 18
};
console.log(child);
var son = {
    name: 'tom',
    score: "A",
    height: 90
};
console.log(son, typeof son);
var Children = /** @class */ (function () {
    // constructor(name:string, score: string,height: number) {
    function Children(name, score, height) {
        this.name = name;
        this.score = score;
        this.height = height;
    }
    return Children;
}());
var child1 = new Children('child', 'A+', 99);
console.log(child1, 'child1');
var test;
test = '123';
test = 123;
console.log(test);
