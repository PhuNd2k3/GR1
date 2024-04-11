import { Box } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "./Chart.css";
import { useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Chart() {
    const [valueList, setValueList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const data = {
        labels,
        datasets: [
            {
                data: valueList,
                backgroundColor: "rgb(184, 149, 103)",
            },
        ],
    };

    const handleChangeValue = (value, x) => {
        setValueList((prev) => {
            prev[x - 1] = Number(value);

            return [...prev];
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
            }}
            p={5}
        >
            <Box p={10}>
                <table>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                    </tr>
                    {valueList.map((value, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    style={{
                                        width: "100%",
                                        outline: "none",
                                        border: "none",
                                        textAlign: "center",
                                    }}
                                    value={value}
                                    onChange={(e) =>
                                        handleChangeValue(
                                            e.target.value,
                                            index + 1
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </table>
            </Box>
            <Box sx={{ width: "800px", height: "500px" }}>
                <Bar options={options} data={data} />
            </Box>
        </Box>
    );
}
