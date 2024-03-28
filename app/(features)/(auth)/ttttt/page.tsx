import { authOptions } from '@/app/api/core/manager/auth-options';
import { getServerSession } from 'next-auth';

const page = async () => {
    const se = await getServerSession(authOptions);
    console.log('sssssssssssssssssssssssssssssssss');
    console.log('sssssssssssssssssssssssssssssssss');
    console.log('sssssssssssssssssssssssssssssssss');
    console.log('sssssssssssssssssssssssssssssssss');
    console.log(se);
    console.log('sssssssssssssssssssssssssssssssss');
    console.log('sssssssssssssssssssssssssssssssss');
    console.log('sssssssssssssssssssssssssssssssss');

    return <div> welcome to user </div>;
};
export default page;
//TODO ///////////logout//////////
// to make logout please make this ==>

// import {singOut} from 'next-auth/react';

// in function onSibmite inside the button  make this

// singOut({  redirect : true  ,callbackUrl:${window,location.oragin}/login});
