import React, {Component} from 'react';


class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        var media;
        if(this.props.media.mType === "video") {
            media = (<iframe src={this.props.media.mSrc} frameborder={0} webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>);
        }else if(this.props.media.mType === "image") {
            media = (<img src={this.props.media.mSrc}/>);
        }
        return (
                <header>
                    <div className="container-fluid">
                        <div className="videowrap">
                            <div className="mediabox">
                                {media}
                            </div>
                        </div>
                        <div className="shortintro">
                            <div className="half content-x">
                                <h2>Aquapo-OS</h2>
                                <h3>Brevity Introduction Sentence about Aquapo-OS</h3>
                            </div>
                        </div>
                    </div>
                </header>
        );
    }
} 
 

export default Header;
