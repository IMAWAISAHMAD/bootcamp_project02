import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import styles from './Chart.module.css';
import {Line,Bar} from 'react-chartjs-2';

const Chart = ({data:{confirmed,recovered,deaths},country}) => {
    const [dailyData,setDailyData] = useState({}); 
    useEffect(() => {
            const getDailyData = async () => {
            setDailyData(await fetchDailyData());
        }
        getDailyData();
    },[]);
    const lineChart = ( 
        dailyData.length?
        <Line
         data={{
             labels: dailyData.map(({date}) => date),
             datasets:[{
                 data:dailyData.map(({confirmed})=>confirmed),
                 label:'Infected',
                 borderColor: 'blue',
                 fill:true
             },
             {
                data:dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'red',
                fill:true    
             }]
         }}
        />:null
    );

   const barChart = (
       confirmed
       ?(
           <Bar 
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:[
                        'rgba(255,204,0,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)',
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:'true',text:`Current Situation in ${country}`}
            }}
           />
       ):null
   );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
export default Chart;