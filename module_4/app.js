// -------------------  Point ------------------
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(pointClass) {
        return new Point(this.x + pointClass.x, this.y + pointClass.y);
    }
}

console.log(new Point(1, 2).plus(new Point(2, 1))) // → Point{x: 3, y: 3} 

// ----------------  Speaker and Screamer ES5 --------------------------
function SpeakerES5(name) {
    this.name = name;

    SpeakerES5.prototype.speak = function(speach) {
        console.log(`${this.name} says ${speach}`)
    }
}

function ScreamerES5(name) {
    SpeakerES5.call(this, name);

    ScreamerES5.prototype.speak = function(speach) {
        console.log(`${this.name} shouts ${speach.toUpperCase()}`)
    }
}

ScreamerES5.prototype = Object.create(SpeakerES5.prototype);

new SpeakerES5("Mr. Calm").speak("easy, man"); 
// → “Mr. Calm says easy, man” 

new ScreamerES5("Mr. Loud").speak("hell yeah"); 
// → “Mr. Loud shouts HELL YEAH” 

// ----------------  Speaker and Screamer ES6 --------------------------
class Speaker {
    constructor(name) {
        this.name = name;
    }

    speak(speach) {
        console.log(`${this.name} says ${speach}`)
    }
}

class Screamer extends Speaker {
    speak(speach) {
        console.log(`${this.name} shouts ${speach.toUpperCase()}`)
    }
}

new Speaker("Mr. Calm").speak("easy, man"); 
// → “Mr. Calm says easy, man” 

new Screamer("Mr. Loud").speak("hell yeah"); 
// → “Mr. Loud shouts HELL YEAH” 

// ----------------- The Reading List ----------------------
class BookList {
    booksFinished = 0;
    booksNotFinished = 0;
    nextBook = null;
    currentBook = null;
    lastBook = null;
    books = [];

    constructor() {}

    finishCurrentBook() {
        this.currentBook.markAsRead();
        this.lastBook = this.currentBook;
        this.currentBook = this.nextBook;
        this.booksFinished += 1;
        this.booksNotFinished -= 1;

        const indexOfCurrentBook = this.books.indexOf(this.currentBook);
        const shouldBeNextBook = this.books.slice(indexOfCurrentBook + 1, this.books.length).find(book => !book.isRead);

        if (shouldBeNextBook) {
            this.nextBook = shouldBeNextBook;
        } else {
            this.nextBook = null;
        }
    }

    add(book) {
        if(!(book instanceof Book)) {
            throw Error('Invalid type of book')
        }

        if(!book.isRead) {
            this.booksNotFinished += 1;
        } else if (book.isRead) {
            this.booksFinished += 1;
        }

        if(!this.currentBook) {
            this.currentBook = book;
        } else if (this.currentBook && !this.nextBook && this.books.length && !book.isRead) {
            this.nextBook = book;
        }

        this.books.push(book);
    }
}

class Book {
    constructor({ title, genre = null, author = null, isRead = false, dateFinished = null }) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.isRead = isRead;
        this.dateFinished = dateFinished;
    }

    markAsRead() {
        this.isRead = true;
        this.dateFinished = new Date();
    }
}


const book = new Book({ title: 'Title' });
const book2 = new Book({ title: 'Title2' });
const book3 = new Book({ title: 'Title3' });
const list = new BookList();

list.add(book);
list.add(book2);
list.add(book3);
list.finishCurrentBook();

console.log(list);
