const axios = require('axios');

function example1() {
    console.log('\n****example1****');
    const a = [1, 2, 3, 4, 5, 6];
    for (const item of a[Symbol.iterator]()) {
        console.log(item)
    }
}

function example2() {
    console.log('\n****example2****');
    const a = [1, 2, 3, 4, 5, 6];
    const aIterator = a[Symbol.iterator]();
    let result = aIterator.next();
    while (!result.done) {
        console.log(result)
        result = aIterator.next();
    }

    console.log(result);
}

function* generator1 () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
}

function example3() {
    console.log('\n****example3****');
    for (const item of generator1()) {
        console.log(item)
    }
}

function example4() {
    console.log('\n****example4****');
    const generator = generator1();
    let result = generator.next();
    while (!result.done) {
        console.log(result)
        result = generator.next();
    }
}

async function* generator2 (urls) {
    for (const url of urls) {
        const result = await axios.get(url);
        const title = result.data.match(/<title>(.*)<\/title>/i)[1];
        yield title;
    }
}

async function example5() {
    console.log('\n****example5****');
    const urls = [
        'http://www.google.com',
        'http://www.twitter.com',
        'http://www.intsights.com',
        'http://dashboard.intsights.com'
    ];

    for await (const item of generator2(urls)) {
        console.log(item)
    }
}

function* generator3() {
    yield 1;
    yield* [1,2];
    yield* generator1();
    yield 'abc';
    yield* 'abc';

    return 0;
}

function example6() {
    console.log('\n****example6****');
    const generator = generator3();
    let result = generator.next();
    while (!result.done) {
        console.log(result)
        result = generator.next();
    }
}

function* generator4() {
    let i = 0;
    while (true) {
        const stopRunning = yield i++;
        if (stopRunning) {
            break
        }
    }
    yield -1;

    return 'done';
}

function example7() {
    console.log('\n****example7****');
    const generator = generator4();
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next(true));
    console.log(generator.next());
}

async function main() {
    example1();
    example2();
    example3();
    example4();
    await example5();
    example6();
    example7();
}

main();
