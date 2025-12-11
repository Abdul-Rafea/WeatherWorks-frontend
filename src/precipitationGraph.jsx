import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const graphData = [
    {time: '10AM', precipitation: 0},
    {time: '11AM', precipitation: 10},
    {time: '12PM', precipitation: 5},
    {time: '1PM', precipitation: 15},
    {time: '2PM', precipitation: 7},
    {time: '3PM', precipitation: 20},
    {time: '4PM', precipitation: 12},
    {time: '5PM', precipitation: 25},
];
const precipitaionGraph = () => {
    <ResponsiveContainer width="100%" height={300}>
        <lineChart data={graphData} margin= {{top: 5, right: 30, left: 20, bottom :5}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="time" stroke="#AAA" />
            <YAxis
                label = {{vale: 'Precipitaion', angle: -90, position: 'insideLeft', fill: '#AAA'}}
                domain = {[0,100]}
                stroke="#AAA"
            />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="precipitation"
                stroke= "#d1a04d"
                strokeWidth={3}
                dot= {false}
                activeDot= {{r:8}} 
            />
        </lineChart>
    </ResponsiveContainer>
}

export default precipitaionGraph;