import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

function precipitaionGraph(props) {
    const graphData = props.precipData
    return(
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={graphData} margin= {{top: 0, right:20, left:-27, bottom :0}}>
                <CartesianGrid strokeDasharray="3" stroke="#555" />
                <XAxis dataKey="time" stroke="#ffffff" />
                <YAxis
                    label = {{value: 'Precip', angle: -90, position: 'insideLeft', fill: '#ffffff'}}
                    domain = {[0, 'auto']}
                    stroke="#ffffff"
                />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="precip"
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