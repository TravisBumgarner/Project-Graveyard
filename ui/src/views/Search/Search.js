import React, {Component, Fragment} from 'react'

import searchData from '../../../data/simplemaps-worldcities-basic.json'

import {
  HomeCard,
  Input,
} from "./Search.styles"

function debounce(func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSearching: false,
      allCities: searchData.map(each => each.city),
      selectedCities: [],
      userInput: '',
    }
  }
  submit = debounce((searchedTerm) => {
    const {
      allCities,
    } = this.state;
    const selectedCities = allCities.filter(c => c.toLowerCase().includes(searchedTerm.toLowerCase()));
    this.setState({
      searchedTerm,
      selectedCities,
    })
  }, 250)

  onChange = userInput => {
    this.setState({userInput})
    this.submit(userInput)
  }

  formatAutocomplete = (term, suggestion) => {
    const termLength = term.length
    const suggestionLength = suggestion.length

    if(termLength === suggestionLength){
      return <span><b>{term}</b></span>
    } else {
      return <span><b>{term}</b>{suggestion.slice(termLength)}</span>
    }
    
  }

  render(){
    const {
      userInput,
      searchedTerm,
      selectedCities,
    } = this.state
    
    const autocompleteSearch = (selectedCities.length && userInput.length) 
      ? this.formatAutocomplete(searchedTerm, selectedCities[0])
      : ""

    const selectedCitiesListItems = selectedCities.map((e,i) => <li key={i}>{e}</li>)

    return (
      <Fragment>
        <HomeCard>
            <Input
              name="userInput"
              onChange={e => this.onChange(e.target.value)}
              value={userInput}
            />
        </HomeCard>
        <HomeCard>
          <div>
            <h1>Autocomplete</h1>
            <p>{autocompleteSearch}</p>
          </div>
        </HomeCard>
        <HomeCard>
          <div>
            <h1>Serched Term</h1>
            <p>{searchedTerm}</p>
          </div>
        </HomeCard>
        <HomeCard>
          <h1>Serched Results</h1>
          <ul>{selectedCitiesListItems}</ul>
        </HomeCard>
      </Fragment>

    )

  }
}
