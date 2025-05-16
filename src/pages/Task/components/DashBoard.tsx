import { memo } from "react";

interface DashboardProps {
    dashboardData: {
        totalTasks: number;
        totalDays: number;
        totalHours: number;
    };
}
function DashBoard({ dashboardData }: DashboardProps) {
    const { totalTasks, totalDays, totalHours } = dashboardData;

    return (
        <div className="flex items-center gap-4 pt-4 pb-20">
            <div className="border px-10 py-3 flex flex-col justify-center items-center">
                <p>Total Tasks</p>
                <p className="font-bold text-2xl">{totalTasks}</p>
            </div>
            <div className="border px-10 py-3 flex flex-col justify-center items-center">
                <p>Total Days</p>
                <p className="font-bold text-2xl">{totalDays}</p>
            </div>
            <div className="border px-10 py-3 flex flex-col justify-center items-center">
                <p>Total Hours</p>
                <p className="font-bold text-2xl">{totalHours}</p>
            </div>
        </div>
    );
}

export default memo(DashBoard);
