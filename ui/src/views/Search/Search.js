import React, {Component, Fragment} from 'react'
import axios from 'axios'

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
      uiData: [],
      apiData: [],
      userInput: '',
      searchedTerm: '',
    }
  }

  submitUI = debounce(searchedTerm => {
    const {
      allTargetTerms,
    } = this.state;

    const uiData = allTargetTerms.filter(c => c.toLowerCase().includes(searchedTerm.toLowerCase()))
    
    this.setState({
      uiData,
    })
  }, 500)

  submitAPI = debounce(searchedTerm => {
    axios.get(`http://localhost:8000/search/searchasyoutype?searchedTerm=${searchedTerm}&slop=2`)
      .then(resp => {
        console.log(resp, typeof resp)
        this.setState({apiData: resp.data})
      })
      .catch(err => alert(err))
  }, 500)

  submit = (searchedTerm) => {
    this.setState({searchedTerm})
    this.submitUI(searchedTerm)
    this.submitAPI(searchedTerm)
  }

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
      uiData,
      apiData,
    } = this.state

    const autocompleteSearch = (uiData.length && userInput.length) 
      ? this.formatAutocomplete(searchedTerm, uiData[0])
      : ""

    const uiDataSubset = uiData.slice(0,10)
    const uiDataListItems = searchedTerm.length > 3 
      ? uiDataSubset.map((e,i) => <li key={i}>{e}</li>)
      : <li>Enter a search term</li>

      const apiDataListItems = searchedTerm.length > 3 
      ? apiData.map((e,i) => <li key={i}>{e}</li>)
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
          <ul>{uiDataListItems}</ul>
        </HomeCard>
        <HomeCard>
          <h1>Serched Results (API-Search as you type)</h1>
          <ul>{apiDataListItems}</ul>
        </HomeCard>
      </Fragment>

    )

  }
}
