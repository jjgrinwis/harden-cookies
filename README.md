## Harden my cookies ##
An example [Akamai EdgeWorker](https://techdocs.akamai.com/edgeworkers/docs) script to harden the 'Set-Cookie' header(s) coming from Origin.<br>
This Akamai EdgeWorker script, created by a couple of Dutch Akamai SE's, will run on the [onClientResponse()](https://techdocs.akamai.com/edgeworkers/docs/event-handler-functions) event: 
![image](https://user-images.githubusercontent.com/3455889/151361541-3b3c4228-a391-4f40-b270-c2396e18945a.png)
_It's also possible to run this on the onOriginResponse() event but some advanced metadata is needed to forward the [set-cookie](https://techdocs.akamai.com/edgeworkers/docs/cookies) header(s)._

This script will use the Set-Cookie header(s) from origin and will set the following attributes:
- Secure
- HttpOnly
- SameSite=Strict

This/these new SetCookie object(s) will be added to the [Response Object](https://techdocs.akamai.com/edgeworkers/docs/response-object) and forwarded to the client.
