import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
      myshelf:{
        read:[],
        wantToRead:[],
        currentlyReading:[]
      }
    }
    booksOfShelf = []
    componentDidMount(){
      BooksAPI.getAll().then((books) => {
        let shelf = {
          read:[],
          wantToRead :[],
          currentlyReading:[]
        }
        books.forEach((book) => {
          shelf[book.shelf].push(book.id)
          this.booksOfShelf.push(book)
        });
        this.setState({shelf})
      })
    }

    updateShelf = (shelf) => {
      this.setState({myshelf: shelf})
    }
    render() {
      return (
        <div className="app">
          <Route exact path="/" render={()=>(
            <ListBooks myshelf={this.state.myshelf} books={this.booksOfShelf} onMoveShelf={(shelf)=> this.updateShelf(shelf)}/>
          )} />

          <Route path="/search" render={() =>(
            <SearchBooks myshelf={this.state.myshelf} onMoveShelf={(shelf)=> this.updateShelf(shelf)} />
          )} />
            
        </div>
      )
    }
}

export default BooksApp
