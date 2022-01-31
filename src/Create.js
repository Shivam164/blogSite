import React from 'react';
import './style/Create.css';

function Create() {
  return (
  <div className="writeBlog">
   
      <form className="blogForm">
         <div className="writeBlog__header">
          Add a Blog
        </div>
        <div className="blogForm__image">
          <label>Add an Image as a banner : </label>
          <input type="file" accept="image/*"/>
        </div>
        
        <label>Blog Heading</label>
        <input type="text" className='writeBlog__heading' placeholder="Blog Heading"/>
        <label>Blog body</label>
        <textarea className='blogForm__body' type="text" placeholder="body of blog"/>
        <button>POST</button>
      </form>
  </div>
  );}

export default Create;
