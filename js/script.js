'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE]  add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  event.preventDefault();
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){

  /*[DONE]  remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages(){
    titleList.innerHTML = '';
  }
  clearMessages();
  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.insertAdjacentHTML('afterbegin', html);
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /*[DONE] find all articles */
  const articles = document.querySelectorAll('.post');
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html ='';
    /* [DONE] get tags from data-tags attribute */
    const  articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* [DONE] generate HTML of the link */
      console.log(tag);
      /* [DONE] add generated code to html variable */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a><li>';
      html = html + linkHTML;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('afterbegin', html);
  }
  /* [DONE] END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* create variable for all links HTML cose*/
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagParams:', tagsParams);
  let allTagsHTML = '';

  /*START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /*generate code of a link and add it to allTagsHTML*/
    const tagLinkHTML = ' <li><a class="tag-size-' +calculateTagClass(allTags[tag], tagsParams)+ '" href="#tag-' + tag + '">' + tag +' </a></li>';
    console.log('tagLinkHTML');
    allTagsHTML += tagLinkHTML;
  }
  /* END LOOP for each tag i allTags */
  /*add html grom allTagsHTML to taglist */
  tagList.innerHTML = allTagsHTML;
}

function calculateTagsParams(tags){
  const params = {max: '0', min: '999999'};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
    /* remove class active */
    activeLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + ' "]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag  + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list-horizontal a');
  console.log(tagLinks);
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click',
      tagClickHandler);
    console.log(tagLink);
  }
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors(){
  /* find authors*/
  const articles = document.querySelectorAll('.post');
  /*for each article*/
  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html ='';
    const author = article.getAttribute('data-author');
    const linkHTML = '<a href="#author-' + author + '">' + author+ '</a>';
    html = linkHTML + html;
    console.log(html);
    authorWrapper.insertAdjacentHTML('afterbegin', html);
  }
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const link = href.replace('#author-','');
  console.log(link);
  const authorLinks = document.querySelectorAll('a[href="' + href + ' "]');
  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + link  + '"]');
}
function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.post-author a');
  console.log(authorLinks);
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click',
      authorClickHandler);
    console.log(authorLink);
  }
}
addClickListenersToAuthors();

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

generateTitleLinks();

generateTags();

generateAuthors();

addClickListenersToAuthors();
