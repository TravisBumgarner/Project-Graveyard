import React from 'react'
import moment from 'moment'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
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

const UPSERT_METRIC_MUTATION = gql`
    mutation($title: String!, $id: String!) {
        upsertMetric(title: $title, id: $id)
    } 
`

const UPSERT_ENTRY_MUTATION = gql`
    mutation($value: Float, $date: String!, $metricId: String!, $id: String!) {
        upsertEntry(value: $value, date: $date, metricId: $metricId, id: $id)
    }
`

type MetricInputProps = {
    metric: TMetric
    entry: TEntry
    selectedDate: TDateISODate
}

const MetricInput = ({ metric, entry, selectedDate }: MetricInputProps) => {
    const { dispatch } = React.useContext(context)
    // console.log(entry)
    const [metricValue, setMetricValue] = React.useState<number>(entry ? entry.value : null)
    const [isCreatingEntry, setIsCreatingEntry] = React.useState<boolean>(false)
    const [upsertEntry] = useMutation<{ upsertEntry: string }>(UPSERT_ENTRY_MUTATION)
    // console.log(selectedDate)
    const handleNewEntrySubmit = async () => {
        setIsCreatingEntry(true)
        upsertEntry({ variables: {
            value: metricValue,
            date: selectedDate,
            metricId: metric.id,
            id: entry ? entry.id : ''
        } })
            .catch(error => {
                logger(error)
                dispatch({ type: 'ADD_ALERT', data: { message: "Couldn't save Entry", timeToLiveMS: 2000 } })
                setMetricValue(entry.value)
            })
            .finally(() => setIsCreatingEntry(false))
    }

    const onBlur = () => {
        handleNewEntrySubmit()
    }
    console.log('Rendering MetricInput')

    return (
        <div>
            <LabelAndInput
                id={metric.id}
                label={metric.title}
                disabled={isCreatingEntry}
                type="number"
                placeholder="Get Tracking!"
                value={`${metricValue}`}
                onBlur={onBlur}
                handleChange={value => setMetricValue(parseInt(value, 10))}
            />
        </div>
    )
}

const Journal = () => {
    const [selectedDate, setSelectedDate] = React.useState<TDateISODate>(formatDateKeyLookup(moment()))
    const [metrics, setMetrics] = React.useState<Record<string, TMetric>>({})
    const [newMetric, setNewMetric] = React.useState<string>('')
    const [upsertMetric] = useMutation<{ upsertMetric: string }>(UPSERT_METRIC_MUTATION)
    const { dispatch } = React.useContext(context)
    const [creatingMetric, setCreatingMetric] = React.useState<boolean>(false)
    const [entriesByMetricId, setEntriesByMetricId] = React.useState<Record<TMetric['id'], TEntry>>({})

    const [getMetrics, { loading: isLoadingMetrics }] = useLazyQuery<{ metric: TMetric[] }>(METRICS_QUERY, {
        onCompleted: ({ metric }) => {
            setMetrics(_.keyBy(metric, 'id'))
        },
        onError: (error) => {
            logger(error)
            dispatch({ type: 'ADD_ALERT', data: { message: 'Failed to fetch metrics', timeToLiveMS: 5000 } })
        }
    })

    const [getEntries, { loading: isLoadingEntries }] = useLazyQuery<{ entry: (TEntry & {metric: TMetric})[] }>(ENTRIES_BY_DATE_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: ({ entry: entries }) => {
            const newEntriesByMetricId: Record<TMetric['id'], TEntry> = {}
            entries.forEach(e => {
                newEntriesByMetricId[e.metric.id] = { ...e }
            })
            setEntriesByMetricId(newEntriesByMetricId)
        },
        onError: (error) => {
            logger(error)
            dispatch({ type: 'ADD_ALERT', data: { message: 'Failed to fetch entries', timeToLiveMS: 5000 } })
        }
    })

    React.useEffect(() => {
        getMetrics()
        getEntries({ variables: { date: selectedDate } })
    }, [])

    const handleNewMetricSubmit = async () => {
        setCreatingMetric(true)
        upsertMetric({ variables: { title: newMetric, id: '' } })
            .then(({ data }) => {
                setMetrics({ ...metrics, [data.upsertMetric]: { id: data.upsertMetric, title: newMetric } })
                setNewMetric('')
            })
            .catch(error => {
                logger(error)
                dispatch({ type: 'ADD_ALERT', data: { message: "Couldn't create Metric", timeToLiveMS: 2000 } })
            })
            .finally(() => setCreatingMetric(false))
    }

    const setDate = async (direction: 'previous' | 'next' | 'today') => {
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
        await getEntries({ variables: { date: newDate } })
        setSelectedDate(newDate)
    }
    return (
        <div>
            <PageHeader>
                <Heading.H2>{formatDateDisplayString(selectedDate)}</Heading.H2>
                <Button key="today" onClick={() => setDate('today')} variation="INTERACTION">Today</Button>
                <Button key="previous" onClick={() => setDate('previous')} variation="INTERACTION">&lt;</Button>
                <Button key="next" onClick={() => setDate('next')} variation="INTERACTION">&gt;</Button>
            </PageHeader>
            {(isLoadingEntries || isLoadingMetrics) ? (
                <p>Loading</p>
            ) : (
                <div>
                    {Object.values(metrics).map(metric => (
                        <MetricInput
                            key={`${metric.id}${selectedDate}`}
                            metric={metric}
                            entry={entriesByMetricId[metric.id]}
                            selectedDate={selectedDate}
                        />
                    ))}
                </div>
            )}
            <div>
                <LabelAndInput
                    id="new-metric"
                    label="New Metric"
                    value={newMetric}
                    handleChange={value => setNewMetric(value)}
                />
                <Button
                    variation="INTERACTION"
                    disabled={creatingMetric || newMetric.trim().length === 0}
                    onClick={handleNewMetricSubmit}
                >Add New Metric
                </Button>
            </div>
        </div>
    )
}

export default Journal
