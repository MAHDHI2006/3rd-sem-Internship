// var a;//Global scope[ReDeclaration,ReInitialization]
// a=10;
// var a=20;
// let b;//Block scope[ReInitialization]
// b=10;
// b=20;
// cons= c=10;  //Block scope

//Example of Data Types in JavaScript

var p=20;//number
var q="Hello";//string
var bool=true;//boolean
var r;//undefine
var s=null;//null

var symbol = Symbol("li");
console.log(typeof p);
console.log(typeof q);
console.log(typeof bool);
console.log(typeof r);
console.log(typeof s);
console.log(typeof symbol);

//Array Delcaration with Initialization
var arr1=[10,20,30,40];
console.log(arr1);

var object1={ //Object Declaration with Initialization
    name:"sri",
    age:18,
    city:"Mnp"
};

//Arithmetic Operators(+,-,*,/,%.**)
var a=10;
var b="10";
console.log("Addition:",a+b);
console.log("Subtraction:",b-a);
console.log("Multiplication:",a*b);
console.log("Division:",b/a);
console.log("Modulus:",b%a);  
console.log("Exponentiation:",a**2); 

//Relational Operators(>,<,>=,<=,==,!=,===,!==)
console.log("Greater than:",a>b);
console.log("Less than:",a<b);
console.log("Greater than or equal to:",a>=b);
console.log("Less than or equal to:",a<=b);
console.log("Equal to:",a==b);
console.log("Not Equal to:",a!=b);  
console.log("Strict Equal to:",a===b);
console.log("Strict Not Equal to:",a!==b);

//Assignment Operators(=,+=,-=,*=,/=,%=)
console.log("Assignment Operators:");
console.log("a =",a);
console.log("a += 5:",a+=5);
console.log("a -= 5:",a-=5);
console.log("a *= 2:",a*=2);
console.log("a /= 2:",a/=2);
console.log("a %= 3:",a%=3);

//Logical Operators(&&,||,!)
var x=true;
var y=false;
console.log("Logical AND (x && y):",x && y);
console.log("Logical OR (x || y):",x || y);
console.log("Logical NOT (!x):",!x);

//Looping Statements

//for(initialization;condition;increment/decrement){
    //Statement

//}
for(var i=1;i<=5;i++){
    console.log(i);
}
//while loop
//while(condition){
    //Statement
//}
console.log("While Loop:");
var a=0;
while(a!==5){
    a++;
    console.log(a);
}

//do-while loop
//do{
    //Statement
//}while(condition);
a=0;
do{
    console.log(a);

}while(a===1);

//conditional Statements
//if condition
a=5;
if(a%2===0){
    console.log("Even Number");
}

//if else condition
if(a%2===0){
    console.log("Even Number");
}
else{
    console.log("Odd Number");
}
//Else if
var marks=90;
if(marks>=90){
    console.log("O")
}
else if(marks>=80){
    console.log("A+")
}
else if(marks>=70){
    console.log("A")
}
else{
    console.log("B")
}

//switch statement
day=1;
switch(day){
    case 1:{
        console.log("Sunday");
        break;
}
case 2:{
    console.log("Monday");
    break;
}
case 3:{
    console.log("Tuesday");
    break;
}
case 4:{
    console.log("Wednesday");
    break;
}
case 5:{
    console.log("Thursday");
    break;
}
case 6:{
    console.log("Friday");
    break;
}
case 7:{
    console.log("Saturday");
    break;
}
default:
    console.log("Invalid day");
}

//ternary operator
//syntax
//condition?value:value
a=10;
var result = a%2===0 ? "Even" : "Odd";
console.log(result);

marks=55;
var result = marks>=90 ? "O" : marks>=80 ? "A" : marks>=70 ? "B" : "Fail";
console.log(result);

function add(a,b){
    console.log(a+b);
}  add(5+34);
//Arrow function

 var addParam=(a,b)=>{
    console.log(a+b);
}
addParam(10,20);
console.log(typeof addParam)

//spread operator
const arrA=[1,2,3];
const arrB=[4,5,6];
console.log(arrA);
console.log(arrB);

const[myname,age,mark1]=["Kanishka",20,90];
console.log(myname);
console.log(age);
console.log(mark1); 

//Object Methods
[Name,Age,City]="Kanishka",20,"Tiruppur";  
console.log(Name);
console.log(Age);
console.log(City);  

//for...in loop
var arr1=[10,20,30,40];
for(let i in arr1){
    console.log(i);
}
//for...of loop
for(let j of arr1){
    console.log(j);
}
//foreach loop
arr1.forEach((value,index)=>{
    console.log(value,index);
});
class Person{
    name;
    age;
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    display(){
        console.log("Name:",this.name);
        console.log("Age:",this.age);
    }
}
Person1=new Person("Kanishka",20);
Person1.display();``

//prime number
let num = 17;
let prime = true;

for (let i = 2; i < num; i++) {
    if (num % i === 0) {
        prime = false;
        break;
    }
}

if (prime) {
    console.log("Prime");
} else {
    console.log("Not Prime");
}

//palindrome
function isPalindrome(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}
console.log(isPalindrome("madam")); 
console.log(isPalindrome("hello")); 

var a=10;//Global scope
if(true){
    var b=20;// var Global scope
    console.log(a);
}
console.log(a,b);


// const a=10;//Global scope
// if(true){
//     const b=20;// var Global scope
//     console.log(a);
// }
// console.log(A,B);

//Hoisting in JavaScript
var x;//By JavaScript
console.log(x); // undefined
var x = 5;    

//CallBack function
// var demo=()=>{
//     console.log("Demo function executed");
// }            
// var main=(callback)=>{
//     console.log("Main function executed");
//     callback();
// }                
// main(demo);             

var main=(callback)=>{
    console.log("Main function executed");
    callback();
}
main(()=>{
    console.log("Demo function executed");
});

//calllback function
var add=(a,b,callback)=>{
    var result=a+b; 
    callback(result);   
}
add(10,20,(res)=>{
    console.log(res)

});

//SetTimeOut
console.log("Hello");

var demo = () => {
    setTimeout(() => {
        console.log("Processing...");
    }, 2000);
}

demo();

// MAP
var arr = [1,2,3,4,5];
var double = arr.map(num=>num*2);
console.log(double);

// filter
var even = arr.filter(num=>num%2===0);
console.log(even)

// Reducer
var total = arr.reduce((sum,num)=>(sum+num),0);
console.log(total)