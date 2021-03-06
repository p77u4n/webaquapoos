import React, {Component, PropTypes} from 'react';
import BedGrow from './research.bedGrow.js';
import {OverlayTrigger, Overlay, Popover, ButtonGroup, Button} from 'react-bootstrap';

class UnitBedGrow extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {show : {}};
    }

    render() {
        
        const delUnitAlertConfirm = (
            <Popover id={"delUnitAlertConfirm" + this.props.pos.unit} title="Đkm chắc xóa chớ ?"  >
                <ButtonGroup>
                    <Button className="delButton" onClick={()=>{this.props.onUnitBarClick(this.props.pos);
                                                                this.refs.overlay.hide();}}>Co</Button>
                    <Button className="backButton" onClick={()=>this.refs.overlay.hide()}>
                        Khong
                    </Button>
                </ButtonGroup>
            </Popover>
        )

        const overlayProps = {
            container : this,
            overlay : delUnitAlertConfirm,
            rootClose : true
        }   
        return(
            <div  className="unit-bedgrow-section col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                <div className="unit-bedgrow-section-header" >

                    <span>{this.props.name}</span>
                        <OverlayTrigger {...overlayProps} trigger="click" ref="overlay" placement="left">
                            <i className="fa fa-window-close fa-3" aria-hidden="true" type="button" >
                            </i>
                        </OverlayTrigger>
                </div>
                <div className="unit-bedgrow-section-body">
                    {this.props.beds.map((bed, index) => {
                        return (
                            <BedGrow key={bed.pos.bed} 
                                {...bed}
                                onBtnAddVegetClick={this.props.onBtnAddVegetClick}
                                onBtnDelVegetClick={this.props.onBtnDelVegetClick}/>        
                        );
                    })} 
                </div>
            </div>
        );
    }
}



export default UnitBedGrow;
