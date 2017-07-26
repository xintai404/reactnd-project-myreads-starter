import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'


class ListBooks extends Component{
	static propTypes = {
    	books: PropTypes.array.isRequired,
    	onMoveBook: PropTypes.func.isRequired
  	}
	moveBooks(){
		if(this.props.onMoveBooks){
			this.props.onMoveBooks
		}
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
							<Books book={book} />
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
							<Books book={book} />
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
							<Books book={book} />
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