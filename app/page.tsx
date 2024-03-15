'use client';

import PageContainer from './components/layout/page-container';
import Button from './components/globals/form/button';

export default function Home() {

    const HandleClick = () => {
        console.log('hi');
    };

    return <PageContainer >
        <div className='p-8 grid gap-4'>
            <div className='flex gap-4'>
                <Button onClick={HandleClick} label='basic' style='basic' />
                <Button onClick={HandleClick} label='outline' style='outline' />
                <Button onClick={HandleClick} label='fill' style='fill' />
                <Button onClick={HandleClick} label='any' style='any' />
            </div>
        </div>
    </PageContainer>;
}
