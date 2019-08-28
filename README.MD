# Node Five

In this lecture we talk about setting up authentication in our node / express server.

## Authentication

`Authentication` is the process of verifying that an individual, entity, or website are who they say they are.

When authenticating users in a web application, it's common practice to require some sort of username or email and password. Passwords are information that only the owner of the password should know so it's important we keep that data safe and secure.

### Why Authentication?

There are many different reasons why we would setup an authentcation process in our applications. We will use it whenever we want to create a unique experience for the user based off of their own personal information, whenever or servers need to know exactly who is accessing that data because different users will have different permissions to what data they can access, we also need to protect the user information.

There are two ways that we can go about setting up `authentication` into our web applications.

### Basic Authentication Built Into HTTP

Basic authentication is an authentication scheme that's built into http requests. This is a very simple way to set access restricitions for specific web resources.

Credentials are `encoded` and sent through the header of the http request.

![basic auth](images/basicauth.png)

`encoding` is where we transform data into another format using a publicly available scheme and is easily reversible. All you need to decode the encoding is by using the algorithim used to encode it.

![encoding](images/encoding.png)

Basic authentication provides no confidentiality to the transmitted credentials, so if someone were to intercept the transmitted data, it would be insanely easy to decode.

This is great for sending API keys for example.

### Form Based Authentication

This is the most common form of authentication that you will see over the web. This is where a user will enter their credentials into a form on your site and those credentials will be sent through the `body` of the request.

Anytime we are sending personal data like credentials or payment information, we want to make sure the info is being sent over with an `https` request.

We need make sure we are using `https` with basic and form authentication. Https will provide `encryption` to our request.

`Encryption` will transform the data being sent with the goal of keeping things secret. 

The data being sent will be encrypted with an ecryption algorithim and will be provided a key. This will transform the data into `ciphertext`.

Ciphertext can only be decrypted with the encryption algorithim and the key.

![enryption](images/encryption.png)

Encryption is great for end to end messaging.

Now what do we do when we recieve that information on our server?

* We DO NOT store plain passwords in the database

* We DO NOT store encoded passwords in the database

* We DO NOT store encypted passwords in the database

We need to add another level complexity by `hashing` the password before storing it. 

### Hashing

Hashing is another way that we can protect data. We will `hash` user passwords before storing them.

Hashed password will become a random string of characters that is intended to never be un-hashed.

![hashed pattern](images/hashed.png)

A hash is pretty much impossible to reverse enginer and un-hash. This provides another very strong layer of security.

So we will be storing the `hashed` passwords into our database.

When we recieve the same input from a user and run the same hash algortihim on it, we will receive that same hash value so we can use that hash value to find the stored hash value in our db.

#### Salt 

When we are hashing our passwords, we also want to add a `salt`. This will add some more complexity to the security layer to create an even more secure way to store passwords.

The salt is just another set of characters that are completely random that will make the hashed string even more crazy.

![salt pattern](images/salt.png)

### Bcrypt

We will be using `bcrypt` to generate the hashed and salted passwords. Bcrypt is an awesome library that we can us the tools from to increase the security in our applications.

#### Create A Hashed Password

Below is an example to create a hashed and salted password

```js
    // Require bcrypt
    const bcrypt = require('bcryptjs');
    // Unhashed password
    let password = 'thisisapassword';
    // Create a salt
    let salt = bcrypt.genSaltSync(15);
    // Create a hash with the password and salt
    let hash = bcrypt.hashSync(password, salt)
    // Store hash into db
```

#### Reading A Hashed Password

Below is an example to compare a password to hashed password

```js
    // Require bcrypt
    const bcrypt = require('bcryptjs');
    // Unhashed password
    let password = 'thisisapassword';
    // Load hashed password from db
    let hashedPassword = db.get_password();
    // compare the password and hashedPassword
    let authenticated = bcrypt.compareSync(password, hashedPassword); // this will return true or false
    // use the authenticated variable to check if user is logged in successfully
```