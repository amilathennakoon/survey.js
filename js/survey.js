var questions = [
   {       text: '<div>First of all, we would like to thank you for participating this experiment. We are carrying out non-profit research at a university to understand how people experience online videos.  In this experiment, we ask you to fill in a demographic questionnaire, then spend some time watching a video and afterwards answer some questions. <p>By accepting this Task, you agree that:</p><p>We may publish excerpts of your answers for scientific articles;<br>This experiment will record your interactions;<br>We will NOT publish any information that could be linked to you</p><p>Note on answer questions:</p><p>There are no absolute wrong or right answers for this task. What we ask is for you to give us your opinions related to the video that you watch.</p><p>Task duration and reward:<br>The whole experiment takes about 5 minutes, and you will get 0.3 USD after you finish the task successfully</p><p>Contact information:<br>You can always contact the requester for this Task at <a href="mailto:y.zhu-1@tudelft.nl">y.zhu-1@tudelft.nl</a>. Please make sure you include the title of the Task when sending an email to this address.<br></p><p></p><p></p><p></p><p></p><p></p></div><p><b>Please Type your Microworker ID here</b></p>', 
        comment: '<p><b>If you would like to participant in this experiment, please click CONTINUE</b></p>',
             id: '0', 
    break_after: true,
       required: true,
           type: 'text-field-small'},
   {       text: '<div><p><h2>Instructions</h2>This experiment consists of five parts.</p><p>Part 1 Demographic questionnaire<br>In this part, you are requested to answer some questions related to your daily online video experience.</p><p>Part 2 Personality questionnaire<br>In this part, you are requested to answer some questions related to your personality. Please answer the questions honestly.</p><p>Part 3 Training<br>In this part, you will watch two sample videos. One video represents the highest possible quality you will get while another video represents the lowest possible quality you will get.</p><p>Part 4  Watching the test video<br>In this part, you will watch the actual test video. The video lasts around 1 minute. We require that you watch the entire video clip.</p><p>Part 5 Test questionnaire<br>After watching the test video, you are requested to fill in a questionnaire related to your experience. Please note that the experience we ask is only related to the test video you just watched.</p><p>After finishing the whole experiment, you will get a code. Please use this code to get your reward via Mircoworkers.</p><p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p></div>', 
             id: '1', 
    break_after: true,
           type: 'text-field-large'},
  {        text: 'What has a face and two hands but no arms or legs?', 
             id: '2', 
    break_after: true,
       required: true,
           type: 'single-select', 
        options: ["a clock", "a dog", "a couch", "a giraffe"]},
  {        text: 'What gets wetter and wetter the more it dries?', 
             id: '3', 
           type: 'single-select', 
        options: ["a car", "a towel", "a plane", "a television"]},
  {        text: 'You throw away the outside and cook the inside. Then you eat the outside and throw away the inside. What did you eat?', 
             id: '4', 
           type: 'single-select', 
        options: ["a cucumber", "an ear of corn", "a watermelon", "cheese"]},
  {        text: 'What goes up and down the stairs without moving?', 
             id: '5', 
           type: 'single-select', 
        options: ["a toddler", "an arrow", "towels", "a rug"]},
  {        text: 'What can you catch but not throw?', 
             id: '6', 
           type: 'single-select', 
        options: ["a couch", "a cold", "a puppy", "a baseball"]},
  {        text: 'I can run but not walk. Wherever I go, thought follows close behind. What am I?', 
             id: '7', 
           type: 'single-select', 
        options: ["a doctor", "a pineapple", "a nose", "pimples"]},
  {        text: 'What\'s black and white and red all over?', 
             id: '8', 
           type: 'single-select', 
        options: ["an embarrased skunk", "a turtle", "a giraffe", "a dog"]},
  {        text: 'What goes around the world but stays in a corner?', 
             id: '9', 
           type: 'single-select', 
        options: ["a stamp", "coffee", "a dog", "plants"]}
];

var firstQuestionDisplayed = -1;
var lastQuestionDisplayed = -1;

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
      var ok = true;
      for (i = firstQuestionDisplayed; i <= lastQuestionDisplayed; i++) {
        if (questions[i]['required'] === true && !getQuestionAnswer(questions[i])) {
          $('.question-container > div.question:nth-child(' + (i+1) + ') > .required-message').show();
          ok = false;
        }
      }
      if (ok)
        showNextQuestionSet();
    } else {
      // call submitting stuff here.  
    }
    
  });
  
  showNextQuestionSet();
     
});


function getQuestionAnswer(question) {
  var questionId = "q_" + question.id;
  var result;
  if ( question.type === 'single-select' ) {
    result = $('input[type="radio"][name="' + questionId + '"]:checked').val();
  }
  else if ( question.type === 'text-field-small' ) {
    result = $('input[name=' + questionId + ']').val();
  }
  else if ( question.type === 'text-field-large' ) {
    result = $('textarea[name=' + questionId + ']').val();
  }
  return result;
}


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
      '<input type="text" value="" class="text" name="' + questionId + '">');
  }
  else if ( question.type === 'text-field-large' ) {
    questionElement.addClass('text-field-large');
    questionAnswerElement.append(
      '<textarea rows="8" cols="0" class="text" name="' + questionId + '">');
  }
  if ( question.required === true )
      questionAnswerElement.append('<span class="required-asterisk" aria-hidden="true">*</span>');
      questionAnswerElement.after('<div class="required-message">This is a required question</div>');
  questionElement.hide();
}


function hideAllQuestions() {
  $('.question:visible').each(function(index, element){
    $(element).hide();
  });
  $('.required-message').each(function(index, element){
    $(element).hide();
  });
}


function showNextQuestionSet() {
  hideAllQuestions();
  firstQuestionDisplayed = lastQuestionDisplayed+1;
  
  do {
    lastQuestionDisplayed++;  
    $('.question-container > div.question:nth-child(' + (lastQuestionDisplayed+1) + ')').show();
    if ( questions[lastQuestionDisplayed]['break_after'] === true)
       break;
  } while ( lastQuestionDisplayed < questions.length-1 );
  
  doButtonStates();
}


function showPreviousQuestionSet() {
  hideAllQuestions();
  lastQuestionDisplayed = firstQuestionDisplayed-1;
  
  do {
    firstQuestionDisplayed--;  
    $('.question-container > div.question:nth-child(' + (firstQuestionDisplayed+1) + ')').show();
    if ( firstQuestionDisplayed > 0 && questions[firstQuestionDisplayed-1]['break_after'] === true)
       break;
  } while ( firstQuestionDisplayed > 0 );
  
  doButtonStates();
  
}


function doButtonStates() {
  
  if ( firstQuestionDisplayed == 0 ) {
    $('#backBtn').addClass('invisible');  
  } else if ( $('#backBtn' ).hasClass('invisible') ) {
    $('#backBtn').removeClass('invisible');
  }
    
  if ( lastQuestionDisplayed == questions.length-1 ) {
    $('#nextBtn').text('Finish');
    $('#nextBtn').addClass('blue');  
  } else if ( $('#nextBtn').text() === 'Finish' ) {
    $('#nextBtn').text('Continue »'); 
    $('#nextBtn').removeClass('blue');
  }
}
