var questions = [
   {   text: '<div>First of all, we would like to thank you for participating this experiment. We are carrying out non-profit research at a university to understand how people experience online videos.  In this experiment, we ask you to fill in a demographic questionnaire, then spend some time watching a video and afterwards answer some questions. <p>By accepting this Task, you agree that:</p><p>We may publish excerpts of your answers for scientific articles;<br>This experiment will record your interactions;<br>We will NOT publish any information that could be linked to you</p><p>Note on answer questions:</p><p>There are no absolute wrong or right answers for this task. What we ask is for you to give us your opinions related to the video that you watch.</p><p>Task duration and reward:<br>The whole experiment takes about 5 minutes, and you will get 0.3 USD after you finish the task successfully</p><p>Contact information:<br>You can always contact the requester for this Task at <a href="mailto:y.zhu-1@tudelft.nl">y.zhu-1@tudelft.nl</a>. Please make sure you include the title of the Task when sending an email to this address.<br></p><p></p><p></p><p></p><p></p><p></p></div><p><b>Please Type your Microworker ID here</b></p>', 
    comment: '<p><b>If you would like to participant in this experiment, please click CONTINUE</b></p>',
         id: '0', 
       type: 'text-field-small'},
   {   text: 'How much wood could a woodchuck chuck if a woodchuck could chuck wood?', 
         id: '1', 
       type: 'single-select', 
    options: ["37", "112", "42", "100"]},
  {   text: 'What has a face and two hands but no arms or legs?', 
         id: '2', 
       type: 'single-select', 
    options: ["a clock", "a dog", "a couch", "a giraffe"]},
  {   text: 'What gets wetter and wetter the more it dries?', 
         id: '3', 
       type: 'single-select', 
    options: ["a car", "a towel", "a plane", "a television"]},
  {   text: 'You throw away the outside and cook the inside. Then you eat the outside and throw away the inside. What did you eat?', 
         id: '4', 
       type: 'single-select', 
    options: ["a cucumber", "an ear of corn", "a watermelon", "cheese"]},
  {   text: 'What goes up and down the stairs without moving?', 
         id: '5', 
       type: 'single-select', 
    options: ["a toddler", "an arrow", "towels", "a rug"]},
  {   text: 'What can you catch but not throw?', 
         id: '6', 
       type: 'single-select', 
    options: ["a couch", "a cold", "a puppy", "a baseball"]},
  {   text: 'I can run but not walk. Wherever I go, thought follows close behind. What am I?', 
         id: '7', 
       type: 'single-select', 
    options: ["a doctor", "a pineapple", "a nose", "pimples"]},
  {   text: 'What\'s black and white and red all over?', 
         id: '8', 
       type: 'single-select', 
    options: ["an embarrased skunk", "a turtle", "a giraffe", "a dog"]},
  {   text: 'What goes around the world but stays in a corner?', 
         id: '9', 
       type: 'single-select', 
    options: ["a stamp", "coffee", "a dog", "plants"]}
];

var portionOfWindowSizeForQuestions = 0.9;
var firstQuestionDisplayed = 0;
var lastQuestionDisplayed = 0;

window.onbeforeunload = function() {
    return "This will reset all answers that you've already filled in!";
}

$(document).ready(function(){
   
  questions.forEach(function(question) {
    generateQuestionElement( question );
  });
  
  $('#backBtn').click(function() {
    if ( !$('#backBtn').hasClass('disabled') ) {
      showPreviousQuestionSet();
    }
  });
  
  $('#nextBtn').click(function() {
    if ( $('#nextBtn').text().indexOf('Continue') === 0 ) {
      showNextQuestionSet();
    } else {
      // call submitting stuff here.  
    }
    
  });
  
  showNextQuestionSet();
     
});



function generateQuestionElement(question) {
  
  var questionId = "q_" + question.id;
  var questionElement = $('<div id="' + questionId + '" class="question"></div>');
  var questionTextElement = $('<legend class="question-text"></legend>');
  var questionAnswerElement = $('<div class="answer"></div>');
  var questionCommentElement = $('<div class="comment"></div>');
  questionElement.appendTo($('.question-container'));
  questionElement.append(questionTextElement);
  questionElement.append(questionAnswerElement);
  questionElement.append(questionCommentElement);
  questionTextElement.html(question.text);
  questionCommentElement.html(question.comment);
  if ( question.type === 'single-select' ) {
    questionElement.addClass('single-select');
    question.options.forEach(function(option) {
      questionAnswerElement.append(
        '<label class="radio"><input type="radio" value="' + option + '" name="' + questionId + '"/>' + option + '</label>');
    });
  }
  else if ( question.type === 'text-field-small' ) {
    questionElement.addClass('text-field-small');
    questionAnswerElement.append(
      '<input type="text" value="" class="text-short" name="' + questionId + '">');
  }
  questionElement.hide();
}


function hideAllQuestions() {
  $('.question:visible').each(function(index, element){
    $(element).hide();
  });
}


function showNextQuestionSet() {
  hideAllQuestions();
  var finished = false;
  firstQuestionDisplayed = ++lastQuestionDisplayed;
  
  do {
    $('.question-container > div.question:nth-child(' + lastQuestionDisplayed + ')').show();
    var nextElement = $('.question-container > div.question:nth-child(' + (lastQuestionDisplayed + 1) + ')');
    nextElement.show();

    if ( true || lastQuestionDisplayed >= questions.length || $('.question-container').height() > $(window).height() * portionOfWindowSizeForQuestions ) {
      nextElement.hide();
      finished = true;
    } else {
      lastQuestionDisplayed++;
    }
  } while( !finished );
  
  doButtonStates();
}


function showPreviousQuestionSet() {
  hideAllQuestions();
  var finished = false;
  lastQuestionDisplayed = --firstQuestionDisplayed;
  
  do {
    $('.question-container > div.question:nth-child(' + firstQuestionDisplayed + ')').show();
    var previousElement = $('.question-container > div.question:nth-child(' + (firstQuestionDisplayed - 1) + ')');
    previousElement.show();
    
    if ( true || firstQuestionDisplayed <= 1 || $('.question-container').height() > $(window).height() * portionOfWindowSizeForQuestions ) {
      previousElement.hide();
      finished = true;
    } else {
      firstQuestionDisplayed--;
    }
    
  } while( !finished );
  
  doButtonStates();
  
}


function doButtonStates() {
  
  if ( firstQuestionDisplayed == 1 ) {
    $('#backBtn').addClass('invisible');  
  } else if ( $('#backBtn' ).hasClass('invisible') ) {
    $('#backBtn').removeClass('invisible');
  }
    
  if ( lastQuestionDisplayed == questions.length ) {
    $('#nextBtn').text('Finish');
    $('#nextBtn').addClass('blue');  
  } else if ( $('#nextBtn').text() === 'Finish' ) {
    $('#nextBtn').text('Continue »'); 
    $('#nextBtn').removeClass('blue');
  }
}
