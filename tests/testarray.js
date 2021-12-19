let data = [
    {dest: "a", qt: '1'},
    {dest: "a", qt: '2'},
    {dest: "b", qt: '12'},
    {dest: "a", qt: '3'},
    {dest: "b", qt: '13'}
];
let res = new Map();

data.forEach(el => {
    if (res.get(el.dest) == undefined) res.set(el.dest, 0);
    res.set(el.dest, res.get(el.dest) + Number(el.qt));
});
let values = [];
let keys = [];
res.forEach((value, key) => {
    values.push(value);
    keys.push(key)
});

console.log(res);
console.log('Values: ', values);
console.log('keys: ', keys);