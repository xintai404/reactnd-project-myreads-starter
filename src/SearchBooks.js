import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import _ from 'lodash'

class SearchBooks extends Component{
	state={
		query: '',
		searchedBooks: []
	}

    search = _.debounce((query) => {
    	const myBooks = this.props.books
    	BooksAPI.search(query.trim()).then(books => {
    		if(books && books.error){
    			this.setState({searchedBooks: []})
    		}else{
    			books.forEach(book => {
    				let b = myBooks.find(bk => bk.id === book.id)
    				if(b && book.shelf !== b.shelf){
    					book.shelf = b.shelf
    				}else{
    					book.shelf = 'none'
    				}
    			})
				this.setState({searchedBooks:books})
			}
		}, err => {
			this.setState({searchedBooks: []})
		})
	}, 500)

	updateQuery = (query) => {
		this.search(query)
	}    

	addTo = (movedBook, shelf) => {              
		const seachedBooks = this.state.searchedBooks 
      	let book = seachedBooks.find((book) => { return book.id === movedBook.id})
      	if(book.shelf !== shelf){
      		book.shelf = shelf
      	}
      	this.props.onAddToShelf(movedBook, shelf) 
      	this.setState({seachedBooks: seachedBooks})
	}

	render(){    
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              	<Link className="close-search" to="/">Close</Link>
	              	<div className="search-books-input-wrapper">
	                    <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)}/>
	                </div>
	            </div>
	            <div className="search-books-results">
	                <ol className="books-grid">
						{this.state.searchedBooks.map((book) => (
	                    	<li key={book.id}>
								<Books book={book} onChangeShelf={this.addTo}/>
							</li>
                      	))}
	                </ol>
	            </div>
	        </div>
    	)
	}
}

export default SearchBooks