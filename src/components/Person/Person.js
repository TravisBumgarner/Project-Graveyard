import React, {Component} from 'react';

import { DefaultCard } from "../../theme";
import CardContent from '@material-ui/core/CardContent';

export default class Person extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        const {
            details: {
                _source: {
                  first_name,
                  last_name,
                  phone1,
                  city,
                  state,
                }
            },
        } = this.props;

        return (
            <DefaultCard>
                <CardContent>
                  <h3>{first_name} {last_name}</h3>
                  <b>Phone: </b> {phone1}<br />
                  <b>Location: </b> {city}, {state}<br />
                </CardContent>
            </DefaultCard>
        )
    }
}