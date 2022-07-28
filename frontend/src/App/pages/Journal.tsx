import React from 'react'
import moment from 'moment'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import _ from 'lodash'

import { formatDateDisplayString, formatDateKeyLookup, logger } from 'utilities'
import { PageHeader, Button, Heading, LabelAndInput } from 'sharedComponents'
import { context } from 'context'
import { TMetric, TDateISODate, TEntry } from '../../../../shared'

const METRICS_QUERY = gql`
query MetricsQuery {
metric {
    title,
      id
    }
  }
`

const ENTRIES_BY_DATE_QUERY = gql`
  query EntriesByDateQuery($date: String!) {
    entry(date: $date) {
        value,
        id,
        date,
        metric {
            id
        }
    }
  }
`

const ADD_METRIC_MUTATION = gql`
mutation($title: String!) {
    createMetric(title: $title) {
      id,
      title
    }
  } 
`

type MetricInputProps = {
    metric: TMetric
    entry: TEntry
}

const MetricInput = ({ metric, entry }: MetricInputProps) => {
    const [metricValue, setMetricValue] = React.useState<number>(entry ? entry.value : 0)

    return (
        <div>
            <LabelAndInput
                id={metric.id}
                label={metric.title}
                type="number"
                value={`${metricValue}`}
                handleChange={value => setMetricValue(parseInt(value, 10))}
            />
        </div>
    )
}

const Today = () => {
    const [selectedDate, setSelectedDate] = React.useState<TDateISODate>(formatDateKeyLookup(moment()))
    const [metrics, setMetrics] = React.useState<Record<string, TMetric>>({})
    const [newMetric, setNewMetric] = React.useState<string>('')
    const [createMetric] = useMutation<{ createMetric: TMetric }>(ADD_METRIC_MUTATION)
    const { dispatch } = React.useContext(context)
    const [creatingMetric, setCreatingMetric] = React.useState<boolean>(false)
    const [entriesByMetricId, setEntriesByMetricId] = React.useState<Record<TMetric['id'], TEntry>>({})

    const [getEntries, { loading: isLoadingEntries }] = useLazyQuery<{ entry: (TEntry & {metric: TMetric})[] }>(ENTRIES_BY_DATE_QUERY, {
        variables: {
            date: selectedDate
        },
        onCompleted: ({ entry: entries }) => {
            const newEntriesByMetricId: Record<TMetric['id'], TEntry> = {}
            entries.forEach(e => {
                newEntriesByMetricId[e.metric.id] = { ...e }
            })
            console.log('entries query result', newEntriesByMetricId)
            setEntriesByMetricId(newEntriesByMetricId)
        }
    })

    React.useEffect(() => {
        getEntries()
    }, [selectedDate])

    const [getMetrics, { loading: isLoadingMetrics }] = useLazyQuery<{ metric: TMetric[] }>(METRICS_QUERY, {
        onCompleted: ({ metric }) => {
            setMetrics(_.keyBy(metric, 'id'))
        }
    })

    React.useEffect(() => {
        getMetrics()
    }, [selectedDate])

    const handleNewMetricSubmit = async () => {
        setCreatingMetric(true)
        createMetric({ variables: { title: newMetric } })
            .then(({ data }) => {
                setMetrics({ ...metrics, [data.createMetric.id]: data.createMetric })
                setNewMetric('')
            })
            .catch(error => {
                logger(error)
                dispatch({ type: 'ADD_ALERT', data: { message: "Couldn't create Metric", timeToLiveMS: 2000 } })
            })
            .finally(() => setCreatingMetric(false))
    }

    const setDate = (direction: 'previous' | 'next' | 'today') => {
        let newDate: TDateISODate

        switch (direction) {
            case 'today': {
                newDate = formatDateKeyLookup(moment())
                break
            }
            case 'previous': {
                newDate = formatDateKeyLookup(moment(selectedDate).subtract(1, 'day'))
                break
            }
            case 'next': {
                newDate = formatDateKeyLookup(moment(selectedDate).add(1, 'day'))
                break
            }
        }
        // handleMissingDataPoints()
        setSelectedDate(newDate)
    }

    if (isLoadingEntries || isLoadingMetrics) return <p>loading</p>

    return (
        <div>
            <PageHeader>
                <Heading.H2>{formatDateDisplayString(selectedDate)}</Heading.H2>
                <Button key="today" onClick={() => setDate('today')} variation="INTERACTION">Today</Button>
                <Button key="previous" onClick={() => setDate('previous')} variation="INTERACTION">&lt;</Button>
                <Button key="next" onClick={() => setDate('next')} variation="INTERACTION">&gt;</Button>
            </PageHeader>
            <div>
                {Object.values(metrics).map(metric => <MetricInput key={metric.id} metric={metric} entry={entriesByMetricId[metric.id]} />)}
            </div>
            <div>
                <LabelAndInput
                    id="new-metric"
                    label="New Metric"
                    value={newMetric}
                    handleChange={value => setNewMetric(value)}
                />
                <Button variation="INTERACTION" disabled={creatingMetric} onClick={handleNewMetricSubmit}>Add New Metric</Button>
            </div>
        </div>
    )
}

export default Today
