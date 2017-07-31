import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'


class ListBooks extends Component{
	state = {
      books: []
    }

    componentDidMount(){
    	console.log('listbooks')
      this.setState({books: this.props.books})
    }

    moveBook = (movedBook,shelf) => {
      const books = this.state.books.slice();
      let book = books.find((book) => { return book.id === movedBook.id})
      book.shelf = shelf
      BooksAPI.update(book, shelf).then((shelf) =>{
      	this.props.onMoveShelf(shelf)
      	this.setState({books: books})
      })
    }

	render(){
		const books = this.props.books
		const currentlyReading = books.filter((book) => book.shelf==='currentlyReading')
		const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
		const read = books.filter((book) => book.shelf === 'read')

		return(
			<div className="list-books">
            <div className="list-books-title">
              	<h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              	<div>
                	<div className="bookshelf">
                  	<h2 className="bookshelf-title">Currently Reading</h2>
                  	<div className="bookshelf-books">
                   		<ol className="books-grid">
                      		{currentlyReading.map((book) => (
                    		<li key={book.id}>
								<Books book={book} onChangeShelf={(book, shelf) => this.moveBook(book,shelf)}/>
							</li>
                      		))}
                    	</ol>
                  	</div>
                </div>
                <div className="bookshelf">
                  	<h2 className="bookshelf-title">Want to Read</h2>
                  	<div className="bookshelf-books">
                    	<ol className="books-grid">
                      		{wantToRead.map((book) => (
                    		<li key={book.id}>
								<Books book={book} onChangeShelf={(book, shelf) => this.moveBook(book,shelf)}/>
							</li>
                      		))}
                    	</ol>
                  	</div>
                </div>
                <div className="bookshelf">
                  	<h2 className="bookshelf-title">Read</h2>
                  	<div className="bookshelf-books">
                    	<ol className="books-grid">
                      		{read.map((book) => (
                    		<li key={book.id}>
								<Books book={book} onChangeShelf={(book, shelf) => this.moveBook(book,shelf)}/>
							</li>
                      	))}
                    	</ol>
                  	</div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>

		)
	}
}

export default ListBooks