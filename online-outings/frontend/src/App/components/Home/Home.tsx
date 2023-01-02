import React from 'react'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Tune } from '@material-ui/icons'
import axios from 'axios'

import { ActivityCard, Sidebar, CloseSidebar, Activity } from './components'
import { Category, categoryNameMap } from 'utilities'
import { Header, Text } from 'shared'

const HomeWrapper = styled.div`
    display: flex;
`

const Main = styled.div`
    flex-grow: 1;
`

const FiltersBar = styled.div`
   width: 220px; 
`

const ToggleFiltersBar = styled(Button)`
    display: none !important;

    @media (max-width: 950px) {
        font-size: 1.5em;
        width: 100%;
        padding: 10px;
        margin: 1em 0 !important;
        display: block !important;
    }
`

type FilterProps = {
    value: boolean
    setValue: (value: boolean) => void
    label: string
    name: string
}

const Filter = ({ value, setValue, label, name }: FilterProps) => {
    return <FormControlLabel
        control={
            <Checkbox
                checked={value}
                onChange={() => setValue(!value)}
                name={name}
                color="primary"
            />
        }
        label={label}
    />
}

const Grid = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

type SelectableCategories = { [key in Category]: boolean }

const DEFAULT_SELECTED_CATEGORIES: SelectableCategories = {
    discuss: true,
    game: true,
    listen: true,
    move_about: true,
    watch: true,
}

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const [activities, setActivities] = React.useState<Activity[]>([])
    const [selectedCategories, setSelectableCategories] = React.useState<SelectableCategories>(DEFAULT_SELECTED_CATEGORIES)
    const [showSidebar, setShowSidebar] = React.useState(false)

    React.useEffect(() => {
        Promise.all([
            axios.get(__API__ + '/activities')
        ]).then(([
            activities,
        ]) => {
            setActivities(activities.data)
        }).catch(error => {
            console.log(error)
            setIsError(true)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const resetFilters = () => {
        setSelectableCategories(DEFAULT_SELECTED_CATEGORIES)
    }

    const ActivitiesToShow = activities
        .filter(({ categories }) => categories.some(({ name }) => selectedCategories[name]))
        .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        .map(params => <ActivityCard key={params.id} {...params} />)

    if (isError) {
        return <HomeWrapper>
            Something went wrong, please try again later.
        </HomeWrapper>
    }

    if (isLoading) {
        return <HomeWrapper>
            Loading...
        </HomeWrapper>
    }

    return (
        <HomeWrapper>

            <Sidebar showSidebar={showSidebar}>
                <FiltersBar>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Header size="large"><Tune style={{ position: "relative", top: "4px" }} /> Filters</Header>
                        <CloseSidebar onClick={() => setShowSidebar(!showSidebar)} />
                    </div>
                    <Header size="medium">By Activity</Header>
                    {
                        Object.keys(selectedCategories).map((selectableCategory: keyof SelectableCategories) =>
                            <Filter
                                key={selectableCategory}
                                value={selectedCategories[selectableCategory]}
                                setValue={() => setSelectableCategories({ ...selectedCategories, [selectableCategory]: !selectedCategories[selectableCategory] })}
                                name={`show-${selectableCategory}`}
                                label={categoryNameMap[selectableCategory]}
                            />
                        )
                    }
                    <Button variant="contained" onClick={resetFilters}>Reset Filters</Button>
                </FiltersBar>
            </Sidebar>
            <Main>
                <ToggleFiltersBar variant="contained" onClick={() => setShowSidebar(!showSidebar)}><Tune /> Toggle Filters</ToggleFiltersBar>
                <Grid>
                    {ActivitiesToShow}
                </Grid>
            </Main>
        </HomeWrapper>
    )
}

export default Home