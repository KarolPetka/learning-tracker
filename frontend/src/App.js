import React, {useState, useEffect} from 'react';

function CourseApp() {
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [newStrategy, setNewStrategy] = useState('');
    const [updatedProgressCourse, setUpdatedProgressCourse] = useState('');
    const [updatedCourse, setUpdatedCourse] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [progress, setProgress] = useState('');
    const [userName, setUserName] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [assignedCourse, setAssignedCourse] = useState('');
    const [updatedCourseName, setUpdatedCourseName] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchUsers();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8080/courses');
            const data = await response.json();
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                console.error('Invalid data format for courses:', data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/courses/users');
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Invalid data format for users:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addCourse = async () => {
        try {
            await fetch('http://localhost:8080/courses/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    courseName: newCourse,
                    strategyName: newStrategy,
                }),
            });
            fetchCourses();
            setNewCourse('');
            setNewStrategy('');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const addUser = async () => {
        try {
            await fetch('http://localhost:8080/courses/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userName: userName,
                }),
            });
            fetchUsers();
            setUserName('')
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const assignUserToCourse = async () => {
        try {
            await fetch(`http://localhost:8080/courses/${assignedCourse}/assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userName: assignedUser,
                }),
            });
            fetchCourses();
            setAssignedUser('')
            setAssignedCourse('')
        } catch (error) {
            console.error('Error assigning user to course:', error);
        }
    };

    const updateProgress = async () => {
        try {
            const response = await fetch(`http://localhost:8080/courses/${updatedProgressCourse}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    progress: progress,
                }),
            });

            if (response.ok) {
                const notifications = await response.json();
                notifications.forEach(notification => {
                    alert(notification);
                });
                fetchCourses();
                setProgress('');
            } else {
                console.error('Failed to update progress:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const updateCourse = async () => {
        try {
            const params = new URLSearchParams();
            params.append('newName', updatedCourseName);

            await fetch(`http://localhost:8080/courses/${updatedCourse}?${params.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            fetchCourses();
            setUpdatedCourse('')
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };


    const deleteCourse = async () => {
        try {
            await fetch(`http://localhost:8080/courses/${selectedCourse}`, {
                method: 'DELETE',
            });
            fetchCourses();
            setSelectedCourse('')
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <div style={{
                height: "100%",
                margin: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 style={{margin: 0}}>Learning Tracker</h1>
            </div>
            <div style={{
                height: "100%",
                width: "50%",
                position: "fixed",
                overflowX: "hidden",
                paddingTop: "20px",
                left: "0",
            }}>
                <h2>Courses</h2>
                <ul>
                    {courses.map(course => (
                        <li key={course.name}>
                            <strong>Name:</strong> {course.name},
                            <strong> Progress:</strong> {course.progress},
                            <strong> Observers:</strong> {course.observers.join(', ')},
                            <strong> Strategy:</strong> {course.strategy === 'PercentageBaseProgressStrategy' ? 'Percent' : 'Time'}
                        </li>
                    ))}
                </ul>
                <div>
                    <h2>Add Course</h2>
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={newCourse}
                        onChange={e => setNewCourse(e.target.value)}
                    />
                    <select value={newStrategy} onChange={e => setNewStrategy(e.target.value)}>
                        <option value="">Select Strategy</option>
                        <option value="percent">Percentage</option>
                        <option value="time">Time</option>
                    </select>
                    <button onClick={addCourse}>Add Course</button>
                </div>
                <div>
                    <h2>Update Progress</h2>
                    <input
                        type="number"
                        placeholder="Progress"
                        value={progress}
                        onChange={e => setProgress(e.target.value)}
                    />
                    <select value={updatedProgressCourse} onChange={e => setUpdatedProgressCourse(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.name} value={course.name}>{course.name}</option>
                        ))}
                    </select>
                    <button onClick={updateProgress}>Update Progress</button>
                </div>
                <div>
                    <h2>Update Course</h2>
                    <input
                        type="text"
                        placeholder="Updated Course Name"
                        value={updatedCourseName}
                        onChange={e => setUpdatedCourseName(e.target.value)}
                    />
                    <select value={updatedCourse} onChange={e => setUpdatedCourse(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.name} value={course.name}>{course.name}</option>
                        ))}
                    </select>
                    <button onClick={updateCourse}>Update Course</button>
                </div>
                <div>
                    <h2>Delete Course</h2>
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.name} value={course.name}>{course.name}</option>
                        ))}
                    </select>
                    <button onClick={deleteCourse}>Delete Course</button>
                </div>
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user}>
                            {user}
                        </li>
                    ))}
                </ul>
                <div>
                    <h2>Add User</h2>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <button onClick={addUser}>Add User</button>
                </div>
                <div>
                    <h2>Assign User to Course</h2>
                    <select value={assignedUser} onChange={e => setAssignedUser(e.target.value)}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                    <select value={assignedCourse} onChange={e => setAssignedCourse(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.name} value={course.name}>{course.name}</option>
                        ))}
                    </select>
                    <button onClick={assignUserToCourse}>Assign User to Course</button>
                </div>
            </div>
            <div style={{
                height: "100%",
                width: "50%",
                position: "fixed",
                overflowX: "hidden",
                paddingTop: "20px",
                right: "0",
            }}>
                <h2>Percent Strategy explanation:</h2>
                <ul>
                    <li>If course progress value is less then 25:
                        <ul>
                            <li>Course member level is <strong>Beginner</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more then 25 but less then 50:
                        <ul>
                            <li>Course member level is <strong>Intermediate</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more then 50 but less then 75:
                        <ul>
                            <li>Course member level is <strong>Advanced</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more 75:
                        <ul>
                            <li>Course member level is <strong>Expert</strong></li>
                        </ul>
                    </li>
                </ul>
                <h2>Time Strategy explanation:</h2>
                <ul>
                    <li>If course progress value is less then 100:
                        <ul>
                            <li>Course member level is <strong>Beginner</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more then 100 but less then 500:
                        <ul>
                            <li>Course member level is <strong>Intermediate</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more then 500 but less then 1000:
                        <ul>
                            <li>Course member level is <strong>Advanced</strong></li>
                        </ul>
                    </li>
                    <li>If course progress value is more 1000:
                        <ul>
                            <li>Course member level is <strong>Expert</strong></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <CourseApp/>
        </div>
    );
}

export default App;
