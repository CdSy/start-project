import  '../less/main.less';

const obj = {
    x: 12,
    y: 24,
    z: 41
};

const obj2 = {
    w: 1
};

const obj3 = {
    ...obj,
    ang: 25
};

console.log('Hello World!', obj3);