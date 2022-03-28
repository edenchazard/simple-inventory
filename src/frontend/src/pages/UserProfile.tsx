import { useContext, useState } from "react";
import TimezoneSelect, { ITimezone } from "react-timezone-select";
import { UserContext } from "../hooks";

export default function UserProfile(){
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );

    const user = useContext(UserContext);

    function updateTimezone(newTimezone){
        console.log(newTimezone)
        setSelectedTimezone(newTimezone);
    }
//justify-between
    return (
        <div>
            <div className='flex items-center'>
                <label htmlFor='first-name'>First name:</label> {user.first_name} 
            </div>
            <div className='flex items-center'>
                <label htmlFor='last-name'>Last name:</label> {user.last_name}
            </div>
            <div className='flex items-center'>
                <label htmlFor='timezone'>Timezone:</label>{user.timezone}
            </div>
        </div>
    )
}

/*<div className='flex items-center'>
                <label htmlFor='first-name'>First name:</label>
                <input type='text' id='first-name' value={user.first_name} 
                    className="text-black"/>
            </div>
            <div className='flex items-center'>
                <label htmlFor='last-name'>Last name:</label>
                <input type='text' id='last-name' value={user.last_name} 
                    className="text-black"/>
            </div>
            <div className='flex items-center'>
                <label htmlFor='timezone'>Timezone:</label>
            </div>
                <TimezoneSelect
                    id="timezone"
                    className="text-black"
                    value={selectedTimezone}
                    onChange={updateTimezone} />*/