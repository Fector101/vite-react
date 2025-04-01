import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { ChartsAxisContentProps } from '@mui/x-charts';

import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function MyBarChart({ card_width,students,votes }: { card_width: number,students:string[],votes:number[] }) {

    const CustomTooltip = (props: ChartsAxisContentProps) => {
        const { axisValue, dataIndex, series } = props;

        if (axisValue === null || dataIndex === undefined || dataIndex === null) {
            return null;
        }
        const studentName = axisValue.toString();
        const voteCount = series[0].data[dataIndex]?.toString();

        return (
            <div style={{
                padding: '12px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                fontSize: '14px',
                minWidth: '160px',
                fontFamily: 'sans-serif'
            }}>
                <div>Option: {studentName}</div>
                <div>Votes: {voteCount} votes</div>
            </div>
        );
    };

    const chartSetting: BarChartProps = {
        xAxis: [
            {
                id: 'barCategories',
                data: students,
                scaleType: 'band',
            }
        ],
        grid: { horizontal: true, vertical: true },
        series: [
            {
                data: votes,
                label: 'Votes',
                color: '#02B2AF',
            },
        ],
        width: card_width> 20?card_width-20:card_width ,
        height: 300,
        slots: {
            axisContent: CustomTooltip,
        },
        sx: {
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
            [`& .${chartsGridClasses.line}`]: { opacity: .3, strokeDasharray: '5 3', strokeWidth: 2 },
        }
    };

    return <BarChart {...chartSetting} />
}