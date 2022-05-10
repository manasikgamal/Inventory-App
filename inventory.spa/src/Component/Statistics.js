import React from 'react'
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Statistics() {
    const itemsstat=useSelector((state) => state.posts.itemstat)
    const number=useSelector((state) => state.posts.number)
    console.log("sts",itemsstat)
   const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const pieData = [
      {
         name: "Apple",
         value: 54.85
      },
      {
         name: "Samsung",
         value: 47.91
      },
      {
         name: "Redmi",
         value: 16.85
      },
      {
         name: "One Plus",
         value: 16.14
      },
      {
         name: "Others",
         value: 10.25
      },
      {
        name: "soso",
        value: 10.25
     },
     {
        name: "lolo",
        value: 10.25
     }
   ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
       return (
       <div
          className="custom-tooltip"
          style={{
             backgroundColor: "#ffff",
             padding: "5px",
             border: "1px solid #cccc"
          }}
       >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
       </div>
    );
 }
 return null;
};
  return (
    <div>
       {number&&<div>Number Of Users {number}</div>}
       {itemsstat&&(<PieChart width={730} height={300}>
    <Pie
       data={itemsstat}
       color="#000000"
       dataKey="value"
       nameKey="name"
       cx="50%"
       cy="50%"
       outerRadius={120}
       fill="#8884d8"
    >
       {itemsstat.map((entry, index) => (
          <Cell
             key={`cell-${index}`}
             fill={COLORS[index % COLORS.length]}
          />
       ))}
    </Pie>
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    </PieChart>
    )}
    </div>
  )
}
