import db from 'database'
import { useLiveQuery } from 'dexie-react-hooks'
import moment from 'moment'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type TDateISODate, type TProject, type TProjectEntry } from 'types'

interface Props {
    start: TDateISODate
    end: TDateISODate
}

const ChartHoursPerProject: React.FC<Props> = ({ start, end }) => {
    const data = useLiveQuery(async () => {
        const entries: TProjectEntry[] = await db.projectEntries.where('start').between(start, end, true, true).toArray()

        const projectDurations = entries.reduce<Record<string, number>>((acc, entry) => {
            if (!acc[entry.projectId]) {
                acc[entry.projectId] = 0
            }

            const start = moment(entry.start)
            const end = moment(entry.end)
            const duration = moment.duration(end.diff(start))

            acc[entry.projectId] += duration.asMilliseconds()
            return acc
        }, {})

        const projects: TProject[] = await db.projects.where('id').anyOf(Object.keys(projectDurations)).toArray()

        // Combine project titles with durations
        return projects.map(project => {
            const durationHours = (projectDurations[project.id] || 0) / 1000 / 60 / 60
            const durationHoursRounded = Math.round(durationHours * 10) / 10

            return ({
                title: project.title,
                durationHours: durationHoursRounded
            })
        }
        )
    }, [start, end])

    return (
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <XAxis tick={{ fontSize: 8 }} // Change font size here
                    dataKey="title" angle={-90} textAnchor="end">
                </XAxis>
                <YAxis dataKey="durationHours">
                </YAxis>
                <Bar dataKey="durationHours" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ChartHoursPerProject
