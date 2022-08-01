import '../styles/App.css';
import { useState } from 'react';
import {Helmet} from 'react-helmet';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import StudentRegisterForm from './StudentRegisterForm';
import TeacherRegisterForm from './TeacherRegisterForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import AddCourseForm from './AddCourseForm';
import Course from './Course';
import CreateGroupForm from './CreateGroupForm';
import Group from './Group';
import GroupChat from './GroupChat';
import UserContext from './UserContext';


function App() {

  const [user, setUser] = useState()

  return (
    <div className="App">
      <Helmet>
        <link href="../styles/dist/output.css"/>
      </Helmet>
      <BrowserRouter>
        <UserContext.Provider value={{setUser}}>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path='/register/student' element={<StudentRegisterForm/>} />
            <Route exact path='/register/teacher' element={<TeacherRegisterForm/>} />
            <Route exact path='/login' element={<LoginForm/>} />
            <Route exact path="/users/:username" element={<Dashboard/>} />
            <Route exact path='/courses/create-course' element={<AddCourseForm/>} />
            <Route exact path="/courses/:courseId" element={<Course/>} />
            <Route exact path='/groups/create' element={<CreateGroupForm/>} />
            <Route exact path="/groups/:guid" element={<Group/>} />
            <Route exact path='/groups/:courseId/chat' element={<GroupChat/>} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
