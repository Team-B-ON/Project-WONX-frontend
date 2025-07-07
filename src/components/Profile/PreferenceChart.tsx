// import React, { useState } from 'react'
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
//   Sector,
// } from 'recharts'

// export interface PreferenceChartProps {
//   genreCounts?: Record<string, number>
// }

// const COLORS = ['#e50914', '#4181f6', '#fbbc04', '#34a853', '#ab47bc', '#ff6d01']
// const RADIAN = Math.PI / 180

// const renderLabel = ({ cx, cy, midAngle, outerRadius, index, name }: any) => {
//   const radius = outerRadius + 24
//   const x = cx + radius * Math.cos(-midAngle * RADIAN)
//   const y = cy + radius * Math.sin(-midAngle * RADIAN)
//   return (
//     <text
//       x={x}
//       y={y}
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline="central"
//       fill="#ffffff"
//       fontSize={15}
//     >
//       {`${index + 1}위: ${name}`}
//     </text>
//   )
// }

// const AnimatedActiveShape = (props: any) => {
//   const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, midAngle } = props
//   const OFFSET = 8
//   const xOff = OFFSET * Math.cos(-midAngle * RADIAN)
//   const yOff = OFFSET * Math.sin(-midAngle * RADIAN)
//   return (
//     <g style={{ transform: `translate(${xOff}px, ${yOff}px)`, transition: 'transform 0.25s ease' }}>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//         stroke="none"
//       />
//     </g>
//   )
// }

// const PreferenceChart: React.FC<PreferenceChartProps> = ({ genreCounts }) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null)

//   if (!genreCounts || Object.keys(genreCounts).length === 0) {
//     return (
//       <div className="h-40 flex items-center justify-center text-sm text-gray-500">데이터 없음</div>
//     )
//   }

//   const total = Object.values(genreCounts).reduce((a, b) => a + b, 0)
//   const data = Object.entries(genreCounts)
//     .map(([name, value]) => ({ name, value, percent: value / total }))
//     .sort((a, b) => b.value - a.value)

//   return (
//     <>
//       <style>{`
//         .pref-chart-wrapper svg:focus,
//         .pref-chart-wrapper *:focus { outline: none !important; }
//       `}</style>

//       <div className="pref-chart-wrapper w-full flex flex-col lg:flex-row items-center lg:items-start gap-8">
//         <div className="flex-1 h-64 lg:h-80 relative">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart margin={{ top: 30, bottom: 30 }} tabIndex={-1}>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius="45%"
//                 outerRadius="90%"
//                 isAnimationActive={false}
//                 activeIndex={activeIndex ?? undefined}
//                 activeShape={AnimatedActiveShape}
//                 labelLine={false}
//                 label={renderLabel}
//                 stroke="none"
//                 onMouseEnter={(_, idx) => setActiveIndex(idx)}
//                 onMouseLeave={() => setActiveIndex(null)}
//               >
//                 {data.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
//                 ))}
//               </Pie>
//               <Tooltip
//                 formatter={(val: number) => [`${val}편`, '']}
//                 labelFormatter={() => ''}
//                 separator=""
//                 contentStyle={{ background: '#fff', border: '1px solid #ddd', color: '#000' }}
//               />
//             </PieChart>
//           </ResponsiveContainer>

//           {data[0] && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//               <p className="text-sm text-gray-400">최애 장르</p>
//               <p className="text-lg font-semibold text-white">{data[0].name}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default PreferenceChart