import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import _ from 'lodash'

class SearchBooks extends Component{
	state={
		query: '',
		result: []
	}
    
    search = _.debounce((query) => {
    	const shelf = this.props.myshelf
    	BooksAPI.search(query.trim()).then(books => {
    		if(books.error){
    			this.setState({result: []})
    		}else{
    			books.forEach(book => {
    				if(shelf.read.indexOf(book.id)!==-1){
    					book.shelf='read'
    				}else if(shelf.wantToRead.indexOf(book.id)!==-1){
    					book.shelf='wantToRead';
    				}else if(shelf.currentlyReading.indexOf(book.id)!==-1){
    					book.shelf ='currentlyReading'
    				}
    			})
				this.setState({result:books})
			}
		})
	}, 500)

	updateQuery = (query) => {
		this.search(query)
	}    

	addTo = (movedBook, shelf) => {
		const result = this.state.result.slice();
      	let book = result.find((book) => { return book.id === movedBook.id})
      	book.shelf = shelf
      	BooksAPI.update(book, shelf).then(shelf => {
      		this.props.onMoveShelf(shelf)
      		this.setState({result: result})
      	})
	}

	render(){    
		const { result } = this.state;
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
						{result.map((book) => (
	                    	<li key={book.id}>
								<Books book={book} onChangeShelf={(book, shelf) => this.addTo(book,shelf)}/>
							</li>
                      	))}
	                </ol>
	            </div>
	        </div>
    	)
	}
}

export default SearchBooks