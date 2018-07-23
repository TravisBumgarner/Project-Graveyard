import React, {Component, Fragment} from 'react'
import searchDataStackOverflow from '../../../../data/StackOverflowTags.json'

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

    let allTargetTerms = new Set()
    searchDataStackOverflow.filter(each=> each.target !== null).map(each => allTargetTerms.add(each.target))

    this.state = {
      isSearching: false,
      allTargetTerms: [...allTargetTerms],
      selectedTargetTerms: [],
      userInput: '',
      searchedTerm: '',
    }
  }
  submit = debounce((searchedTerm) => {
    const {
      allTargetTerms,
    } = this.state;

    const selectedTargetTerms = allTargetTerms.filter(c => c.toLowerCase().includes(searchedTerm.toLowerCase()))
    
    this.setState({
      searchedTerm,
      selectedTargetTerms,
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
      selectedTargetTerms,
    } = this.state

    const autocompleteSearch = (selectedTargetTerms.length && userInput.length) 
      ? this.formatAutocomplete(searchedTerm, selectedTargetTerms[0])
      : ""

    const selectedTargetTermsListItems = searchedTerm.length > 3 
      ? selectedTargetTerms.map((e,i) => <li key={i}>{e}</li>)
      : <li>Enter a search term</li>

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
            <h1>Autocomplete (UI-Regex)</h1>
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
          <h1>Serched Results (UI-Regex)</h1>
          <ul>{selectedTargetTermsListItems}</ul>
        </HomeCard>
      </Fragment>

    )

  }
}
