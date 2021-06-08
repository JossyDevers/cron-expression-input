export function CronFieldTemplateGenerator (obj, objLang) {
  return `
        <div>
            <style>
            cron-expression-input input[type="radio"]:checked:after { background-color: ${obj.colorMain} !important; }
            cron-expression-input input[type="radio"] { border: 0.1em solid ${obj.colorSecond} !important; }
            .container input:checked ~ .checkmark { background-color: ${obj.colorSecond} !important; }
            </style>
            <form>
                <div style='display: flex; height: 138px;'>
                    <div class='panel panel-default' style='margin-right: 2.5px; width: 50%; height: 132px;'>
                        <div class='panel-heading'>
                            <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='1'
                                    match='choise' checked> <span style='margin-left: 10px;'>${objLang.stepChoise}</span> </div>
                        </div>
                        <div class='panel-body' style='display: flex !important;'>
                            <div class='propagationClass form-group' style='margin-right: 5px; width: 50%;'> <label
                                    for='everySelect'>${objLang.every}</label> <select match='every' class='form-control'
                                    style='width: 100%;'>
                                    <option>*</option>
                                </select> </div>
                            <div class='form-group' style='margin-left: 5px; width: 50%;'> <label for='stepSelect'>${objLang.step}</label>
                                <select match='step' class='propagationClass form-control' style='width: 100%;'>
                                    <option>*</option>
                                </select> </div>
                        </div>
                    </div>
                    <div class='panel panel-default' style='margin-left: 2.5px; width: 50%; height: 132px;'>
                        <div class='panel-heading'>
                            <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='2'
                                    match='choise'> <span style='margin-left: 10px;'>${objLang.rangeChoise}</span> </div>
                        </div>
                        <div class='panel-body'>
                            <div class='form-group'>
                                <div style='display: flex;'>
                                    <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                            for='exampleRadios1'>${objLang.min}</label> <select match='rangeMin'
                                            class='propagationClass form-control' style='width: 100%;'>
                                        </select> </div>
                                    <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                            for='exampleRadios1'>${objLang.max}</label> <select match='rangeMax'
                                            class='propagationClass form-control' style='width: 100%;'>
                                        </select> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='panel panel-default' style='margin: 0px !important; padding: 0px !important; height: 214px;'>
                    <div class='panel-heading'>
                        <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='3'
                                match='choise'> <span style='margin-left: 10px;'>${objLang.choise}</span> </div>
                    </div>
                    <div class='panel-body' style="padding-top: 6px !important;">
                        <div match='spesific' class='form-group'
                            style='display: flex !important; flex-wrap: wrap !important; margin: 0px !important; padding: 0px !important;'>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        `;
}
