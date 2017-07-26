import React from 'react';

export class Search extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props);
        console.log(this.setLocation);
    }

    searchSubmit(e){
        if (e.key === 'Enter') {
            console.log("Enter Key");
            this.props.setLocation(e.target.value);
        }
    }

    render(){
        const searchStyle = {
            width: "250px",
            border: "2px solid #4286f4",
            borderRadius: "5px",
            backgroundColor: "#adccff",
            margin: "40vh auto 0px",
            padding: "10px",
            textAlign: "center",
            color: "#fff"
        }

        const inputStyle = {
            "backgroundColor":"rgb(66, 134, 244)",
            "border":"0px",
            "borderRadius":"5px",
            "padding":"5px",
            "textAlign":"center"
        }

        return(
            <div className = "Search" style = {searchStyle}>
                <label>Where would you like to go?</label><br />
                <input name = "welcomePrompt" id="welcomePrompt" style = {inputStyle} onKeyUp= {this.searchSubmit.bind(this) } />
            </div>
        );
    }
}