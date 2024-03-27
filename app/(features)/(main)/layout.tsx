'use client';

import PageContainer from '@/app/components/layout/page-container';

export default function TabsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageContainer>{children}</PageContainer>;
}
