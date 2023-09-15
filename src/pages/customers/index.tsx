import { SideBar } from '@/components'
import UserList from '@/components/customer/UserList'
import React from 'react'

export default function index() {
  return (
 <SideBar>
     <div>
        <UserList />
    </div>
 </SideBar>
  )
}
