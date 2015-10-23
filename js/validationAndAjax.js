$(document).ready(function () {

    var element = $('#cells_selected_numbers');
    var cellsInfo = {};


    function strValueToIntInArrAndSortIt(str) {
        if (str == '' || str === undefined) {
            return str = 0;
        }
        var arr = str.split(',');
        for (var i = 0; i < arr.length; ++i) {
            arr[i] = parseInt(arr[i]);
        }
        arr = arr.sort();
        return arr;
    }

    function isArraysOfMultidimensionalArr1IdentityToArr2(arr1, arr2) {
        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i].length == arr2.length) {
                var numberOfMatch = 0;
                for (var x = 0; x < arr1[i].length; ++x) {
                    if ((arr1[i][x] === arr2[x])) {
                        ++numberOfMatch;
                    }
                }
                if (numberOfMatch === arr1[i].length) {
                    return true;
                }
            }
        }

        return false;
    }


    var validators = [];

    var validateIntersection = function (dataForValidation) {
        var enteredString = element.val();
        var arrWithEnterdValues = [];
        var myRegExpForCreationOfArray = new RegExp('^[1-9]$');
        for (var i = 0; i < enteredString.length; ++i) {//(i in arrOfPostedValues){
            if (enteredString[i].match(myRegExpForCreationOfArray)) {
                arrWithEnterdValues.push(enteredString[i])
            }
        }

        var valuesThatAlredyPosted = arrOfPostedValues;

        var isIntersect = false;

        for (var i in valuesThatAlredyPosted) {
            for (var x = 0; x < arrWithEnterdValues.length; ++x) {
                if (valuesThatAlredyPosted[i].indexOf(arrWithEnterdValues[x].toString()) != -1) {
                    isIntersect = true;
                }
            }
        }

        if (isIntersect == true) {
            $('#display_error_intersect_numbers').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_intersect_numbers').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
        }
        return true;
    };

    var validateInputData = function (dataForValidation) {
        var enteredString = dataForValidation;
        enteredString = enteredString.replace(/,*$/, '');

        var myValidationRegExp = new RegExp('^(\s*[1-9]\s*,){0,8}\s*[1-9]+\s*$');
        if (!(enteredString.match(myValidationRegExp))) {
            // вывод ошибки
            $('#display_error_wrong_data').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_wrong_data').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
        }
        return true;
    };
    validators.push(validateIntersection);
    validators.push(validateInputData);

    var validateFigure = function (dataForValidation) {

        var arrValues = strValueToIntInArrAndSortIt(dataForValidation);

        var allCorrectFigureValues = [
            [0], [1], [2], [3], [4], [5], [6], [7], [8], [9],
            [1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [8, 9], [1, 4], [4, 7], [2, 5], [5, 8], [3, 6], [6, 9],
            [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 2, 4, 5], [2, 3, 5, 6], [4, 5, 7, 8], [5, 6, 8, 9],
            [1, 2, 3, 4, 5, 6], [4, 5, 6, 7, 8, 9], [1, 2, 4, 5, 7, 8], [2, 3, 5, 6, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        ];

        var isCorrectFigure = isArraysOfMultidimensionalArr1IdentityToArr2(allCorrectFigureValues, arrValues);
        if ((isCorrectFigure == false)) {
            $('#display_validation_error_correct_numbers_of_cells').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_validation_error_correct_numbers_of_cells').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
        }
        return true;
    };

    validators.push(validateIntersection);
    validators.push(validateInputData);
    validators.push(validateFigure);


    var validate = function (dataForValidation) {
        console.log(validators);
        for (var i = 0; i < validators.length; ++i) {
            console.log(validators[i]);
            if (!(validators[i](dataForValidation))) {
                return false
            }
        }
        return true;
    };

    var arrOfPostedValues = [];
    var counter = 0;


    $('form').submit(function (e) {
        e.preventDefault();
        if (validate(element.val())) {
            var data = {
                text: $('#text_displayed_in_cell').val(),
                cells: $('#cells_selected_numbers').val(),
                align: $('#horizontal_align').val(),
                valign: $('#vertical_align').val(),
                color: $('#text_color').val(),
                bgcolor: $('#cell_background_color').val()
            };


            ++counter;
            cellsInfo[counter] = data;

            arrOfPostedValues += $('#cells_selected_numbers').val();
            //arrOfPostedValues = $('#cells_selected_numbers').val();


            $.ajax({
                type: "POST",
                url: "script.php",
                data: cellsInfo
            }).success(function (data) {
                $('#results').html(data);
            }).fail(function (e) {
                console.log(e);
            });
        }
        return false;
    });
});





