function initBody() {
    let main = document.getElementById('main');
    for(let i = 2; i < main.children.length; i++) {
        main.children[i].style.display = "none";
    }
}

/*this function hides/shows divs, because only one html-file is allowed
for grading (atleast that's what we think)*/
function showChapter(chapterID) {
   let main = document.getElementById('main');
   for(let i = 1; i < main.children.length; i++) {
      main.children[i].style.display = "none";
   }

   switch(chapterID){
      case 1:
            main.children.dataBasedDocumentsChapter.style.display = "block";
         break;
      case 2:
            main.children.d3jsChapter.style.display = "block";
         break;
      case 3:
            main.children.marketChapter.style.display = "block";
         break;
      case 4:
            main.children.selfExamplesChapter.style.display = "block";
         break;
      case 5:
            main.children.publicExamplesChapter.style.display = "block";
         break;
      case 6:
            main.children.lessonsLearnedChapter.style.display = "block";
         break;
      case 7:
            main.children.aboutChapter.style.display = "block";
         break;
   }
}