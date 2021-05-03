/**
 * @interface 接口  https://mp.weixin.qq.com/s/KfOAu983zg8d0Uc-jhM84w
 * interface与type的区别：一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type
 * */
function getUserInfo (user: {name: string, age: number}):string {
  return `${user.name}${user.age}`
}
console.log(getUserInfo({name: 'ming', age: 18}));

interface User{
  name: string;
  age: number;
  sex?: number; // 可选属性，对象是否有该属性都可以
}
function getUser(user: User):string {
  return `${user.name}${user.age}`
}
console.log(getUser({name: 'ming', age: 18}));

let user:User = {
  name: 'xing',
  age:18
}
console.log(user);

interface Person {
  name: string;
  age?: string; // 可选属性
  readonly score: string;
  getName(name:string):string;
  getAge():void;
  getScore?():string; // 可选函数
}
let per:Person = {
  name: 'xe',
  age: "18",
  score: 'score',
  getName () {
    return '123'
  },
  getAge(): void {
    console.log(this.age);
  }
}
console.log(per);
console.log(per.getName('123'));
per.getAge()

interface Fuc {
  (x:number) :void
}
let fn:Fuc = (x:number):void => {
  console.log(x);
}
fn(1)

interface Entify {
  title: string;
  log():void;
}

/**
 * 接口的实现（类implements实现接口）
 * */
//类型规范，让一个类去实现某个接口，那么这个类就必须明确去拥有这个接口中的属性和实现其方法
class Post implements Entify {
  title: string;
  constructor(title: string) {
    this.title = title
  }
  log():void {
    console.log(this.title);
  }
  getName():void {
    console.log(this.title);
  }
}

console.log(Post);

/**
 * 接口的继承 extends
 * 接口可以继承多个接口，用逗号分开
 * */
interface Parent {
  name: string;
}
interface Child extends Parent{
  age: number
}

let child:Child = {
  name: 'extends',
  age: 18
}
console.log(child);

interface Mother {
  score: string;
}

interface Son extends Parent, Mother{
  height: number
}

let son:Son = {
  name: 'tom',
  score:"A",
  height: 90
}
console.log(son, typeof son);

class Children implements Son {
  name:string;
  score: string;
  height: number;
  // constructor(name:string, score: string,height: number) {
  constructor(name:string, score: string,height: number) {
    this.name = name
    this.score = score
    this.height = height
  }
}
let child1 = new Children('child', 'A+', 99)
console.log(child1, 'child1');



