import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, Row, Col, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class App extends Component {

  state = {
    books: [],
    // define state variable for adding a new book
    newBookData: {
      title: '',
      authors: '',
      bookshelves: '',
      languages: '',
      media_type: '',
      subjects: '',
    },
    editBookData: {
      id: '', // must have id for edit
      title: '',
      authors: '',
      bookshelves: '',
      languages: '',
      media_type: '',
      subjects: '',
    },
    newBookModal: false, // set false then when we clicked should be true.
    editBookModal: false
  }

  componentWillMount() {
    // get is fetch data and display 
    this._refreshBooks();
  }

  toggleNewBookModal() {

    this.setState({
      newBookModal: !this.state.newBookModal // First was true But we need oposite to make Modal BNT works.
    })
  }
  toggleEditBookModal() {

    this.setState({
      editBookModal: !this.state.editBookModal
    })
  }

  addBook() {
    // post is send request data and send new book data, once that done then response data
    // my Problem is I don't have a server to post in
    axios.post('http://localhost:3000/books', this.state.newBookData).then((response) => {
      //console.log(response.data);
      // we will update 
      let { books } = this.state; // call the books out from this state
      books.push(response.data); // push data into array the data came back from the sever
      // we will reset the state
      this.setState({
        books, newBookModal: false,
        //reset the newBookdata we don't want to get the old data.
        newBookData: {
          title: '',
          authors: '',
          bookshelves: '',
          languages: '',
          media_type: '',
          subjects: '',
        }
      });
    });
  }
  updateBook() {
    let { id, title, authors, bookshelves, languages, media_type, subjects } = this.state.editBookData;
    //   let updated = this.state.books.map((book,index) =>
    //    <Button key={index} color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
    // );

    axios.put('http://localhost:3000/books/' + this.state.editBookModal.id, {
      id, title, authors, bookshelves, languages, media_type, subjects
    }).then((response) => {
      this._refreshBooks();
      console.log(response.data);

      // Empty string after book been updated.
      this.setState({
        editBookModal: false, editBookData: {
          id: '',
          title: '',
          authors: '',
          bookshelves: '',
          languages: '',
          media_type: '',
          subjects: '',
        }
      })

    });
  }

  editBook(id, title, authors, bookshelves, languages, media_type, subjects) {
    console.log(title);

    this.setState({
      editBookData: {
        id,
        title,
        authors,
        bookshelves,
        languages,
        media_type,
        subjects
      },
      editBookModal: !this.state.editBookModal
    });
  }

  deleteBook(id) {
    axios.delete('http://localhost:3000/books/' + id).then((response) => {
      this._refreshBooks();
    });
  }

  _refreshBooks() {
    // get is fetch data and display 
    axios.get('http://localhost:3000/books').then((response) => {
      this.setState({
        // response.data will response return by server when we request axios.get('')
        books: response.data
      })
    });
  }

  render() {
    let books = this.state.books.map((book) => {
      return (

        <Row key={book.id}>
          <Col sm="12" >
            <Card body>
              <CardTitle><strong>ID:</strong> {book.id}</CardTitle>
              <CardTitle><strong>Title:</strong> {book.title}</CardTitle>
              <CardTitle><strong>Authors:</strong> {/* {book.authors.map(author => {
              return (<div>{author.name}
                {author.birth_year}
                {author.death_year}
              </div>
              )
            })} */}</CardTitle>
              <CardText><strong>Bookshelves:</strong> {book.bookshelves}</CardText>
              <CardText><strong>Download_count:</strong> {book.download_count}</CardText>
              {/* <CardText><strong>Formats:</strong> {book.map(book => <div>{book.formats}</div>)}
                })</CardText> */}
              <CardText><strong>Languages:</strong> {book.languages}</CardText>
              <CardText><strong>Media_type:</strong> {book.media_type}</CardText>
              <CardText><strong>Subjects:</strong> {book.subjects}</CardText>
            </Card>

            <Button color="success" size="l" className="mr-2 mb-2 mt-2" onClick={this.editBook.bind(this, book.id, book.title, book.authors, book.bookshelves, book.languages, book.media_type, book.subjects)}> Edit</Button>
            <Button color="danger" size="l" className="mr-2 mb-2 mt-2" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
          </Col>
        </Row>

      )
    });
    return (
      <div className="App container">

        <h1>My Books App</h1>
        {/* BTN for click add a new book */}
        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)} > Add Book</Button>

        {/* Adding a new book */}
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>

              <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                // when value changed the input want to update data
                let { newBookData } = this.state; //getting the new form data from this state

                newBookData.title = e.target.value; //update new form data from props

                this.setState({ newBookData }); //when value change setState
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="authors">Authors</Label>
              <Input id="authors" value={this.state.editBookData.authors} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.authors = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="bookshelves">bookshelves</Label>
              <Input id="bookshelves" value={this.state.newBookData.bookshelves} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.bookshelves = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="languages">languages</Label>
              <Input id="languages" value={this.state.newBookData.languages} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.languages = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="media_type">media_type</Label>
              <Input id="media_type" value={this.state.newBookData.media_type} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.media_type = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="subjects">subjects</Label>
              <Input id="subjects" value={this.state.newBookData.subjects} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.subjects = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* edit book */}
        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.title = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="authors">Authors</Label>
              <Input id="authors" value={this.state.editBookData.authors} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.authors = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="bookshelves">bookshelves</Label>
              <Input id="bookshelves" value={this.state.editBookData.bookshelves} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.bookshelves = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="languages">languages</Label>
              <Input id="languages" value={this.state.editBookData.languages} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.languages = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="media_type">media_type</Label>
              <Input id="media_type" value={this.state.editBookData.media_type} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.media_type = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="subjects">subjects</Label>
              <Input id="subjects" value={this.state.editBookData.subjects} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.subjects = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <div>
          {books}
        </div>

      </div>
    );
  }
}

export default App;
