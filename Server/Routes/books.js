"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_1.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                page: 'books',
                books: books
            });
        }
    });
});
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Add Book',
        page: 'add',
        books: ""
    });
});
router.post('/add', (req, res, next) => {
    let newBook = new books_1.default({
        "Title": req.body.title,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Price": req.body.price
    });
    books_1.default.create(newBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, {}, {}, function (err, bookEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('books/details', { title: 'Edit', page: 'edit', books: bookEdit });
    });
});
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateBook = new books_1.default({
        "_id": id,
        "Title": req.body.title,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Price": req.body.price
    });
    books_1.default.updateOne({ _id: id }, updateBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/delete/:id', (req, res, next) => {
});
//# sourceMappingURL=books.js.map