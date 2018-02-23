# Chrome-URL-phish-detector-extension
Now on the playstore! at
https://chrome.google.com/webstore/detail/codify/cplgcomagdnbbbaeipanninffcpiakil

Below are URLs which resolve to different addresses than the human readable equivalent, test the addon by installing it, making sure it's on (green icon) (click the icon to toggle) and make sure an alert comes up.

Test at http://аррӏе.com
https://xn--80ak6aa92e.com/

http://adidạs.com/shoes/ .

http://www.biṇaṇce.com/

(this shouldn't trigger an alert now, This allows the addon to parse the hostname part of the url but leave out everything after the "/".
This means that hosts will be verified but subdomains/pages of a site will not be parsed reducing the number of false positives.
I can do this without the risk of introducing false-negatives as it is the site's responsibility to remove malicious pages).
http://jamesmatchett.co.uk/జ్ఞ‌ా

