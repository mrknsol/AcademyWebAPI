import Layout from './components/Layout';
import Login from './components/Login';
import CreateGroup from './components/MenuPages/Group/CreateGroup';
import ShowGroups from './components/MenuPages/Group/ShowGroups';
import Home from './components/MenuPages/Home';
import AddStudent  from './components/MenuPages/Student/AddStudent';
import  ShowStudents from './components/MenuPages/Student/ShowStudents';
import AddTeacher from './components/MenuPages/Teacher/AddTeacher';
import ShowTeachers from './components/MenuPages/Teacher/ShowTeachers';
import Registration from './components/Registration';

const studentElements = [
  {
    path: 'addStudent',
    element: <AddStudent />
  },
  {
    path: 'showStudents',
    element: <ShowStudents />
  }
]

const groupElements = [
  {
    path: 'createGroup',
    element: <CreateGroup />
  },
  {
    path: 'showGroups',
    element: <ShowGroups />
  }
]

const teacherElements = [
  {
    path: 'addTeacher',
    element: <AddTeacher />
  },
  {
    path: 'showTeachers',
    element: <ShowTeachers />
  }
]

const layoutChildren = [
  {
    path: 'home',
    element: <Home />
  },
  {
    path: 'student',
    children: studentElements
  },
  {
    path: 'teacher',
    children: teacherElements
  },
  {
    path: 'group',
    children: groupElements
  }
]


const routes = [
  {
    path: 'layout',
    element: <Layout />,
    children: layoutChildren
  },
  {
    path: 'registration',
    element: <Registration />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'login',
    element: <Login />
  }
];

export default routes;