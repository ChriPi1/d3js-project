//function to make the selected chapters appear bold in the nav menu
let currElem = null; //will hold the element that is bold now

 function BoldText(elem) {
  if (elem != currElem) { //do thing if you're clicking on a bold link
   if (currElem) //if a link bold right now unbold it
	currElem.style.fontWeight='normal';
   currElem = elem; //assign this element as the current one
   elem.style.fontWeight='bold';  //make the element clicked bold
  }
 }