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
   {        text: '<div><p><h2>Part 1 Demographic Questionnaire</h2></p><p><b>What is your age?</b></p></div>', 
              id: '2', 
            type: 'text-field-small'},
   {        text: '<p><b>What is your gender?</b></p>', 
              id: '3', 
            type: 'single-select', 
         options: ["Female", "Male"]},
   {        text: '<p><b>What is your nationality?</b></p>', 
              id: '4', 
            type: 'text-field-small'},
   {        text: '<p><b>How often do you watch online videos?</b></p>', 
              id: '5', 
            type: 'single-select', 
         options: ["Everyday", "Several times a week", "Several times a month", "Several times a year", "Never"]},
   {        text: '<p><b>What is the resolution of your screen?</b><br>Please write "DK" if you don\'t know the answer</p>', 
              id: '6', 
            type: 'text-field-small'},
   {        text: '<p><b>Are you interested in sports video?</b></p>', 
              id: '7', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Not at all", "Very much"]},
   {        text: '<p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p>', 
              id: '8', 
     break_after: true,
            type: 'text-field-large'},
   {        text: '<div><p><h2>Part 2 Personality Questionnaire</h2><br>In the following part, there are a number of personality traits that may or may not apply to you. Please mark the extent to which you agree or disagree with that statement. You should rate the extent to which the pair of traits applies to you, even if one characteristic applies more strongly than the other.</p><p><h2>I see myself as</h2></p><p><b>Extraverted, enthusiastic</b></p></div>', 
              id: '9', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Critical, quarrelsome</b></p>', 
              id: '10', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Dependable, self-disciplined</b></p>', 
              id: '11', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Anxious, easily upset</b></p>', 
              id: '12', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Open to new experiences, complex</b></p>', 
              id: '13', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Reserved, quiet</b></p>', 
              id: '14', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Sympathetic, warm</b></p>', 
              id: '15', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Disorganized, careless</b></p>', 
              id: '16', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Calm, emotionally stable</b></p>', 
              id: '17', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>Conventional, uncreative</b></p>', 
              id: '18', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["Disagree Strongly", "Agree Strongly"]},
   {        text: '<p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p>', 
              id: '19', 
     break_after: true,
            type: 'text-field-large'},
    {       text: '<div><p><h2>Part 3 Training</h2><br>In this Part you will watch TWO sample videos, The first video represents the highest possible video quality you will get, the second video represents the lowest possible video quality you will get. The second video will not be played until you finished the first video. After watching these two videos, there is one sample question to help you get familiar with our test questionnaire.</p><p><h2>Sample High Quality</h2><iframe id="player_a" src="video.html?file=big_buck_bunny_480p_h264.mp4" allowfullscreen frameborder="0" scrolling="no" width="620" height="385"></iframe></p><p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p></div>', 
              id: '20', 
     break_after: true,
            type: 'text-field-large'},
    {       text: '<div><p><h2>Part 3 Training</h2><br>In this Part you will watch TWO sample videos, The first video represents the highest possible video quality you will get, the second video represents the lowest possible video quality you will get. The second video will not be played until you finished the first video. After watching these two videos, there is one sample question to help you get familiar with our test questionnaire.</p><p><h2>Sample Low Quality</h2><iframe id="player_b" src="video.html?file=big_buck_bunny_480p_h264.mp4" allowfullscreen frameborder="0" scrolling="no" width="620" height="385"></iframe></p><p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p></div>',
              id: '21', 
     break_after: true,
            type: 'text-field-large'},
   {        text: '<div><p><h2>Part 3 Training</h2><br>In this Part you will watch TWO sample videos, The first video represents the highest possible video quality you will get, the second video represents the lowest possible video quality you will get. The second video will not be played until you finished the first video. After watching these two videos, there is one sample question to help you get familiar with our test questionnaire.</p><p><h2>Sample question</h2></p><p><b>The video clip was enjoyable</b></p></div>', 
              id: '22', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["fully disagree", "fully agree"]},
    {       text: '<p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p>', 
              id: '23', 
     break_after: true,
            type: 'text-field-large'},
    {       text: '<p><h2>The Training part is over. Please click continue to start the actual experiment</h2></p>', 
              id: '24', 
     break_after: true,
            type: 'text-field-small'},
    {       text: '<div><p><h2>Part 4 Watching the test video</h2><br>After watching the whole video, please click continue to enter the last part. Please note you are requested to finish watching the entire video.</p><p><iframe id="player_c" src="video.html?file=big_buck_bunny_480p_h264.mp4" allowfullscreen frameborder="0" scrolling="no" width="620" height="385"></iframe></p><p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p></div>', 
              id: '25', 
     break_after: true,
            type: 'text-field-large'},
   {        text: '<div><p><h2>Part 5 Video Experience Questionnaire</h2><br>In this part, you will be asked to fill in several questions related to your visual experience. Note that the experience we asked is ONLY refer to the video you just watched. Please answer all questions honestly.</p><p><b>The video clip was enjoyable</b></p></div>', 
              id: '26', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["fully disagree", "fully agree"]},
   {        text: '<p><b>I would recommend this video clip to my friends</b></p>', 
              id: '27', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["fully disagree", "fully agree"]},
   {        text: '<p><b>I was satisfied with the experience in watching this video clip</b></p>', 
              id: '28', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["fully disagree", "fully agree"]},
   {        text: '<p><b>When I was watching the video, I still paid attention to the world around me</b></p>', 
              id: '29', 
            type: 'single-select-oneline', 
         options: ["1", "2", "3", "4", "5", "6", "7"],
          labels: ["fully disagree", "fully agree"]},
   {        text: '<p><b>Did you perceive any visual impairments in the video?</b></p>', 
              id: '30', 
            type: 'single-select', 
         options: ["Very annoying", "Annoying", "Slightly annoying", "Perceptible, but not annoying", "Imperceptiable"]},
   {        text: '<p><b>Which type of sport they played in the video?</b></p>', 
              id: '31', 
        required: true,
            type: 'text-field-small'},
   {        text: '<p><b>General feedback</b><br>If you encounter any problems with this task or have any other comments, please report them here. You can also use this textbox to tell us if you liked this Task or have any suggestions.</p>', 
              id: '32', 
     break_after: true,
            type: 'text-field-large'}
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
        var ok = true;
        for (i = firstQuestionDisplayed; i <= lastQuestionDisplayed; i++) {
            if (questions[i]['required'] === true && !getQuestionAnswer(questions[i])) {
                $('.question-container > div.question:nth-child(' + (i+1) + ') > .required-message').show();
                ok = false;
            }
        }
        if (!ok)
            return

        if ( $('#nextBtn').text().indexOf('Continue') === 0 ) {
            showNextQuestionSet();
        }
        else {
            var answers = {res: $(window).width() + "x" + $(window).height()};
            for (i = 0; i < questions.length; i++) {
                answers["q_" + questions[i].id] = getQuestionAnswer(questions[i]);
            }

            $.ajax({type: 'post',
                    url: 'http://localhost:8000/session',
                    contentType: "application/json",
                    data: JSON.stringify(answers),
                    processData: false,
                    success: function(data) {
                        alert(data);
                    }
            });
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
    else if ( question.type === 'single-select-oneline' ) {
        result = $('input[type="radio"][name="' + questionId + '"]:checked').val();
    }
    else if ( question.type === 'text-field-small' ) {
        result = $('input[name=' + questionId + ']').val();
    }
    else if ( question.type === 'text-field-large' ) {
        result = $('textarea[name=' + questionId + ']').val();
    }
    return result ? result : undefined;
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
            questionAnswerElement.append('<label class="radio"><input type="radio" value="' + option + '" name="' + questionId + '"/>' + option + '</label>');
        });
    }
    else if ( question.type === 'single-select-oneline' ) {
        questionElement.addClass('single-select-oneline');
        var html = '<table border="0" cellpadding="5" cellspacing="0"><tr><td></td>';
        question.options.forEach(function(label) {
            html += '<td><label>' + label + '</label></td>';
        });
        html += '<td></td></tr><tr><td><div>' + question.labels[0] + '</div></td>';
        question.options.forEach(function(label) {
            html += '<td><div><input type="radio" value="' + label + '" name="' + questionId + '"></div></td>';
        });
        html += '<td><div>' + question.labels[1] + '</div></td></tr></table>';
        questionAnswerElement.append(html);
    }
    else if ( question.type === 'text-field-small' ) {
        questionElement.addClass('text-field-small');
        questionAnswerElement.append('<input type="text" value="" class="text" name="' + questionId + '">');
    }
    else if ( question.type === 'text-field-large' ) {
        questionElement.addClass('text-field-large');
        questionAnswerElement.append('<textarea rows="8" cols="0" class="text" name="' + questionId + '">');
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
    }
    else if ( $('#backBtn' ).hasClass('invisible') ) {
        $('#backBtn').removeClass('invisible');
    }
    
    if ( lastQuestionDisplayed == questions.length-1 ) {
        $('#nextBtn').text('Finish');
        $('#nextBtn').addClass('blue');  
    }
    else if ( $('#nextBtn').text() === 'Finish' ) {
        $('#nextBtn').text('Continue »'); 
        $('#nextBtn').removeClass('blue');
    }
}

