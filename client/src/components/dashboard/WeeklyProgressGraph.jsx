import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

const courseData = [
  { course: "CHEM101", completed: 90, color: "#3b82f6" }, // blue
  { course: "ENG102", completed: 48, color: "#10b981" },  // green
  { course: "MATH201", completed: 63, color: "#f59e0b" }, // amber
  { course: "PSYCH101", completed: 25, color: "#8b5cf6" }, // purple
  { course: "CS301", completed: 93, color: "#ef4444" },   // red
];

// Custom bar that draws a light "full height" background + the actual filled bar
function TintedBar(props) {
  const { x, y, width, height, payload, background } = props;

  // background is provided when Bar has the `background` prop
  const bg = background?.y != null
    ? { x: background.x, y: background.y, width: background.width, height: background.height }
    : null;

  const color = payload?.color ?? "#9ca3af";

  return (
    <g>
      {/* full height tinted background */}
      {bg && (
        <rect
          x={bg.x}
          y={bg.y}
          width={bg.width}
          height={bg.height}
          rx={8}
          ry={8}
          fill={color}
          opacity={0.18}
        />
      )}

      {/* actual filled bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill={color}
      />
    </g>
  );
}

export default function WeeklyProgressGraph() {
  return (
    <div className="bg-white rounded-xl border border-gray-100/50 p-4 mb-5">
      <h4 className="text-lg font-bold text-black-700 mb-5">Task Completion by Course</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={courseData}
          margin={{ top: 5, right: 5, left: -20 }}
          barCategoryGap={"25%"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="course"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 13 }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Bar
            dataKey="completed"
            fill="#e5e7eb"
            radius={[4, 4, 0, 0]}
            shape={<TintedBar />}
            
          >
            <LabelList
              dataKey={"completed"}
              position={"top"}
              formatter={(v) => `${v}%`}
              style={{ fontSize: 15, fill: "#111827", fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}