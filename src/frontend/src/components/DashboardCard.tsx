import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./DashboardCard.css";

export default function Card({number, icon, description}){
    return (
        <div className="flex w-80 items-center bg-slate-900 m-4 p-3 rounded-md dashboard-icon">
            <div className="flex-none divide-y divide-blue-200 divide-solid">
                <FontAwesomeIcon icon={icon} className="icon" />
            </div>
            <div className="flex-auto w-24 text-center text-3xl">
                {number}
            </div>
            <div className="flex-auto w-72">
                {description}
            </div>
        </div>
    )
}