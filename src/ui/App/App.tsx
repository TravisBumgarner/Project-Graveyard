import React from 'react'
import axios from 'axios'

import { Summoner } from '../../shared-types'

const App = () => {
    const [summoner, setSummoner] = React.useState<string>("finx the minx");
    const [summonerDetails, setSummonerDetails] = React.useState<Summoner | null>(null)
    const [hasErrored, setHasErrored] = React.useState<boolean>(false)
    const [hasSearched, setHasSearched] = React.useState<boolean>(false)

    React.useEffect(() => {
    })

    const handleSubmit = (event) => {
        setHasErrored(false)
        event.preventDefault();
        axios.get(`http://localhost:5000/summoners?summoner_name=${encodeURIComponent(summoner)}`)
            .then(response => { setSummonerDetails(response.data) })
            .catch(_error => setHasErrored(true))
            .finally(() => setHasSearched(true))
    }

    const FormInput = (
        <form onSubmit={handleSubmit}>
            <label>
                Summoner Name:
    <input
                    type="text"
                    value={summoner}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSummoner(event.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )

    let SearchResults
    if (hasErrored) {
        SearchResults = <h3>Whoops.</h3>
    } else if (!hasSearched) {
        SearchResults = <h3>Search Something.</h3>
    } else if (hasSearched && summonerDetails) {
        SearchResults = <h3>{summonerDetails.name} - {summonerDetails.id}</h3>
    } else if (hasSearched && !summonerDetails) {
        SearchResults = <h3>No user found.</h3>
    }

    return (
        <React.Fragment>
            <div>
                {FormInput}
                {SearchResults}
            </div >
        </React.Fragment>

    )
}

export default App