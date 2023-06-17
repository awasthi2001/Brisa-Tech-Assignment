import {Routes,Route} from 'react-router-dom'
import { GitHubIssuesPage } from '../Pages/GitHubIssuesPage'
import { SingleIssue } from '../Pages/SingleIssue'
import NotFound from './NotFound'

export function AllRoutes(){


    return (
        <Routes>
          <Route path='/' element={<GitHubIssuesPage/>}></Route>
          <Route path='/issue/:id' element={<SingleIssue/>}></Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}