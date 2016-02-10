import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

const TitleHead = () => (
  <div>
    <div className="row">
      {/*<img style={{margin: '0 auto'}} src="http://vietdms.com/image/News/634874776807460444logoDMS.png" />*/}
      <h1 className="col-md-12 mastheadtitle">DMS</h1>
      <h1 className="col-md-12 masthead">Document Management System</h1><br />
      <div className="col-md-12">
        <FloatingActionButton backgroundColor="#55ACEE" href="http://twitter.com/bryomckim" linkButton target="_blank" style={{marginLeft: 0}}>
          <i className="fa fa-twitter fa-2x"></i>
        </FloatingActionButton>
        <FloatingActionButton backgroundColor="#3B5998" href="http://facebook.com/brian.kirwa" linkButton target="_blank" style={{marginLeft: 15}}>
          <i className="fa fa-facebook fa-2x"></i>
        </FloatingActionButton>
        <FloatingActionButton backgroundColor="#DD4B39" href="https://plus.google.com/+BrianKimutai" linkButton target="_blank" style={{marginLeft: 15}}>
          <i className="fa fa-google-plus fa-2x"></i>
        </FloatingActionButton>
      </div>
    </div>
  </div>
);

export default TitleHead;
