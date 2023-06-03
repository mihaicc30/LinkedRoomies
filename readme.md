
# Welcome to LinkedRoomies GitHub!

  
|Project:|LinkedRoomies |
|---------------------|-------------------------------|
|Student:|10148467 |
|Live:|[-Link-](https://linkroomie.web.app)| |

  
**Testing Accounts**

> Admin

Username: admin@admin.admin
Password: admin@admin.admin
  
  > Student

Username: alemihai25@gmail.com
Password: alemihai25@gmail.com
But please feel free to create your own account as a student. Email verification is not enabled on purpose and you can use GMail / Facebok / Email&Password to create / login to an account!


**LinkedRoomies** is a dynamic web application that is built using the latest technologies, including React, Vite, Tailwind CSS, and Firebase. The aim of this project is to provide an efficient and reliable solution for university students who are searching for suitable accommodation and compatible roommates.

By using LinkedRoomies, students can easily browse through a range of options for accommodation and connect with other students who are looking for a compatible roommate. The app simplifies the process of finding a roommate who shares similar interests, habits, and preferences, making it easy to find a comfortable and welcoming living space.

The app is built using React, a popular JavaScript library for building user interfaces. Vite is used as a build tool and development server, which allows for fast and efficient development. Tailwind CSS is used for styling the app, providing a modern and responsive design that is optimized for all devices.

Firebase is used for the backend, providing features such as authentication, real-time database, and storage. This allows for secure and reliable data storage and retrieval, as well as easy integration with other Firebase products.

Overall, LinkedRoomies provides an all-in-one solution for university students who are looking for suitable accommodation and compatible roommates. With its modern design and user-friendly interface, it offers a seamless experience for users, simplifying the process of finding the perfect living space.

## Installation

Clone this repository: **git clone https://github.com/mihaicc30/LinkedRoomies.git**

Navigate to the project directory: **cd LinkedRoomies**

Install the necessary dependencies: **npm install**


Create a file named ".env" and paste the following env variables:
|   |
| :--------------------- |
|VITE_API_KEY=AIzaSyDKArkX1EuHeIHQ65pt_DdBTy4xv4YLeyk|
|VITE_AUTH_DOMAIN=linkroomie.firebaseapp.com|
|VITE_PROJECT_ID=linkroomie|
|VITE_STORAGE_BUCKET=linkroomie.appspot.com|
|VITE_MESSAGING_SENDER_ID=893976725172|
|VITE_APP_ID=1:893976725172:web:e71a87aa4edc7c53e839e1|
|VITE_MEASUREMENT_ID=G-9PLSXMVL7J|
  

Start the development server: **npm run dev**

**Note***
You need to start the development server using Vite's start command as shown


## Features

1. User authentication: allowing users to create an account, log in, and manage their profile.

2. Roommate matching: using a matching algorithm to suggest compatible roommates based on interests, habits, and preferences.

3. Property search: allowing users to browse and search for available accommodation based on various criteria, such as location and amenities.

4. Messaging: enabling users to communicate with admins within the app.

## Technologies Used

1.  **React:** a popular front-end JavaScript library for building user interfaces.

2.  **Vite:** a build tool that allows for fast development and build times.

3.  **Tailwind CSS:** a utility-first CSS framework that makes it easy to create responsive and customizable user interfaces.

4.  **Firebase:** a platform for building web and mobile applications that provides backend services such as authentication, database, and storage.

## User Types and functions

| Types of user | Actions
|---------------------|-------------------------------|
|Admin |CRUD Students/Rooms/Messages/Profile |
|Student |CRUD Profile, Join/Leave Room, Enquiries, Reviews |

## Data Flow Chart

```mermaid
graph TD
A(Login Submit) --> B(Get User Type)
B --> C(Grab Navigation bar for type of user)
C --> D(Set Navigation bar for admin)
C --> E(Set Navigation bar for student)
D --> G(Display Landing Page)
E --> G(Display Landing Page)
```