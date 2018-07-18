import React, {Component} from 'react'

import searchData from '../../../data/subset.json'

import {
  SearchBar,
} from '../../containers'

import {
  HomeCard
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

const submit = debounce(text => {alert(text)}, 500)

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

  onChange = userInput => {
    this.setState({userInput})
    submit(userInput)
  }

  render(){
    const {
      userInput,
    } = this.state

    return (
      <HomeCard>
        <input
          name="userInput"
          onChange={e => this.onChange(e.target.value)}
          value={userInput}
        />
      </HomeCard>
    )

  }
}
