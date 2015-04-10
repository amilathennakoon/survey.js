var questions = [
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
    options: ["a stamp", "coffee", "a dog", "plants"]},
  {   text: 'I have holes in my top and bottom, my left and right, and in the middle. But I still hold water. What am I?', 
         id: '10', 
       type: 'single-select', 
    options: ["a turtle", "a toenail", "a sponge", "a towel"]},
  {   text: 'Give me food, and I will live; give me water, and I will die. What am I?', 
         id: '11', 
       type: 'single-select', 
    options: ["a cold", "fire", "couch", "a microwave"]},
  {   text: 'The man who invented it doesn\'t want it. The man who bought it doesn\'t need it. The man who needs it doesn\'t know it. What is it?', 
         id: '12', 
       type: 'single-select', 
    options: ["a pillow", "a coffee grinder", "a coffin", "a computer"]},
  {   text: 'I run over fields and woods all day. Under the bed at night I sit not alone. My tongue hangs out, up and to the rear, awaiting to be filled in the morning. What am I?', 
         id: '13', 
       type: 'single-select', 
    options: ["a shoe", "a dog", "a nail", "a wallet"]},
  {   text: 'Throw it off the highest building, and I\'ll not break. But put me in the ocean, and I will. What am I?', 
         id: '14', 
       type: 'single-select', 
    options: ["a penny", "a car", "a shell", "a tissue"]},
  {   text: 'What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?', 
         id: '15', 
       type: 'single-select', 
    options: ["a river", "a lake", "an ocean", "a car"]},
  {   text: 'No sooner spoken than broken. What is it?', 
         id: '16', 
       type: 'single-select', 
    options: ["silence", "onions", "paper", "cats"]},
  {   text: 'A certain crime is punishable if attempted but not punishable if committed. What is it?', 
         id: '17', 
       type: 'single-select', 
    options: ["smoking", "coup d'etat", "horseplaying", "swimming"]},
  {   text: 'You use a knife to slice my head and weep beside me when I am dead. What am I?', 
         id: '18', 
       type: 'single-select', 
    options: ["an onion", "toilet paper", "toenails", "an ottoman"]},
  {   text: 'I\'m the part of the bird that\'s not in the sky. I can swim in the ocean and yet remain dry. What am I?', 
         id: '19', 
       type: 'single-select', 
    options: ["a beak", "a foot", "a feather", "a shadow"]},
  {   text: 'I am mother and father, but never birth or nurse. I\'m rarely still, but I never wander. What am I?', 
         id: '20', 
       type: 'single-select', 
    options: ["headphones", "kittens", "a tree", "a hippy"]}
];

var portionOfWindowSizeForQuestions = 0.9;
var firstQuestionDisplayed = 0;
var lastQuestionDisplayed = 0;

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
    if ( $('#nextBtn').text().indexOf('Next') === 0 ) {
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
  questionElement.appendTo($('.question-container'));
  questionElement.append(questionTextElement);
  questionElement.append(questionAnswerElement);
  questionTextElement.text(question.text);
  if ( question.type === 'single-select' ) {
    questionElement.addClass('single-select');
    question.options.forEach(function(option) {
      questionAnswerElement.append(
        '<label class="radio"><input type="radio" value="' + option + '" name="' + questionId + '"/>' + option + '</label>');
    });
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
    $('#backBtn').addClass('disabled');  
  } else if ( $('#backBtn' ).hasClass('disabled') ) {
    $('#backBtn').removeClass('disabled');
  }
    
  if ( lastQuestionDisplayed == questions.length ) {
    $('#nextBtn').text('Finish');
    $('#nextBtn').addClass('blue');  
  } else if ( $('#nextBtn').text() === 'Finish' ) {
    $('#nextBtn').text('Next »'); 
    $('#nextBtn').removeClass('blue');
  }
}
