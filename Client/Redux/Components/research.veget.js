import React, {Component , PropTypes} from 'react';

class Veget extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <p>{this.props.name}</p>
            </div>
        );
    }
}
export default Veget;
