# JanUs

## Introduction

Welcome to the new way to create groups for online learning. With Janus a teacher is able to easily create a new course that their students are able to join and than assign those students to groups. This provides a faster and easier experience for both the teacher and the students.

### Main Features

The main features include:

- Separate student and teacher registration.
- Individual course pages that display all students in the course along with the groups that student is assigned to.
- Teacher only group page to assign students to a particular group
- Group specific chatroom for only the assigned students.

Come give JanUs a try to [janus.surge.sh](https://janus.surge.sh/)

---

## How it works

1. Register as a teacher or a student.

### Teacher Access

2. Create a new course.

   - As a teacher, you can create a new course with a course code that you can give to your students.

3. Create groups for students.

   - Each course allows the teacher to create groups that students can be assigned to.

4. Assign students to a course.

   - Once a groups is created, you can go to that group and assign the students to the group.

### Student Access

2. Add course to dashboard.

   - As a student, you will be able to add a course based on the course id given by the teacher.

3. Go to course.

   - Once a course is added the student will be able to see the other students that are in the course, and the groups that the student is assigned to.

4. Go to assigned group chat.

   - The student will than be able to go to their assigned group chat and message the other students in their group.

---

Example of student group chat.

![Gif of group chat](groupChat.gif)

---

## Technologies Used

Janus Was built using a variety of technologies. The front-end of the site is made with React that integrates a third-party api and a custom api to interacts with a PostgreSQL database. To create the back-end of the site Express.js was used to make the endpoints that connected to the third-party api and the custom api.
