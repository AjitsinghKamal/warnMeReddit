/**
 * Content Script for reddit-labeler
 *
 **/

 //dictionary object to map extra domains not safe for metered data connection
 var dict={youtu:"VIDEO",streamable:"VIDEO",gfycat:"GIF",giphy:"GIF"};

//since imgur domains host both static images and gifs
//query and seperately work on gifs
tagger(document.querySelectorAll("p>a[href*='.gif']"),"GIF");

//check for each key on reddit page
for(key in dict){
	//string to buld custom query

	var queryBuilder="p>a[href*='"+key+"']";
	tagger(document.querySelectorAll(queryBuilder), dict[key]);
}

/**
 * create a new span element and append it queried nodes
 *
 * @param {live nodelist returned by 'querySelectorAll()'} nodeList
 * @param {String} tag
 *
 **/
function tagger(nodeList,tag){
	//iterate through nodelist
	//used classic for
	//to be safe	
	for(let i=0;i<nodeList.length;i++){

		nodeList[i].style.color="#5A5657";

		let warn;
		if(nodeList[i].hasAttribute("class")){
			let parent=nodeList[i].parentNode;
			warn=parent.nextSibling.nextSibling;
		}

		else
			warn=nodeList[i];

		var label=document.createElement('span');
		
		label.className="m-stamp";
		//use value from dictionary as stamp text
		label.innerHTML=tag;

		warn.appendChild(label);
		}
		
		

	
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.greeting)
    	sendResponse({farewell: "goodbye"});
  });





