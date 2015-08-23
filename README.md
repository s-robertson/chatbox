# Chatbox

Experimental chat client using Socket.io and Express. The idea is to create a Cbox-style chat service where visitors 
would be able to register for a new account and be given an embed code to place on their site. This is very much a 
personal side project that's a work in progress.

## Features

Currently, the features of the app include:

* The ability to access a specific chatbox by visiting /chatbox?boxId=\[ID]
* Session-based authentication. 
  * If env is set to "development" sessions are only stored in memory. With the "production" flag, sessions are stored 
  in the PostgreSQL database.
* Users are stored in the database, passwords are hashed and authenticated using bcrypt.
* Chatbox instances are stored in the database.
  
Wishlist of future features:

* Ability to register for a chatbox account.
* Ability to register and create new chatbox instances.
* Ability to administer chatbox instances.
* Anonymous user support.
