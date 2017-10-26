import React, { Component } from 'react';

class DivHead extends Component {
  render() {
    let imageURL = "http://plus.smartinfini.co.kr/public/files/스마트인피니_로고1 (248).jpg";
    let externalStyle = { display: 'none' };

    if ( this.props.imageURL != '' ) {
      imageURL = this.props.imageURL;
    }

    if ( this.props.isExternal == 'Y' ) {
      externalStyle = { display: 'block' };
    }


    return (
        <div className="autoCenter">
          <img src="http://barcode.smartinfini.co.kr/Images/NewTiket/top.jpg" alt="" className="max-widthheight-100" />

          <div className="top-center-20">
            <img src={ imageURL } alt="BARCODE IMAGE" className="barcodeImage" />    
          </div>

          <div className="top-center-20" style={ externalStyle }>
            <img src="http://barcode.smartinfini.co.kr/Images/kamis.jpg" className="max-widthheight-100" />
          </div>

          <div className="page-header headText">
            { this.props.headText }
          </div>
        </div>
    );
  }
}

export default DivHead;