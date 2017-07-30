import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Books extends Component{
	static propTypes = {
		book: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}
	moveTo = (book, shelf) => {
		book.shelf = shelf;
		this.props.onChangeShelf(book, shelf);
	}
	render(){
		const { book } = this.props
		const bookStyle = {
			width: 128,
			height: 193,
			backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
		}
		return (
			<div className="book">
                <div className="book-top">
                    <div className="book-cover" style={bookStyle}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => this.moveTo(book, e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>      
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors[0]}</div>   
            </div>
        )
	}
}


export default Books