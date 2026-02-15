import { demoUsers } from '../model/demoUsers'
import { DemoProfilesListItem } from './DemoProfilesListItem'

export const DemoProfilesList = () => {
  return (
    <div>
      <ul>
        {demoUsers?.map((user) => {
          return <DemoProfilesListItem userData={user} key={user.id} />
        })}
      </ul>
    </div>
  )
}