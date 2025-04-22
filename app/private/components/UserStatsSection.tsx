import { StatsProps } from '@/app/private/types/stats';

const UserStatsSection = ({
    email,
    submissionCount,
    reviewCount,
    trainingCount,
    role,
}: StatsProps) => {
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
                Number of submissions done: <span className={getColor(submissionCount)}>{submissionCount}</span>
                <span className="ml-2 text-xs text-gray-400">({getActivityLevel(submissionCount)})</span>
            </p>
            <p>
                Number of reviews done: <span className={getColor(reviewCount)}>{reviewCount}</span>
                <span className="ml-2 text-xs text-gray-400">({getActivityLevel(reviewCount)})</span>
            </p>
            <p>
                Number of trainings followed: <span className={getColor(trainingCount)}>{trainingCount}</span>
                <span className="ml-2 text-xs text-gray-400">({getActivityLevel(trainingCount)})</span>
            </p>
        </section>
    );
};

export default UserStatsSection;