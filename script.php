<?php

function myFunctionForTestTask($someArray)
{

    $isCellShown = [
        1 => true,
        2 => true,
        3 => true,
        4 => true,
        5 => true,
        6 => true,
        7 => true,
        8 => true,
        9 => true
    ];


    $spans = [];
    foreach ($someArray as $arr) {

        // Проверка на повторяющиеся значения
        $countValues = array_count_values($arr['cells']);
        foreach ($countValues as $value) {
            if ($value > 1) {
                user_error('Values can not be repeated');
                die;
            }
        }

        // Отсортировать массив
        sort($arr['cells']);
        // Проверка на корректность вводимых значений
        $enteredValuesIsCorrect = false;
        $allCorrectValues = [
            [0], [1], [2], [3], [4], [5], [6], [7], [8], [9],
            [1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [8, 9], [1, 4], [4, 7], [2, 5], [5, 8], [3, 6], [6, 9],
            [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 2, 4, 5], [2, 3, 5, 6], [4, 5, 7, 8], [5, 6, 8, 9],
            [1, 2, 3, 4, 5, 6], [4, 5, 6, 7, 8, 9], [1, 2, 4, 5, 7, 8], [2, 3, 5, 6, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        ];
        foreach ($allCorrectValues as $correctValue) {
            if ($correctValue === $arr['cells']) {
                $enteredValuesIsCorrect = true;
                break;
            }
        }
        if ($enteredValuesIsCorrect == false) {
            user_error('Invalid values was entered');
            die;
        }


        $enteredCells = $arr['cells'];
        $sizeOfSelectedFigure = count($enteredCells);
        $rowspan = 1;
        $colspan = 1;
        $isCollspanFinished = false;
        $first = $enteredCells[0];

        for ($i = 1; $i < $sizeOfSelectedFigure; ++$i) {
            $isCellShown[$enteredCells[$i]] = false;
            if (($enteredCells[$i] - $first) % 3 == 0) {
                ++$rowspan;
                $isCollspanFinished = true;
            } else {
                if (!$isCollspanFinished) {
                    ++$colspan;
                }
            }
        }


        if ($colspan == 0) {
            $colspan = 1;
        }


        $spans[$first] = [
            "rowspan" => $rowspan,
            "colspan" => $colspan,
            "text" => $arr['text'],
            "align" => $arr['align'],
            "valign" => $arr['valign'],
            "color" => $arr['color'],
            "bgcolor" => $arr['bgcolor'],
        ];
    }


    $cellCounter = 1; ?>

    <table border="1">
        <?php for ($row = 1; $row <= 3; ++$row) { ?>
            <tr>
                <?php for ($col = 1; $col <= 3; ++$col) {
                    if ($isCellShown[$cellCounter]) {
                        $colspanString = "";
                        $rowspanString = "";
                        $textString = $cellCounter;
                        $alignString = "";
                        $valignString = "";
                        $colorString = "";
                        $bgcolorString = "";
                        if (isset($spans[$cellCounter])) {
                            $colspanString = $spans[$cellCounter]["colspan"] ? 'colspan="' . $spans[$cellCounter]["colspan"] . '"' : "";
                            $rowspanString = $spans[$cellCounter]["rowspan"] ? 'rowspan="' . $spans[$cellCounter]["rowspan"] . '"' : "";
                            $textString = $spans[$cellCounter]["text"] ? $spans[$cellCounter]["text"] : $cellCounter;
                            $alignString = $spans[$cellCounter]["align"] ? 'align="' . $spans[$cellCounter]["align"] . '"' : "";
                            $valignString = $spans[$cellCounter]["valign"] ? 'valign="' . $spans[$cellCounter]["valign"] . '"' : "";
                            $colorString = $spans[$cellCounter]["color"] ? 'color="' . $spans[$cellCounter]["color"] . '"' : "";
                            $bgcolorString = $spans[$cellCounter]["bgcolor"] ? 'bgcolor="' . $spans[$cellCounter]["bgcolor"] . '"' : "";

                        }; ?>
                        <td <?php echo $colspanString; ?>
                            <?php echo $rowspanString; ?>
                            <?php echo $alignString; ?>
                            <?php echo $valignString; ?>
                            <?php echo $bgcolorString; ?>
                            >
                            <div class="text">
                                <font <?php echo $colorString; ?> >
                                    <?php echo $textString; ?>
                                </font>
                            </div>
                        </td>
                    <?php }
                    ++$cellCounter;
                } ?>
            </tr>
        <?php } ?>
    </table>
<?php }


$myPost = $_POST;
foreach ($myPost as $blocNumber => $allValuesInBloc) {
    foreach ($allValuesInBloc as $name => $value) {
        if ($name == 'cells') {
            $cellsString = trim(trim($value, ","));
            $cellsArr = explode(",", $cellsString);
            foreach ($cellsArr as $key => $num) {
                $cellsArr[$key] = (int)$num;
            }
            $myPost[$blocNumber]['cells'] = $cellsArr;
        }
    }
}

myFunctionForTestTask($myPost);