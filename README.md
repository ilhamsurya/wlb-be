# WLB-BE-ASSIGMENT

## Problem Description

* Requirements:
  * [✓] Registration & login features, registration need to be validated by email verification and user status changed from "REGISTERED" to "ACTIVATED"
  * [✓] User can create, edit or delete a post
  * [✓] Registered user can comment in a post, and another user can comment in the user comment. with the depth of 1 comment each
  * [✓] Registered user can like a post 
  * [ ] Notification when other user like or comment in our post, notification will be delivered by email
  * [✓] Search post by title
  * [✓] Filter post by date,user,comment count,like as ascending & descending
  * [✓] Every API Request will be saved in mongodb as log, the log will contain endpoint path, user detail, duration access, request, response and timestamp
  * [✓] Fully documented API using postman or insomnia
---

## Prerequisites to run the application

* Development
  * Node JS v 14.17.4 [installation]([stackoverflow.com/questions/37405528/ddg#38909715](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04))
  * PostgreSQL [installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
  * Koa JS Starting Template [installation](https://github.com/tonyghiani/create-koa-application)
  * Sequelize :
    >   `npm install --save-dev sequelize-cli`

---
## API Documentation
More about API Implementation, explained in postman collection:
[API Documentation](https://documenter.getpostman.com/view/8882188/Uyxogiew)

---

## Run Application

* Application
  * Start Application :
    >   `npm run`
  * Start Application (in development) :
    >   `npm run dev`

* Deployment
  * Heroku Link :
    >   `https://hidden-depths-81497.herokuapp.com/users`
