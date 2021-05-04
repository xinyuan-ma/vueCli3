/**
 * @interface 接口  https://mp.weixin.qq.com/s/KfOAu983zg8d0Uc-jhM84w
 * interface与type的区别：一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type
 * */

function getUserInfo (user: {name: string, age: number}):string {
  return `${user.name}${user.age}`
}
console.log(getUserInfo({name: 'ming', age: 18}));

// 对象类型接口
interface User{
  name: string;
  age: number;
  sex?: number; // 可选属性，对象是否有该属性都可以
}
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

// 函数类型接口
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

interface Inn {
  name: string;
}
/**
 * 接口的实现（类implements实现接口）
 * 类型规范，让一个类去实现某个接口，那么这个类就必须明确去拥有这个接口中的属性和实现其方法
 * */
class Post implements Entify, Inn {
  title: string;
  name: string;
  constructor(title: string,name:string) {
    this.title = title
    this.name = name
  }
  log():void {
    console.log(this.title);
  }
}

console.log(Post, 'post');

/**
 * 接口的继承 extends
 * 接口可以继承多个接口，用逗号分开
 * */
interface Parent {
  name: string;
}
interface Mother {
  color: string
}
interface Father {
  height: number
}
interface Child extends Father, Mother{
  age: number
}

interface Son extends Parent, Mother{
  height: number
}



/**
 * 泛型 generics
 * 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
 * */
interface In {
  <T>(name:T):T
}
let fnn:In = function <T>(name:T):T {
  return name
}
console.log(fnn<number>(1));
console.log(fnn('123'));

function identify <T>(name: T): T {
  return name
}

console.log(typeof identify<Number>(1), typeof identify(1));
console.log(identify('str'));

function change<T, U>(name:T, age:U):U {
  return age
}

console.log(change('1', 2));
console.log(change(1, "2"));

let enumArr: [number, string] = [1, '123']
console.log(enumArr);

interface Config {
  <T>(value: T):T
}

// 函数类型接口
interface Fnn {
  (name:string): string
}
let fn1:Fnn = function (name: string):string {
  return name
}

// 泛型接口
interface GenericsFn {
  <T>(name:T):T
}
let genericeFn:GenericsFn = function <T>(name:T):T {
  return name
}
console.log(genericeFn('abcd'));
console.log(genericeFn(1234));

function getName <T>(name:T):T {
  return name
}

console.log(getName(666));


interface Gen<T> {
  value:T,
  getValue:() => T
}
class Gun<T> implements Gen<T> {
  value:T
  constructor(value:T) {
    this.value = value
  }
  getValue():T {
    return this.value
  }
}
let gun1 = new Gun(1)
let gun2 = new Gun("tttt")
console.log(gun1,gun2);

class GerMin<T> {
  name: T
  constructor(name:T) {
    this.name = name
  }
}
let germin = new GerMin<number>(123)
let germin1 = new GerMin<string>('germin')
console.log(germin, germin1);

// 泛型函数
function getAge <T>(age:T):T {
  return age
}
// 泛型接口
interface Gn {
  <T>(name:T):T
}
let gn:Gn = function <T>(name:T):T {
  return name
}
// 泛型类
class Gan<T> {
  name:T
  constructor(name:T) {
    this.name = name
  }
}
let gan = new Gan<string>('gan')
console.log(gan);

interface Gyn<T> {
  name:T;
  age:T
}
let gyn:Gyn <string>= {
  name: '123',
  age: '234'
}
console.log(gyn, 'gyn');

class Gon <T>implements Gyn<T>{
  name:T
  age:T
  constructor(name:T, age:T) {
    this.name = name
    this.age = age
  }
}

let gon = new Gon('gon', '2')
console.log(gon);

interface Length {
  length: number
}
function getLength<T extends Length>(str:T):T {
  console.log(str.length);
  return str
}

function  map<T,U>(tuple:[T,U]):[U,T] {
  return [tuple[1], tuple[0]]
}

console.log(map([1, 'st']));

interface Lengthwise {
  length:number
}
function longIdentify<T extends Lengthwise>(str:T):T {
  console.log(str.length);
  return str
}

console.log(longIdentify('123'));

interface DefaultFn<T=string> {
  name:T
}

let defaultFn:DefaultFn= {
  name:'123'
}
console.log(defaultFn, '1234');

interface Ina {
  <T>(name:T):T
}
let ina:Ina = function <T>(name:T):T {
  return name
}
console.log(ina<string>('123'), 'ina');
interface GenericsObj<T>{
  name:T;
  des: T
}
let generics:GenericsObj<string> = {
  name: "str",
  des:'des'
}
console.log(generics, 'generics');
class ClassT<T> {
  title:T;
  constructor(title:T) {
    this.title = title
  }
}
let classT = new ClassT<string>('123')
console.log(classT, 'classT');


/**
 * class 类
 * */

let list: number[] = [1,23,4]
let strList : string[] = ['a', 'b', 'c']
let tuple: [string,number] = ['123',12] // 元祖类型

let numberList:number[] = [1,3,4]
let stringList :string[] = ['1,3', '3', '34']

enum Days {sun, mon, tue, web, thu =123, fri} // Days后面没有=， 也不需要用let const
console.log(Days['sun'] === 0, Days[0] === 'sun'); // true true
console.log(Days['mon'] === 1, Days[1] === 'mon'); // true true
console.log(Days['thu'] === 123, Days[123] === 'thu'); // true true
console.log(Days['fri'] === 124, Days[124] === 'fri'); // true true

enum Types {sun = '3001', mon='3002', tue = '3003'}
console.log(Types['sun'] === '3001'); // true

/**
 * @decorator 装饰器
 *
 * */
function  helloWorld(str:any):void {
  console.log('hello world');
}

@helloWorld
class DecoratorClass {
}

function addAge(age:number):Function{
  return function (target:Function) {
    target.prototype.age = age
  }
}

@addAge(18)
class Hello {
  name:string;
  constructor() {
    this.name = 'ming'
  }
}
let hello = new Hello()
console.log(hello, 'hello');


function addSex(sex:string):Function {
  return function (target:Function) {
    target.prototype.sex = sex
  }
}
function addFn(sex:string):Function {
  return function (target:Function) {
    target.prototype.sex = sex
    target.prototype.newFn = function () {
      console.log(this.name);
    }
  }
}

@addFn('男')
class PersonFn {
  name:string;
  constructor() {
    this.name = 'per'
  }
}
let pr = new PersonFn();
console.log(pr);
pr.newFn()
