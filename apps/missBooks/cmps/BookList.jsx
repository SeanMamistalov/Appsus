const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemove }){
    return <section className="book-list">
        <ul>
            {books.map(book => 
            <li key={book.id}>
                <BookPreview book={book}/>
                <button onClick={() => onRemove(book.id)}>X</button>
                <Link to={`/book/${book.id}`}><button>Details</button></Link>
                <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
            </li>)}
        </ul>
    </section>
}