// src/components/UserStatsSection.tsx
import { StatsProps } from '@/app/private/types/stats';

const UserStatsSection = ({ email, workCount, reviewCount, courseCount, role }: StatsProps) => {
const getColor = (count: number) => {
    if (count <= 5) return 'text-red-500';
    if (count <= 10) return 'text-orange-500';
    return 'text-green-500';
};

const getActivityLevel = (count: number) => {
    if (count <= 5) return 'Low activity';
    if (count <= 10) return 'Moderate activity';
    return 'High activity';
};

return (
    <section className="space-y-4">
    <p>Email: <span className="text-white">{email}</span></p>
    <p>Role: <span className="text-blue-400 capitalize">{role}</span></p>
    <p>
        Number of work done: <span className={getColor(workCount)}>{workCount}</span>
        <span className="ml-2 text-xs text-gray-400">({getActivityLevel(workCount)})</span>
    </p>
    <p>
        Number of reviews done: <span className={getColor(reviewCount)}>{reviewCount}</span>
        <span className="ml-2 text-xs text-gray-400">({getActivityLevel(reviewCount)})</span>
    </p>
    <p>
        Number of following courses: <span className={getColor(courseCount)}>{courseCount}</span>
        <span className="ml-2 text-xs text-gray-400">({getActivityLevel(courseCount)})</span>
    </p>
    </section>
);
};

export default UserStatsSection;
