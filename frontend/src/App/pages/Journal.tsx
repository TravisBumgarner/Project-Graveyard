import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import _ from 'lodash'

import { Metric, TDateISODate } from 'sharedTypes'
import { formatDateDisplayString, formatDateKeyLookup } from 'utilities'
import { PageHeader, Button, Heading, Paragraph, LabelAndInput } from 'sharedComponents'
import { context } from 'context'

const METRICS_QUERY = gql`
  query MetricsQuery {
    metrics {
      title,
      id
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
    metric: Metric
}

const MetricInput = ({ metric }: MetricInputProps) => {
    const [value, setValue] = React.useState<number>(0)

    return (
        <div>
            <LabelAndInput
                id={metric.id}
                label={metric.title}
                type="number"
                value={`${value}`}
                handleChange={value => setValue(parseInt(value, 10))}
            />
        </div>
    )
}

const Today = () => {
    const [selectedDate, setSelectedDate] = React.useState<TDateISODate>(formatDateKeyLookup(moment()))
    const [metrics, setMetrics] = React.useState<Record<string, Metric>>({})
    const [newMetric, setNewMetric] = React.useState<string>('')
    const [createMetric, { data, loading, error }] = useMutation<{ createMetric: Metric }>(ADD_METRIC_MUTATION);
    const { dispatch } = React.useContext(context)
    const [creatingMetric, setCreatingMetric] = React.useState<boolean>(false)

    useQuery<{ metrics: Metric[] }>(METRICS_QUERY, {
        onCompleted: ({ metrics }) => {
            setMetrics(_.keyBy(metrics, 'id'))
        }
    })

    const handleNewMetricSubmit = async () => {
        setCreatingMetric(true)
        createMetric({ variables: { title: newMetric } })
            .then(({ data: { createMetric } }) => {
                setMetrics({ ...metrics, [createMetric.id]: createMetric })
                setNewMetric('')
            })
            .catch(error => dispatch({ type: "ADD_ALERT", data: { message: "Couldn't create Metric", timeToLiveMS: 2000 } }))
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

    return (
        <div>
            <PageHeader>
                <Heading.H2>{formatDateDisplayString(selectedDate)}</Heading.H2>
                <Button key="today" onClick={() => setDate('today')} variation="INTERACTION">Today</Button>
                <Button key="previous" onClick={() => setDate('previous')} variation="INTERACTION">&lt;</Button>
                <Button key="next" onClick={() => setDate('next')} variation="INTERACTION">&gt;</Button>
            </PageHeader>
            <div>
                {Object.values(metrics).map(metric => <MetricInput key={metric.id} metric={metric} />)}
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
