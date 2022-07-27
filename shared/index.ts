type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

type TMetric = {
    id: string
    title: string
}

type TEntry = {
    id: string
    value: number
    date: TDateISODate
    metricId: TMetric['id']
}

export {
    TMetric,
    TEntry,
    TDateISODate
}