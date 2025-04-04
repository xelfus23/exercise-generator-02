// Could be GET or POST/PUT/PATCH/DELETE
fetch('https://dummyjson.com/test')
.then(res => res.json())
.then(console.log);