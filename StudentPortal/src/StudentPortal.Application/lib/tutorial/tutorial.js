console.log('Tutorial');

//---------------------------------------------Tutorial 1---------------------------------------------


//---------------------------------------------Tutorial 1 END-----------------------------------------

//---------------------------------------------Tutorial 3---------------------------------------------
var person03 = {
    firstName: "Bucky",
    lastName: "Roberts",
    age: 28
};

console.log(person03);

//Anonymous function
var printBacon03 = function () { console.log("Bacon is Healthy"); };

printBacon03();

//you can now pass this function into another method

//---------------------------------------------Tutorial 3 END-----------------------------------------

//---------------------------------------------Tutorial 4---------------------------------------------
function placeOrder(orderNumber) {
    console.log("Customer order:", orderNumber);
    cookAndDeliverFood(function () {
        console.log("Delivered food order:", orderNumber);


    });

};

function cookAndDeliverFood(callBack) {
    setTimeout(callBack, 5000);
}

placeOrder(1);
placeOrder(2);
placeOrder(3);
//---------------------------------------------Tutorial 4 END-----------------------------------------



//---------------------------------------------Tutorial 5---------------------------------------------
var bucky05 = {
    favFood: "bacon",
    favMovie: "Chappie"
};

var Person05 = bucky05;
Person05.favFood = "salad";

console.log(bucky05.favFood); //salad
//---------------------------------------------Tutorial 5 END-----------------------------------------

//---------------------------------------------Tutorial 6---------------------------------------------
//== compares values 19=='19'   true
//=== compares values and type  false

//Here we show you can create methods inside an object
var bucky06 = {
    printFirstName: function () {
        console.log("hello");
        console.log(this === bucky06);
    }
};

bucky06.printFirstName();
//---------------------------------------------Tutorial 6 END-----------------------------------------

//---------------------------------------------Tutorial 7---------------------------------------------

console.log(" Tutorial 7");
function User07() {
    this.name = "";
    this.life = 100;
    this.giveLife = function giveLife(targetPlayer) {
        targetPlayer.life += 1;
        console.log(this.name + " give 1 life to " + targetPlayer.name);

    }
}

var bucky07 = new User07();
var Wendy07 = new User07();
bucky07.name = "Bucky";
Wendy07.name = "Wendy";
bucky07.giveLife(Wendy07);
console.log("Bucky:" + bucky07.life);
console.log("Wendy:" + Wendy07.life);

User07.prototype.uppercut = function uppercut(targetPlayer) {
    targetPlayer.life -= 3;
    console.log(this.name + " just uppercutted " + targetPlayer.name);
};

Wendy07.uppercut((bucky07));
console.log("Bucky:" + bucky07.life);
console.log("Wendy:" + Wendy07.life);

User07.prototype.magic = 60;
console.log("Bucky:" + bucky07.magic);
console.log("Wendy:" + Wendy07.magic);
//---------------------------------------------Tutorial 7 END-----------------------------------------

//---------------------------------------------Tutorial 8---------------------------------------------

//Modules
var movies08 = require('./movies08');
movies08.avatar();
movies08.chappie();

//---------------------------------------------Tutorial 8 END-----------------------------------------

//---------------------------------------------Tutorial 9---------------------------------------------

//Modules
var movies09 = require('./movies09');
movies09.printChappie();
console.log(movies09.favMovie);


//---------------------------------------------Tutorial 9 END-----------------------------------------

//---------------------------------------------Tutorial 10--------------------------------------------
console.log("module 10");
require('./movies10emily');
require('./movies10bucky');

//---------------------------------------------Tutorial 10 END----------------------------------------

//---------------------------------------------Tutorial 11--------------------------------------------
//Object factory, object that is responsible for creating other objects

console.log("module 11");
require('./movies11emily');
require('./movies11bucky');

//---------------------------------------------Tutorial 11 END----------------------------------------

//---------------------------------------------Tutorial 12--------------------------------------------
console.log("module 12 - Core modules");
var fs = require('fs');
fs.writeFileSync("corn.txt", "Corn is good");

console.log(fs.readFileSync("corn.txt").toString());

var path = require('path');

var websitehome = "desktop/bucky//newyork/index.html";
var websiteabout = "desktop/bucky//newyork/about.html";

console.log(path.normalize(websitehome));
console.log(path.dirname(websitehome));
console.log(path.basename(websitehome));
console.log(path.extname(websitehome));

setInterval(function () {
    
    console.log("beef");

}, 2000);

console.log(__dirname);
console.log(__filename);


//---------------------------------------------Tutorial 12 END----------------------------------------


