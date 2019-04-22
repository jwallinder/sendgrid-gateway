# sendgrid-gateway
gateway/proxy to use sendgrid from react app, avoiding CORS problem

# Problem to solve
If you have a web application based on React or smliar and want to use Sendgrid as a 3rd party mail integration you will face a CORS problem. 
Sendgrid explains the problemn here https://sendgrid.com/docs/for-developers/sending-email/cors/ and they end the article by saying 
>You can create a server-based application
Well, here it is :)

# How to use it
Currently only support for transactional email. 

## POST /send
Will send a transactional email, the messageid is preconfigured in the app and inserted to the message. 
The body must contain a message object described here https://sendgrid.api-docs.io/v3.0/mail-send/v3-mail-send 
