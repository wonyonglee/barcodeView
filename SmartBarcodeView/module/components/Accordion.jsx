import React, { Component } from 'react';
import Barcode from 'react-barcode';

class Accordion extends Component {
  render() {
    let accordionView = ""
    let statsView = ""
    accordionView = this.props.data.detail.map((v, idx) => (
        <AccrodionItem 
          key={ idx }
          title={ v.title } 
          accKey={ this.props.data.accKey } 
          panelClass={ v.panelClass } 
          detailKey={ v.key } 
          detailHead={ v.head } 
          barcodeList={ v.item } 
        />        
    ))

    return (
      <div className="panel-group" id={ this.props.data.accKey } role="tablist" aria-multiselectable="true">
        <DivNotice stats={ this.props.data.stats } />
        { accordionView }
      </div>
    );
  }
}

class AccrodionItem extends Component {
  render() {
    let contents = this.props.barcodeList.map((d, idx) => {
      return <PanelContent key={ idx } ticketType={ d.ticketType } validDate={ d.validDate } barcode={ d.barcode } />
    })

    return (
      <div className={ this.props.panelClass }>
        <div className="panel-heading" role="tab" id={ this.props.detailHead }>
          <a className="collapsed" data-toggle="collapse" data-parent={ "#" + this.props.accKey } href={ "#" + this.props.detailKey } aria-expanded="false" aria-controls={ this.props.detailKey }>
            <h4 className="panel-title fLeft">
              { this.props.title }
            </h4>
            <div className="text-right">
              <span className="glyphicon glyphicon-menu-down" aria-hidden="true" data-id={ this.props.detailKey }></span>
            </div>
          </a>
        </div>      
        <div id={ this.props.detailKey } className="panel-collapse collapse" role="tabpanel" aria-labelledby={ this.props.detailHead }>
          <div className="panel-body">
            { contents }
          </div>
        </div>  
      </div>
    );
  }
}

class PanelContent extends Component {
  render() {
    let barcodeWidth = 2
    if ( this.props.barcode.length > 14 ) barcodeWidth = 1

    let BarcodeOption = {
      format: "CODE128",
      width: barcodeWidth,
      height: 80,
      fontOptions: "bold",
      font: "NanumGothic"
    }

    return (
      <ul className="noneList text-center">
        <li dangerouslySetInnerHTML={ { __html: this.props.ticketType } } ></li>
        <li dangerouslySetInnerHTML={ { __html: this.props.validDate } } ></li>
        <li>
          <Barcode 
            {...BarcodeOption}
            value={ this.props.barcode } 
          />
        </li>
        <li><hr/></li>
      </ul>
    );
  }
}

class DivNotice extends Component {
  render() {
    let classInfo = ""
    let messageInfo = ""

    if ( this.props.stats == 2 ) {
      classInfo = "alert alert-danger text-center"
      messageInfo = "이미 취소된 티켓입니다."
    } else if ( this.props.stats == 4 ) {
      classInfo = "alert alert-success text-center"
      messageInfo = "이미 발권된 티켓입니다."
    }

    return (
      <div className={ classInfo } role="alert">{ messageInfo }</div>
    );
  }
}

export default Accordion