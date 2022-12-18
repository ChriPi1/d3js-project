/*this function hides/shows divs for onpage-navigation, because only one html-file is allowed for grading ;)*/
function showChapter(chapterID) {
   let mainContent = document.getElementById("mainContent");
   for(let i = 1; i < mainContent.children.length; i++) {
      mainContent.children[i].style.display = "none";
   }

   switch(chapterID){
      case 1:
            mainContent.children.dataBasedDocumentsChapter.style.display = "block";
         break;
      case 2:
            mainContent.children.d3jsChapter.style.display = "block";
         break;
      case 3:
            mainContent.children.marketChapter.style.display = "block";
         break;
      case 4:
            mainContent.children.selfExamplesChapter.style.display = "block";
         break;
      case 5:
            mainContent.children.publicExamplesChapter.style.display = "block";
         break;
      case 6:
            mainContent.children.lessonsLearnedChapter.style.display = "block";
         break;
      case 7:
            mainContent.children.aboutChapter.style.display = "block";
         break;
   }
}