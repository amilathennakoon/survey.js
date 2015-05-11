var questions;
var video;
var timestamps = [];
var firstQuestionDisplayed = -1;
var lastQuestionDisplayed = -1;


window.onbeforeunload = function() {
    return "This will reset all answers that you've already filled in!";
}


$(document).ready(function(){

    $.getJSON('questions.json', function(json) {
        questions = json;
        setup_survey();
    });

});

function setup_survey() {

    questions.forEach(function(question) {
        generateQuestionElement( question );
    });
    $('input[name="worker"]').val(getParameterByName("worker"));
    
    $.get('http://localhost:7000/video', function (response) {
            if (!response) {
                $('#nextBtn').addClass('disabled');  
                alert('There is no video to view. This likely means we have enough participants for this experiment');
            }
            video = response;
            $("#player_c").attr("src", "video.html?file="+video);
        }
    );
  
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

        now = new Date().getTime()

        if ( $('#nextBtn').text().indexOf('Continue') === 0 ) {
            timestamps.push(now);
            showNextQuestionSet();
        }
        else {
            var answers = {video: video,
                           res: $(window).width() + "x" + $(window).height(),
                           timestamps: timestamps.concat([now]),
                           campaign: getParameterByName("campaign")};
            for (i = 0; i < questions.length; i++) {
                answers[questions[i].id] = getQuestionAnswer(questions[i]);
            }

            $.ajax({type: 'post',
                    url: 'http://localhost:7000/answers',
                    contentType: "application/json",
                    data: JSON.stringify(answers),
                    processData: false,
                    success: function(response) {
                        hideAllQuestions();
                        $('#nextBtn').hide();
                        if ('vcode' in response) {
                            $('.completed-message').html('Thank you for participating in this experiment!<br><br>Your Microworkers vcode is <b>'+response['vcode']+'</b>.');
                        }
                        else if ('error' in response) {
                            $('.completed-message').text('An error occurred: '+response['error']);
                        }
                        else {
                            $('.completed-message').text('An unknown error occurred.');
                        }
                    },
                    error: function(response) {
                        hideAllQuestions();
                        $('#nextBtn').hide();
                        $('.completed-message').text('An error occurred: could not send data to server');
                    }
            });
        }
    });
  
    showNextQuestionSet();
     
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function getQuestionAnswer(question) {
    var result;
    if ( question.type === 'single-select' ) {
        result = $('input[type="radio"][name="' + question.id + '"]:checked').val();
    }
    else if ( question.type === 'single-select-oneline' ) {
        result = $('input[type="radio"][name="' + question.id + '"]:checked').val();
    }
    else if ( question.type === 'text-field-small' ) {
        result = $('input[name=' + question.id + ']').val();
    }
    else if ( question.type === 'text-field-large' ) {
        result = $('textarea[name=' + question.id + ']').val();
    }
    return result ? result : undefined;
}


function generateQuestionElement(question) {
  
    var questionElement = $('<div id="' + question.id + '" class="question"></div>');
    var questionTextElement = $('<div class="question-text"></div>');
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
            questionAnswerElement.append('<label class="radio"><input type="radio" value="' + option + '" name="' + question.id + '"/>' + option + '</label>');
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
            html += '<td><div><input type="radio" value="' + label + '" name="' + question.id + '"></div></td>';
        });
        html += '<td><div>' + question.labels[1] + '</div></td></tr></table>';
        questionAnswerElement.append(html);
    }
    else if ( question.type === 'text-field-small' ) {
        questionElement.addClass('text-field-small');
        questionAnswerElement.append('<input type="text" value="" class="text" name="' + question.id + '">');
    }
    else if ( question.type === 'text-field-large' ) {
        questionElement.addClass('text-field-large');
        questionAnswerElement.append('<textarea rows="8" cols="0" class="text" name="' + question.id + '">');
    }
    if ( question.required === true ) {
        var last = questionTextElement.find(':last');
        (last.length ? last : questionTextElement).append('<span class="required-asterisk" aria-hidden="true">*</span>');
    }
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

