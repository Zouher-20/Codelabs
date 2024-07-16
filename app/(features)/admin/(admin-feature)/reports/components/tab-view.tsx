import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { useState } from 'react';
import BlogsCommentTab from './tabs/blog-comment-tab';
import BlogsTab from './tabs/blog-tab';
import ClassTab from './tabs/class-tab';
import LabsCommentsTab from './tabs/labs-comment-tab';
import LabsTab from './tabs/labs-tab';
import UserTab from './tabs/user-tab';

const ReportsTabs = () => {
    const [activeTab, setActiveTab] = useState('Labs');
    const data = [
        {
            label: 'Labs',
            componenet: <LabsTab />
        },
        {
            label: 'Classes',
            componenet: <ClassTab />
        },
        {
            label: 'Blogs',
            componenet: <BlogsTab />
        },
        {
            label: 'Users',
            componenet: <UserTab />
        },
        {
            label: 'Labs Comments',
            componenet: <LabsCommentsTab />
        },
        {
            label: 'Blogs Comments',
            componenet: <BlogsCommentTab />
        }
    ];
    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="  rounded-none bg-transparent p-0"
                indicatorProps={{
                    className: 'bg-transparent shadow-none rounded-none '
                }}
                placeholder={undefined}
            >
                {data.map(({ label }) => (
                    <Tab
                        key={label}
                        value={label}
                        onClick={() => {
                            setActiveTab(label);
                        }}
                        className={`${activeTab === label ? 'rounded-xl bg-base-100  text-white ' : ''} font-bold`}
                        placeholder={undefined}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody placeholder={undefined}>
                {data.map(({ label, componenet }) => (
                    <TabPanel key={label} value={label}>
                        {componenet}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};
export default ReportsTabs;
