import {Routes,Route} from 'react-router-dom'
import { GitHubIssuesPage } from '../Pages/GitHubIssuesPage'
import NotFound from './NotFound'

export function AllRoutes(){


    return (
        <Routes>
          <Route path='/' element={<GitHubIssuesPage/>}></Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}