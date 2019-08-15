import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import './Upload.css'

class Upload extends Component {
  constructor(props){
    super(props);
    this.state={
      file: "",
      redirect: false,
      fileUploaded: null,
    }
  }


  handleFile(e){
    let file = e.target.files[0];
    this.setState({file: file});
  }

  // Upon receiving a file, generates a form to pass to WebCrawler
  handleUpload(e){
    e.preventDefault();
    var form_data = new FormData();
    form_data.append("file", this.state.file);

    fetch('http://localhost:4000/upload', {
      method: "POST",
      body: form_data,
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(function (res){
      if (res.ok){
        this.setState({fileUploaded: true});
      }
      else{
        this.setState({fileUploaded: false});
      }
    });


  }

  redirect(e){
    this.setState({redirect: true});
  }

  render(props) {

    if (this.state.fileUploaded === true){
      alert("File Uploaded Succesfully");
      this.setState({
        file: "",
        fileUploaded: false,
      });
      this.fileInput.value = "";
    }
    else if (this.state.fileUploaded === false){
      alert("Error! Failed to Upload File");
      this.setState({
        file: "",
        fileUploaded: null,
      });
    }
    return (
      <div className="wrapper2">
        <form className="form">
          <div className="choosefile">
            <input type="file" name="file" className="pickfile z-depth-1" onChange={(e)=>this.handleFile(e)} ref={ref=> this.fileInput = ref}/>
          </div>
          <button className="z-depth-1" onClick={(e)=>this.handleUpload(e)}>Upload the File</button>

        </form>

      </div>
    );
  }
}
export default Upload;
