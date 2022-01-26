/*
// Harden cookie EW script build by kschagen and jgrinwis of Akamai NL.
// Just get all the set-cookies from origin (if set) and make sure they are hardened.
// Secure attribute must also be set when using SameSite=None!
// Make sure to set:
//
// <edgeservices:cookie.pass-set-cookie-policy>
//    ALWAYS
// </edgeservices:cookie.pass-set-cookie-policy>
//
// via advanced metadata as we’re running it on onOriginResponse()
*/

import { SetCookie } from 'cookies';

export function onOriginResponse(request, response) {
    let in_setcookies = response.getHeader('Set-Cookie');

    // only update the set-cookies if we have received some
    if (typeof in_setcookies !== 'undefined') {

        // remove the original set-cookie headers from response object
        for (var j = 0; j < in_setcookies.length; j++) {
            response.removeHeader('Set-Cookie');
        }

        // add our updated cookies to response object and go
        for (var i = 0; i < in_setcookies.length; i++) {
            var cookie = new SetCookie(in_setcookies[i]);
            cookie.secure = true;
            cookie.httpOnly = true;
            cookie.sameSite = 'Strict';
            response.addHeader('Set-Cookie', cookie.toHeader());
        }
    }
}
