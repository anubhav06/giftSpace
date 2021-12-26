# Gift Space
<a href="https://ibb.co/h2Nz6Xh"><img src="https://i.ibb.co/CVyGcJN/1.png" alt="1" border="0"></a>
## Installation

### Installing Backend
1. Install [Python](https://www.python.org/)
2. Run `pip install requirements.txt` to install the dependencies
3. Run `python manage.py migrate` to migrate the database
4. Run `python manage.py runserver` to start the server

### Installing Frontend
1. Download [NPM and NodeJS](https://nodejs.org/en/download/)
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server


## Inspiration
Managing and keeping track of all the gifts you plan to buy and which you have already bought, while not exceeding your budget is a big task during the holiday season.  
Here comes [GiftSpace](https://www.gift-space.co/), where you can keep track of all the gifts you wish to buy along with the budget. Also you can keep track of the gifts which you have sent to deliver while sharing the tracking details with the recipient.

## What it does
Login to set your budget from which you wish to buy gifts during the holiday season. Add details about your gifts which you wish to buy for someone. The expenses graph updates accordingly and shows your spend amount along with what amount you spent where in a smart-graphical form.   
Also, there is a gifts tracker, where you can add details of your already purchased gifts along with the tracking number. Then you have an option to send the recipient a text SMS about the package details.
All these features can help us in managing our gifts during the holiday season!

## How we built it ⚙️

- The backend is built using Django. We built appropriate users, gifts and tracking models which stored the relevant information. All this information was served to the frontend using API Calls. Django Rest Framework was used in serializing the API.
- The frontend is built using ReactJS. It fetched API calls to get data from the backend and serve the relevant information to the user. React-charts were used to build the 3D graphs. 
- The user authentication was handled with JWT (JSON web tokens)
- Twilio's SMS API is used to send text messages to the requested user with the appropriate data
- The backend was hosted on Heroku, while the frontend was hosted on Vercel, while the domain name was purchased from GoDaddy(through porkbun)

## Challenges we ran into 
- Using Twilio's SMS API for the first time
- Dynamically updating gifts data from the frontend
- We  had some trouble integrating the front-end and the back-end.
-  Responsiveness 

## Accomplishments that we're proud of 💪🏻
- We were able to build a complete web app
- Working for the first time with each other as a team
- Used Twilio's SMS API for the first time
- Bought a domain name for the first time and linking it with our hosted app at Vercel

## What we learned 📖
- Collaborating with others during a hackathon
- Using Twilio's SMS API
- Hosting web app's on Heroku, Vercel and buying domain name from porkbun(GoDaddy)
- Working with Django and Django Rest Framework
- Working with ReactJS 

## What's next for Gift Space ⏫
- Better designing, styling, responsiveness
- Adding send email/whatsapp message as well to the package tracker page
- And many more ...

## Team 💪🏻

1. Anubhav Gupta [@anubhav06](https://github.com/anubhav06) <br>
2. Shreyas Pahune [@shreyazz](https://github.com/shreyazz)

