import React, { Component } from 'react';
import DivHead from './skin/head.jsx';
import DivFooter from './skin/footer.jsx';

import $ from 'jquery';
import Accordion from './module/components/Accordion.jsx';
import * as BarcodeStore from './module/store/barcodestore';

class Main extends Component {
  constructor(props) {
	  super();

	  this.state = ({
      objBarcode: props.objBarcode,
	    barcode: props.barcode,
      result: false,
      data: {}
	  })
  }

  fetchBarcodeStore = async (barcode) => {
    if ( barcode != undefined && barcode != "" ) {
      let barcodeList = await BarcodeStore.getBarcodeInfo(barcode)  

      if ( barcodeList.status == 200 && barcodeList.data.result == 'success' ) {
        this.setState({ 
          result: true, 
          data: barcodeList.data.data 
        });
      }
    }
  }

  // 티켓정보 상세제작(유효기간, 권종)
  getTicketData(v) {
    let ticketType = ""
    let validDate = ""

    if ( v.validStartDate == v.validEndDate ) {
      validDate = "유효기간 : <strong>" + v.validStartDate + "</strong>까지"
    } else {
      validDate = "유효기간 : <strong>" + v.validStartDate + "~" + v.validEndDate + "</strong>까지"
    }

    Object.keys(v["ticketInfo"]).map((k, i) => {
      if ( i > 0 ) ticketType += " | "
      ticketType += v['ticketInfo'][k]['ticketName'] + ":<strong>" + v['ticketInfo'][k]['ticketCount'] + "</strong>명"
    })

    return {
      barcode: v.r_barcode,
      ticketType: ticketType,
      validDate: validDate
    }
  }

  setPlaceData(v) {
    let details = [];
    let panelClass = "panel panel-default"
    if ( this.state.data.stats == 2 ) panelClass = "panel panel-danger"
    else if ( this.state.data.stats == 4 ) panelClass = "panel panel-success"

    let detail = Object.keys(v).map((k, i) => {
      let placeName = v[k]['placeName'] + " 바코드 확인하기"
      let colKey = "collapse-" + k
      let headKey = "head-" + k

      let setPlace = [];
      v[k]['barcodeInfo'].map((dk, di) => {
        let dv = dk['detailInfo'];

        Object.keys(dk['detailInfo']).map((ddk, ddi) => {
          setPlace.push(this.getTicketData(dv[ddk]))
        })        
      })

      details.push({
          title : placeName,
          panelClass : panelClass,
          key : colKey,
          head : headKey,
          item : setPlace
      })
    })

    let data = [{
      accKey: "accordion",
      stats: this.state.data.stats,
      detail: details
    }]

    return data
  }

  imageAction(label, updown) {
    if ( updown ) $("span.glyphicon[data-id=" + label + "]").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
    else $("span.glyphicon[data-id=" + label + "]").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");    
  }

  componentWillMount() {
    this.fetchBarcodeStore(this.state.barcode)
  }

  // ReRendering 이후 바코드 생성
  componentDidUpdate() {
    let curComponent = this;

    $('#accordion').on('shown.bs.collapse', function (e) {
      curComponent.imageAction(e.target.id, true);

      var offset = $('.panel > .panel-collapse.in').offset();
      if(offset) {
        $('html, body').animate({
          scrollTop: $('div#' + e.target.id).offset().top-50
        }, 550); 
      }
    }).on('hide.bs.collapse', function(e) {
      curComponent.imageAction(e.target.id, false);
    });    
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.result;
  }  

  render() {
    let ticketView = ""
    let headText = ""
    let imageURL = ""
    let isExternal = ""

    if ( this.state.result ) {   
      ticketView = this.setPlaceData(this.state.data.placeInfo).map((v, idx) => (
        <Accordion key={ idx } data={ v } />
      ))
      headText = this.state.data.productMainName;
      imageURL = this.state.data.imageUrl;
      isExternal = this.state.data.isExternal;
    }

    return (
      <div>
        <DivHead headText={ headText } imageURL={ imageURL } isExternal={ isExternal } />
        { ticketView }
        <DivFooter />
      </div>      
    )
  }
}

export default Main;