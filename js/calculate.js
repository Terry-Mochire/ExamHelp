function changeCalculator(tP, aL) {
    var tPaper = $('#calc1').val();
    var aLevel = $('#calc2').val();
    var aLevelName = aLevel;
    var dLine = $('#calc3').val();
    var cPages = $('#calc4').val();
    var tPaperPrice = '';
    var regExp = "^\\d+$";
    if (tP.typeOfPaper[aLevel] == undefined || aLevel == '' || tPaper == '' || dLine == '') {
        $('.word-count').html('~ ' + (275 * cPages) + ' words');
        return false;
    }
    $.each(tP.typeOfPaper[aLevel], function() {
        if (this.option == tPaper) {
            tPaperPrice = this.ratio;
            return true;
        }
    });
    if (aLevelName == 'HighSchool') {
        aLevelName = 'High School';
    }
    var price = (aL[aLevelName][dLine] * tPaperPrice) * cPages;
    $('.price').html('$' + price.toFixed(0));
    $('.word-count').html('~ ' + (275 * cPages) + ' words');
}

function check(input) {
    input.value = input.value.replace(/[^\d]/g, '');
    input.value = input.value.replace(/^0/g, '1');
    recalculatePrice(1);
};
function recalculatePrice(type) {
    var tP = jQuery.parseJSON(TypeOfPaper);
    var aL = jQuery.parseJSON(AcademyPriceDependenceList);
    if (type == 1) {
        changeCalculator(tP, aL);
    } else {
        var aLevel = '<option value="" selected style="display: none;">Please select</option>';
        var dLine = '<option value="" selected style="display: none;">Deadline</option>';
        var tPaper = '<option value="" selected style="display: none;">Type of assignment</option>';
        var s = 0;
        $.each(aL, function(key, value) {
            var selected = '';
            if (s == 0) {
                selected = 'selected';
                var i = 0;
                $.each(this, function(key, val) {
                    var selected1 = '';
                    var days = convertSecToDate(key);
                    if (key == '1209600') {
                        selected1 = '';
                    }
                    dLine = '<option value="' + key + '" ' + selected1 + '>' + days + '</option>' + dLine;
                    i++
                });
                var sm = key.replace(/\s+/g, '');
                var k = 0;
                $.each(tP.typeOfPaper[sm], function(key, val) {
                    if (k == 0) {
                        tPaper += '<option value="' + this.option + '" >' + this.option + '</option>';
                    } else {
                        tPaper += '<option value="' + this.option + '">' + this.option + '</option>';
                    }
                    k++;
                });
            }
            s++;
        });
        $('#calc3').html(dLine);
        $('#calc1').html(tPaper);
        $('#calc4').val('1');
        changeCalculator(tP, aL);
        checkDL();
    }
}

function convertSecToDate(time) {
    var days = Math.floor(time / 60 / 60 / 24);
    if (days != '0') {
        if (days == 1) {
            days = days + ' day';
        } else {
            days = days + ' days';
        }
    } else {
        days = Math.floor(time / 60 / 60) % 24 + ' hours';
    }
    return days;
}
function checkTpDl(arr, val, pages, al) {
    var bAl = ['High School', 'College'];
    var testa;
    var out = [];
    var falTpPaper = arr.some(function(arrVal) {
        return val === arrVal;
    });
    if (pages >= 11){
        pa = false;
    }
    else{
        pa = true
    };
    for (var i = 0; i < bAl.length; i++) {
        if (al == bAl[i]){
            testa = true;
            break;
        }
    }
    out.push(falTpPaper),
        out.push(testa),
        out.push(pa);
    function isTrue(arra) {
        return arra > 0;
    }
    return out.every(isTrue);
}
function checkTpDl3(arr, val, pages, al) {
    var bAl = ['High School', 'College'];
    var testa;
    var out = [];
    var falTpPaper = arr.some(function(arrVal) {
        return val === arrVal;
    });
    if (pages >= 4){
        pa = false;
    }
    else{
        pa = true
    };
    for (var i = 0; i < bAl.length; i++) {
        if (al == bAl[i]){
            testa = true;
            break;
        }
    }
    out.push(falTpPaper),
        out.push(testa),
        out.push(pa);
    function isTrue(arra) {
        return arra > 0;
    }
    return out.every(isTrue);
}
function checkDL(){
    var aL = jQuery.parseJSON(AcademyPriceDependenceList);
    var tpChck = $('#calc1').val();
    var dlChck = $('#calc3').val();
    var pages = $('#calc4').val();
    var keyAL = $('#calc2').val().replace(/\s+/g, '');
    if (keyAL == 'HighSchool') {
        keyAL = 'High School';
    }
    var dLine;
    var dLeight =
        [
            'Admission essay',
            'Annotated bibliography',
            'Argumentative essays',
            'Article review',
            'Biographies',
            'Creative writing',
            'Editing',
            'Essay (any type)',
            'Formatting',
            'Paraphrasing',
            'Proofreading',
            'Other',
            'Analytical essay',
            'Argumentative essay',
            'Assessment',
            'Book review',
            'Business plan',
            'Capstone project',
            'Case study',
            'Cause and effect essay',
            'Compare and contrast essay',
            'Coursework',
            'Cover letter',
            'Critical review',
            'Critical thinking',
            'Definition essay',
            'Descriptive essay',
            'Evaluation essay',
            'Expository Essay',
            'Lab report',
            'Literary analysis',
            'Movie review',
            'Multiple choice questions',
            'Narrative essay',
            'Personal statement',
            'Persuasive essay',
            'Presentation or speech',
            'Problem solving',
            'Reaction paper',
            'Reflective essay',
            'Research paper',
            'Research proposal',
            'Rhetorical analysis',
            'Term paper'
        ];
    var i = 0;
    if (checkTpDl(dLeight, tpChck, pages, keyAL) == false){
        delete aL[keyAL][10800];
        delete aL[keyAL][28800];
        if (dlChck == 28800 || dlChck == 10800){
            dlChck = 86400;
        }
    };
    if (checkTpDl3(dLeight, tpChck, pages, keyAL) == false){
        delete aL[keyAL][10800];
        if (dlChck == 10800){
            dlChck = 28800;
        }
    };
    $.each(aL[keyAL], function(key, val) {
        var selected1 = '';
        var days = convertSecToDate(key);

        dLine = '<option value="' + key + '" >' + days + '</option>' + dLine;

        i++
    });
    $('#calc3').html(dLine);
    $('#calc3').val(dlChck);

    recalculatePrice(1);
}

function filterLetters(val){
    var res = val.replace(/[^0-9]/gi, '');
    return res;
}

$(function() {
    recalculatePrice(0);

    $('#calc4').bind('input', function(e) {
        var pageLenght = $(this).val();
        var deadline = $('#calc3').val();
        if (pageLenght != '' && pageLenght != '0') {
            if (pageLenght.length > 3) {
                $(this).val($(this).val().slice(0, 3));
            }
            if (deadline == 10800 && Number(pageLenght) > 3) {
                $(this).val(3)
            }
            if (deadline == 28800 && Number(pageLenght) > 10) {
                $(this).val(10)
            }
            $(this).val(filterLetters($(this).val()))
            checkDL();
            recalculatePrice(1);
        }
        else if (pageLenght == '0') {
            $(this).val(1)
            checkDL();
            recalculatePrice(1);
        }
        else{
            checkDL();
            recalculatePrice(1);
        }
    });

    $('#calc4').focusout(function(){
        var pageLenght = $(this).val();
        if (pageLenght == '') {
            $(this).val(1)
            checkDL();
            recalculatePrice(1);
        }
    });

    $(document).on("change", '#calc2', function() {
        var tP = jQuery.parseJSON(TypeOfPaper);
        var aL = jQuery.parseJSON(AcademyPriceDependenceList);
        var tpChck = $('#calc1').val();
        var dlChck = $('#calc3').val();
        var pages = $('#calc4').val();
        var keyAL = $(this).val().replace(/\s+/g, '');
        var dLine; // = '<option value="" selected hidden style="display: none;">Deadline</option>';
        var tPaper; // = '<option value="1" selected hidden style="display: none;">Type of Assignment</option>';
        var aLevelName = $('#calc2').find('option[value="' + $(this).val() + '"]').html();
        var k = 0;
        $.each(tP.typeOfPaper[keyAL], function(key, val) {
            var selected1 = '';

            if (val['option'] == tpChck) {
                selected1 = 'selected';
            }

            tPaper += '<option value="' + this.option + '"' + selected1 + '>' + this.option + '</option>';

            k++;
        });
        var i = 0;

        //$('#calc3').val(dlChck);
        $('#calc1').html(tPaper);
        recalculatePrice(1);
        checkDL();
    });
});
$(document).on("change", '#calc3', function() {
    var deadline = $(this).val();
    var page = $('#calc4').val();
    if (deadline == 10800 && Number(page) > 3) {
        $('#calc4').val(3)
    }
    checkDL();
    recalculatePrice(1);
});
$(document).on("change", '#calc1', function() {
    checkDL();

    if ($(this).attr('name') == 'typeOfPaper' && $(this).val() == 'Problem solving') {
        $('.calculator-pages p:first-child').html('Problems');
        $('.word-count').fadeOut();
    }
    else if ($(this).attr('name') == 'typeOfPaper' && $(this).val() == 'Multiple choice questions') {
        $('.calculator-pages p:first-child').html('Questions');
        $('.word-count').fadeOut();
    }
    else {
        $('.calculator-pages p:first-child').html('Pages');
        $('.word-count').fadeIn();
    }
    recalculatePrice(1);
});
$(function() {
	var cal2def = "College",
		cal1def = "Essay (any type)",
		cal3def = "1209600";
	$("#calc2").val(cal2def);
	$("#calc1").val(cal1def);
	$("#calc3").val(cal3def);
	checkDL();
	$('.price').html('$12');
});