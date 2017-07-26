import React, { Component } from 'react'

class Books extends Component{

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
                        <select value={book.shelf}>
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