'use client';
import { planType } from '@/app/@types/plan';
import { getPlan } from '@/app/api/(modules)/admin/plan/service/action';
import PlanCard from '@/app/components/cards/plan-card';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Plans = ({ params }: { params: { id: string } }) => {
    const [plans, setCurrentPlans] = useState<Array<planType>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPlanFromServer();
    }, []);

    const getPlanFromServer = async () => {
        setError(null);
        setLoading(true);
        try {
            const plans = await getPlan();
            setCurrentPlans(plans as unknown as Array<planType>);
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col gap-4 p-6">
            <h1 className=" text-4xl font-bold text-white">Plan</h1>
            <div className="flex flex-col gap-4 pt-4 max-xl:justify-center sm:grid sm:grid-cols-2 xl:flex xl:flex-row">
                <ManageState
                    error={error}
                    empty={plans.length == 0}
                    errorAndEmptyCallback={() => {}}
                    loadedState={plans.map((e, index) => (
                        <PlanCard
                            key={index}
                            plan={e}
                            active={params.id == e.id ? true : false}
                            isAdmin={false}
                        />
                    ))}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Plans;
