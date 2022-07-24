import React from 'react'
import moment from 'moment'
import { gql, useQuery } from '@apollo/client'
import _ from 'lodash'

import { Metric, TDateISODate } from 'sharedTypes'
import { formatDateDisplayString, formatDateKeyLookup } from 'utilities'
import { PageHeader, Button, Heading, Paragraph, LabelAndInput } from 'sharedComponents'

const METRICS_QUERY = gql`
  query MetricsQuery {
    metrics {
      title,
      id
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

    useQuery<{ metrics: Metric[] }>(METRICS_QUERY, {
        onCompleted: ({ metrics }) => {
            setMetrics(_.keyBy(metrics, 'id'))
        }
    })

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
        </div>
    )
}

export default Today
