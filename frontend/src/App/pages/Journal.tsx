import React from 'react'
import moment from 'moment'

import { Metric, TDateISODate } from 'sharedTypes'
import { formatDateDisplayString, formatDateKeyLookup } from 'utilities'
import { PageHeader, Button, Heading, Paragraph } from 'sharedComponents'
import { gql, useQuery } from '@apollo/client'

const Metrics: Record<string, Metric> = {
    'coffee': {
        id: 'coffee',
        title: "How many coffees have you had today?",
    },
    'mood': {
        id: 'mood',
        title: "Overall mood today?",
    },
}

type MetricIdToDataPoint = Record<string, number>
const DataPoints: Record<TDateISODate, MetricIdToDataPoint> = {
    '2022-07-24': {
        'coffee': 1,
        'mood': 2,
    },
    '2022-07-25': {
        'coffee': 3,
        'mood': 4,
    },
    '2022-07-26': {
        'coffee': 5,
        'mood': 6,
    }
}

const METRICS_QUERY = gql`
  query MetricsQuery {
    metrics {
      title,
      id
    }
  }
`


const Today = () => {
    const [selectedDate, setSelectedDate] = React.useState<TDateISODate>(formatDateKeyLookup(moment()))
    console.log('hi')
    useQuery<{ metrics: Metric }>(METRICS_QUERY, {
        onCompleted: (data) => {
            console.log('hi')
            console.log(data)
        }
    })

    // const handleMissingDataPoints = () => {
    //     if (DataPoints[selectedDate] === undefined) {
    //         DataPoints[selectedDate] = {}
    //         // This Data will need to be dispatched to backend
    //     }

    //     const metricIds = Object.keys(Metrics)

    //     metricIds.forEach(id => {
    //         if (DataPoints[selectedDate][id] === undefined) {
    //             DataPoints[selectedDate][id] = 0
    //             // This Data will need to be dispatched to backend
    //         }
    //     })
    // }

    // React.useEffect(handleMissingDataPoints, [])

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

    const filteredDataPoints = DataPoints[selectedDate]
    return (
        <div>
            <PageHeader>
                <Heading.H2>{formatDateDisplayString(selectedDate)}</Heading.H2>
                <Button key="today" onClick={() => setDate('today')} variation="INTERACTION">Today</Button>
                <Button key="previous" onClick={() => setDate('previous')} variation="INTERACTION">&lt;</Button>
                <Button key="next" onClick={() => setDate('next')} variation="INTERACTION">&gt;</Button>
            </PageHeader>
            <div>
                {Object.values(Metrics).map(metric => {
                    return (
                        <div key={metric.id}>
                            <Paragraph>Metric: {metric.title}</Paragraph>
                            <Paragraph>Data Point: {filteredDataPoints[metric.id]}</Paragraph>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Today
