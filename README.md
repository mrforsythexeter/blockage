# blockage
Firefox only shows the message "This page is asking you to confirm that you want to leave - data you have entered may not be saved" when returning anything for the onbefore unload event. You maybe here because you have seen the NS_ERROR_NOT_AVAILABLE while trying to call alert prompt or confirm duing the unload event.

I needed a way to tell the user why I was asking them if they wanted to navigate away from the page. So I created a little script called blockage, which allows you to add functions which will be checked in the order you added them to blockage to see if the page should unload, and if you need to tell the user something, the message will be displayed understand the standard alert box from firefox.

This may work in other browsers, but it hasn't been tested yet. 

## Usage
Just include the script in your page

```html
<script type="text/javascript" src="blockage.js"></script>
```
	
By itself, it will do nothing, then next thing you have to do is add a function which will tell blockage to display a message. If you just want to show the user some text you can do something like this after the above line

```javascript
blockage.addCheck(
	function(){
		/* Add you own checking code here */
		return 'You didn\'t save all data before trying to navigate away';
	}
);
```
	
And this will produce the following

![Example Image From Firefox onbeforeunload Event](https://github.com/mrforsythexeter/blockage/raw/master/readme_assets/example.png)

If your check code doesn't require to stop the page unload event then simply return false, for example

```javascript
var allDataSaved = false;

/* Snip you code to change the above var to true, if the data is saved */

blockage.addCheck(function(){
	if (allDataSaved === true){
		return false;
	}else{
		return 'Did you forget something?';
	}
});
````

## Future
I will look to clean this up and make it work across browser if people start using it.