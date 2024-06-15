
# Learning tracker

### Overview
This project is a tracker for group of users attending courses helping them to track and follow their progress on a course.
Project uses design patterns like Observer Stratedy and Factory.

### UML Diagram
![UML-Diagram](https://github.com/KarolPetka/learning-tracker/assets/60034422/ba4b915e-056f-4ee5-968b-09e1cfc98ad1)


### Prerequirements
Project uses Docker images and Docker Compose, so only thing that is needed is instaled docker on the machine.
### How to start
1. In a root directory run:
```
docker-compose up --build
```
This will result in creating and running both backend and frontend images.
Optionally `-d` can be applied to run as detached proccess.
2. Application should be available at `localhost:3000`.

Upon entering we should be able to see our application

### Examples
1. On right side we can see the used strategies rules.
<img width="535" alt="Screenshot 2024-06-15 at 23 49 12" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/b5cb0f74-827c-4b63-aaa6-e6c3bc1d3f99">

2. We can start with creating our course.
<img width="594" alt="Screenshot 2024-06-15 at 23 54 29" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/453ff669-0ef8-48f2-8d73-2fc0125090df">

3. Then we can create user.
<img width="350" alt="Screenshot 2024-06-15 at 23 55 31" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/45d8c29f-bbdf-480c-aba2-43cd93db1716">

4. Now we can assign user to course.
<img width="600" alt="Screenshot 2024-06-15 at 23 56 59" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/1e9197d1-39b3-40cb-b782-7fc64b140c59">

5. We can now update course progress.
<img width="613" alt="Screenshot 2024-06-15 at 23 59 12" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/ef498bbf-e304-4848-a9c4-65f59713f3e1">


This will result in notification being send for all course observers (users)
<img width="1728" alt="Screenshot 2024-06-15 at 23 58 05" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/0e5ab132-c72b-48f0-8d2f-e57669ef57ca">


6. We can now update our course name.
<img width="626" alt="Screenshot 2024-06-16 at 00 02 04" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/c0c70b4e-721d-4c53-82db-bd86320057de">


7. At the and we can also delte selcted course.
<img width="406" alt="Screenshot 2024-06-16 at 00 02 37" src="https://github.com/KarolPetka/learning-tracker/assets/60034422/99573f50-861a-48b9-b4b1-a692bf6a04c4">

