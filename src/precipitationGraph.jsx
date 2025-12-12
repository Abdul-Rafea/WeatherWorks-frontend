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
function precipitaionGraph() {
    return(
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={graphData} margin= {{top: 0, right:20, left:-27, bottom :0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="time" stroke="#ffffff" />
                <YAxis
                    label = {{vale: 'Precipitaion', angle: -90, position: 'insideLeft', fill: '#ffffff'}}
                    domain = {[0,100]}
                    stroke="#ffffff"
                />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="precipitation"
                    stroke= "#d1a04d"
                    strokeWidth={5}
                    dot= {false}
                    activeDot= {{r:8}} 
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default precipitaionGraph;