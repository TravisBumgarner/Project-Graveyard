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
      searchAsYouTypeData: [],
      nGramsData: [],
      userInput: '',
      searchedTerm: '',
      slop: 1,
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

  submitAPISearchAsYouType = debounce(searchedTerm => {
    const {
      slop
    } = this.state

    axios.get(`http://localhost:8000/search/searchasyoutype?searchedTerm=${searchedTerm}&slop=${slop}`)
      .then(resp => {
        console.log(resp, typeof resp)
        this.setState({searchAsYouTypeData: resp.data})
      })
      .catch(err => alert(err))
  }, 500)

  submitAPINGrams = debounce(searchedTerm => {
    const {
    } = this.state

    axios.get(`http://localhost:8000/search/ngrams?searchedTerm=${searchedTerm}`)
      .then(resp => {
        console.log(resp, typeof resp)
        this.setState({nGramsData: resp.data})
      })
      .catch(err => alert(err))
  }, 500)

  submit = (searchedTerm) => {
    this.setState({searchedTerm})
    this.submitUI(searchedTerm)
    this.submitAPINGrams(searchedTerm)
    this.submitAPISearchAsYouType(searchedTerm)
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
      searchAsYouTypeData,
      slop,
      nGramsData,
    } = this.state

    const autocompleteSearch = (uiData.length && userInput.length) 
      ? this.formatAutocomplete(searchedTerm, uiData[0])
      : ""

    const uiDataSubset = uiData.slice(0,10)
    const uiDataListItems = searchedTerm.length > 3 
      ? uiDataSubset.map((e,i) => <li key={i}>{e}</li>)
      : <li>Enter a search term</li>

    const searchAsYouTypeDataListItems = searchedTerm.length > 3 
      ? searchAsYouTypeData.map((e,i) => <li key={i}>{e}</li>)
      : <li>Enter a search term</li>

    const nGramsDataListItems = searchedTerm.length > 3 
      ? nGramsData.map((e,i) => <li key={i}>{e}</li>)
      : <li>Enter a search term</li>

    return (
      <Fragment>
        <HomeCard>
            <Input
              name="userInput"
              onChange={e => this.onChange(e.target.value)}
              value={userInput}
            />
            <Input
              name="slop"
              onChange={e => this.setState({'slop': e.target.value})}
              value={slop}
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
            <h1>Searched Term</h1>
            <p>{searchedTerm}</p>
          </div>
        </HomeCard>
        <HomeCard>
          <h1>Search Results (UI-Regex)</h1>
          <ul>{uiDataListItems}</ul>
        </HomeCard>
        <HomeCard>
          <h1>Search Results (API-Search as you type)</h1>
          <ul>{searchAsYouTypeDataListItems}</ul>
        </HomeCard>
        <HomeCard>
          <h1>Search Results (API-NGrams)</h1>
          <ul>{nGramsDataListItems}</ul>
        </HomeCard>
      </Fragment>

    )

  }
}
