# Vocabulary Learning Website (API-Based)

This is an **API-based Vocabulary Learning Website**.  
Through this project, my goal is to learn how to fetch data from an API and manage that data to build a **readable and attractive** website.  Also, there's a **Quiz Section**, which is the most interesting and challenging part of this project.  

⚠️ As this is an API-based website, please make sure you have a stable internet connection.

## API List
As I'm currently doing **Programming Hero's** Web Development Course, this API is provided by them for **learning/building** this project. Actually, this Vocabulary Website is an **assignment** for the course.

1. **Get All Levels:**  
   `https://openapi.programming-hero.com/api/levels/all`
2. **Get Words by Level ID:**  
   `https://openapi.programming-hero.com/api/level/{id}`
3. **Get Word Details:**  
   `https://openapi.programming-hero.com/api/word/{id}`
4. **Get All Words:**  
   `https://openapi.programming-hero.com/api/words/all`

## Features

### 1. Login / Logout Functionality
- When visiting the website, you'll only see the **login banner**.
- Use any **Username** (must not be blank) and the **Password:** `darpan123456`.
- Once logged in, the banner is hidden and other sections become visible (done using a proper combination of `display: block` & `display: none`)
- **Local Storage** is used to save login/logout status.
- **SweetAlert** is used to show login related messages.

### 2. Everything is Created Dynamically Through the API
- **Lesson buttons** are generated dynamically based on how many lessons the API provides.
- The number of **Word Cards** generated depends entirely on the number of words received from the API

### 3. Word Card Features

Every Word Card Has Two Icons **More Info** (left) and **Pronounce** (right).

- Clicking the **More Info** button opens a modal where you’ll find more details about the word (meaning, example, synonyms).

- Clicking the **Pronounce button** triggers the pronunciation of the word.

### 4. Smart Handling of Undefined / Null Values
- If a word doesn't have a Bangla meaning or synonyms, a meaningful message like “অর্থ নেই” is shown instead.
- For Lesson 6 and Lesson 7, the API doesn’t provide any data. So, I display a message like-
    
    `“এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।”`
- If no lesson is selected after loading, it shows-  
  `“আপনি এখনো কোন Lesson Select করেননি।”`

### 5. Loading Status
- A loading indicator is shown while fetching data from the API.

### 6. Smooth Scroll
- When you click the **Learn** or **FAQ** buttons, it takes you directly to the respective sections using smooth scrolling.

### 7. Fully Mobile Responsive
Fully Mobile Responsive Website
(But I recommend using a computer for a better experience.)

### 8. Quiz Section (Most Interesting!)
This section is designed to test your vocabulary.It’s **not** a **Static, Fixed Question** quiz. Each time you click Next, it randomly picks a word from the API and asks for its meaning. I’ve explained about `Quiz Section` in detail in the **Challenge section**.

## Tools & Languages Used

- HTML  
- CSS  
- Tailwind CSS (with DaisyUI)  
- SweetAlert  
- JavaScript (Vanilla)

## Steps to Build

As it’s a full website, there are a lot of small components or functionalities that needed to be built separately to achieve the final result.So, I planned to divide my entire work into small parts and noted them down.Then, I completed the project step by step according to my plan.

## Challenges

The most interesting and time-consuming part was building the **Quiz functionality**.

### Logic Behind the Quiz:
The API I used includes about 170 unique words with full details.But not all words have meanings.So, to filter those that do, I used:

`quizWords.data.filter(word => word.meaning);`

After filtering, I got 164 words with meanings.When someone starts the quiz and clicks Next, a random question is generated like:

`“What is the meaning of [unique-word]?”`

And It also collect one correct option (the actual meaning of that word) and three other random options selected from the remaining 163 words.

The correct answer is randomly placed among the four options using:

`randomCorrectOpt = Math.floor(Math.random() * 4);`

Please check my `quiz.js` file on GitHub.You can easily understand the logic I used.

## Note...

- As this is an API-based website, please make sure you have a good internet connection.

- I'm still learning web development. I recently finished Intermediate Level JavaScript.Within a few days, I’ll start React JS, and then move to backend (Node.js).So, the login/logout functionality in this project is frontend only.