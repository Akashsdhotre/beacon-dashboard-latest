import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

class EditAdvertise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: '',
      body: '',
      posts: {}
    
    };
    this.fetchData = this.fetchData.bind(this);
    // this.postData = this.postData.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this.title = React.createRef();
    this.body = React.createRef();

    console.log("storage id edit= ",localStorage.getItem("advertisementId"))
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData() {

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const advertisementId = this.props.match.params.id;

    console.log("addId",advertisementId)

    fetch('https://beacon-appl.herokuapp.com/advertisementDetails', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      id: id,
      token: token,
      advertisementId: advertisementId
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("add advertise Response",responseJson)
      if(responseJson.success === true){
        console.log(responseJson)
        this.setState({
          data: responseJson.data,
          title:responseJson.data[0].advertisementTitle,
          body:responseJson.data[0].advertisementContents
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

  onHandleChange(e) {
    this.setState({ body: e });
    console.log(this.state.body);
  }


  onHandleSubmit(e) {
    e.preventDefault();

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const advertisementId = this.props.match.params.id;;
    const { data , title , body } = this.state
    const action = data[0].action
    const actionTarget = data[0].actionTarget
    const image = ""

    console.log("id",id)
    console.log("token",token)
    console.log("advertisementId",advertisementId)
    console.log("data",data)
    console.log("title",title)
    console.log("body",body)
    console.log("action",action)
    console.log("action",actionTarget)
    console.log("action",image)

    fetch('https://beacon-appl.herokuapp.com/update_advertisement', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      id: id,
      token: token,
      advertisementTitle:title,
      advertisementId: advertisementId,
      advertisementContents:body,
      image:"",
      action:action,
      actionTarget:actionTarget,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("update Response",responseJson)
        console.log(responseJson)
      if(responseJson.success === true){
        alert("Updated successfully")
        // this.setState({
        //   title: '',
        //   body: ''
        // });

      }
      else{
        alert("update advertise not done..")
      }
    })
    .catch((error) => {
      alert("Internal server error..")
    });


    


  }

  render() {
    return (

      <div>
        <div className="navigation"><h4>Edit Advertise</h4></div><br/><br/>
        <div className="row">
        <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="container-fluid">
              <form onSubmit={this.onHandleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    value={this.state.title}
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
                    modules={EditAdvertise.modules}
                    formats={EditAdvertise.formats}
                    value={this.state.body}
                    placeholder="Body"
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="d-flex justify-content-around mb-3">
                <button className="btn btn-primary">Update</button>
                </div>
              </form>
              <br/>

          
            </div>
          </div>

          <div className="col-md-2"></div>
        </div>

      </div>  

          
    );
  }
}

EditAdvertise.modules = {
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

EditAdvertise.formats = [
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

export default EditAdvertise;
