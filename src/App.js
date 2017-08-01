import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books:[]
    }

    componentDidMount(){
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })   
    }

    updateBooks = (target, shelf) => {
        const books = JSON.parse(JSON.stringify(this.state.books))
        let book = books.find(book => book.id === target.id)
        if(book){
            book.shelf = shelf
        }else{
            books.push(book)
        }
        BooksAPI.update(target, shelf).then(() =>{
            this.setState({books})
        })
        
    }

    render() {   
        return (
            <div className="app">
                <Route exact path="/" render={()=>(
                    <ListBooks books={this.state.books} onUpdateShelf={(book, shelf)=> this.updateBooks(book, shelf)}/>
                )} />

                <Route path="/search" render={() =>(
                    <SearchBooks books={this.state.books} onAddToShelf={(book, shelf)=> this.updateBooks(book, shelf)} />
                )} />
            </div>
        )
    }
}

export default BooksApp
