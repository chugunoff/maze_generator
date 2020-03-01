function f(i) {
    if (i > 5) return;
    setTimeout(function() {
        console.log(i);
        f(i + 1);
    }, 1000);
}

f(1);