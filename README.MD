# Node Five

In this lecture we talk about setting up authentication in our node / express server.

## Authentication

`Authentication` is the process of verifying that an individual, entity, or website are who they say they are.

When authenticating users in a web application, it's common practice to require some sort of username or email and password. Passwords are information that only the owner of the password should know so it's important we keep that data safe and secure.

### Why Authentication?

There are many different reasons why we would setup an authentcation process in our applications. We will use it whenever we want to create a unique experience for the user based off of their own personal information, whenever or servers need to know exactly who is accessing that data because different users will have different permissions to what data they can access, we also need to protect the user information.

There are two ways that we can go about setting up `authentication` into our web applications.

### Basic Authentication Built Into HTTP

This is a very simple way to set access restricitions for specific web resources.

Credentials are `encoded` and sent through the header of the http request.

![basic auth](images/basicauth.png)