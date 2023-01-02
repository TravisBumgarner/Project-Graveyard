import React, {Component} from 'react';

import { DefaultCard } from "../../theme";
import CardContent from '@material-ui/core/CardContent';

export default class SingleResult extends Component {
    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){
        const {
            details: {
                _source: {
                  street,
                  city,
                  zip,
                  state,
                  beds,
                  sq__ft,
                }
            },
        } = this.props;

        return (
            <DefaultCard>
                <CardContent>
                  <h3>{city}, {state}, {zip}</h3>
                  <b>Street</b>: {street}<br />
                  <b>Beds</b>: {beds}<br />
                  <b>Square Feet</b>: {sq__ft}<br />
                </CardContent>
            </DefaultCard>
        )
    }
}