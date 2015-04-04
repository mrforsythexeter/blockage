# blockage
firefox only shows the message "This page is asking you to confirm that you want to leave - data you have entered may not be saved" when returning anything for the onbefore unload event. I needed a way to tell the user why I was asking them if they wanted to navigate away from the page.

So I created a little script called blockage, which allows you to add functions which will be checked in the order you added them to blockage to see if the page should unload, and if you need to tell the user something, the message will be displayed understand the standard alert box from firefox.

This may work in other browsers, but it hasn't been tested yet. 
