class MyPromise {
    #currentState = 'Pending';

    constructor(executor) {
        this.queue = [];
        this.errorHandler = () => {};
        this.finallyHandler = () => {};

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.errorHandler(e);
        } finally {
            this.finallyHandler();
        }
    }

    get state() {
        return this.#currentState;
    }

    resolve(data) {
        this.queue.forEach((cb) => {
            data = cb(data);
        })

        this.#currentState = 'Fulfilled';
        this.finallyHandler();
    }

    reject(error) {
        this.errorHandler(error);
        this.#currentState = 'Rejected';
        this.finallyHandler();
    }

    then(fn) {
        this.queue.push(fn);
        return this;
    }

    catch(fn) {
        this.errorHandler = fn;
        return this;
    }

    finally(fn) {
        this.finallyHandler = fn;
        return this;
    }
}

const prom = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('PETRO')
    }, 1000)
})

prom
.then((data) => data.toLowerCase())
.then((lower) => console.log(lower))
.finally(() => console.log('FINALLY'))