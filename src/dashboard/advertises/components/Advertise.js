
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

class Advertise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: {}
    };
    // bind
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }




  onHandleChange(e) {
    this.setState({ body: e });
    console.log(this.state.body);
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    
    console.log("complete post data markup format=",post)

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const {title,body} = this.state

    console.log("title",title)
    console.log("body",body)

    fetch('https://beacon-appl.herokuapp.com/create_advertisement', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      id: id,
      token: token,
      advertisementTitle:title,
      advertisementContents:body,
      image:"",
      action:"call",
      actionTarget:"9823704870"
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("add advertise Response",responseJson)
      if(responseJson.success === true){
        alert("advertise added successfully..")
        this.setState({
          title: '',
          body: ''
        });

      }
      else{
        alert("Add advertise not done..")
      }
    })
    .catch((error) => {
      alert("Internal server error..")
    });


  }

  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <input
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              ref="title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <ReactQuill
              modules={Advertise.modules}
              formats={Advertise.formats}
              value={this.state.body}
              placeholder="Body"
              onChange={this.onHandleChange}
            />
          </div>
          <div className="d-flex justify-content-around mb-3">
          <button className="btn btn-primary">Post</button>
          </div>
        </form>
        <br />

         title : {this.state.title} <br/><br/>
         Html format : {this.state.body}<br/><br/>
         Actual view :  {renderHTML(this.state.body)}
      </div>
    );
  }
}

Advertise.modules = {
  toolbar: [
    [{ header: [1,2,3,4,5,6,false] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color:[]}, {background:[]}],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    ['code-block'],
    [{ indent: '+1' }, { indent: '-1' }],
    ['link', 'image', 'video','formula'],
    ['clean'],
  ]
};

Advertise.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'script',
  'code-block',
  'indent',
  'bullet',
  'link',
  'image',
  'video',
  'formula'
];

export default Advertise;
