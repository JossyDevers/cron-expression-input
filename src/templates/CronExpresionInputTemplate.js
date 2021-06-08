export function CronExpresionInputTemplateGenerator(obj, objLang) {
  return `
          <div class="cronInput" style="display: flex !important; width: ${obj.width} !important; height: ${obj.height} !important;">
          <input class="cronInsideInput" type="text" class="form-control" placeholder="${objLang.inputPlaceholder}">
          <button type="button" class="cronButtonUI btn btn-custom" style="font-size: 114% !important; border-color: ${obj.colorMain} !important; background-color: ${obj.colorSecond} !important;">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="white">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
        </div>
<small class="cronexpressionError hiden" style="display: none; color: red !important; margin-top: 5px !important; margin-bottom: 5px !important;">${objLang.invalidCron}</small>
<div class="modal" tabindex="-1">
    <div class="modal-dialog" style="width: 893px !important;">
        <div class="modal-content" style="height: 490px !important">
            <div class="modal-header" style="height: 0px !important; padding-bottom: 30px !important;">
                <span class="close2 cronClose">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="${obj.colorMain}" style="font-size: 21px !important;">
                        <path fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path fill-rule="evenodd"
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </span>
                <span class="close2 cronSave" style="margin-right: 10px;">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="${obj.colorMain}" style=" font-size: 21px !important;">
                        <path fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path fill-rule="evenodd"
                            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                    </svg>
                </span>
            </div>
            <div class="modal-body" style="padding-top: 0px !important;">
                <ul class="nav nav-tabs" style="margin-top: 0px;">
                    <li class="nav-item active in"><a class="nav-link">${objLang.minute}</a></li>
                    <li class="nav-item"><a class="nav-link">${objLang.hours}</a></li>
                    <li class="nav-item"><a class="nav-link">${objLang.dayOfMonth}</a></li>
                    <li class="nav-item"><a class="nav-link">${objLang.month}</a></li>
                    <li class="nav-item"><a class="nav-link">${objLang.daysOfWeek}</a></li>
                </ul>
                <input class="inputCronMsg form-control" style="width: 100%; margin-top: 10px;" disabled />
                <div class="tab-content" style="margin-top: 8px !important;">
                    <div class="tab-pane active in">
                        <cron-fields pos="0" input="minute" hasZero="true" every="59" colorMain="${obj.colorMain}" colorSecond="${obj.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="1" input="hour" hasZero="true" every="23" colorMain="${obj.colorMain}" colorSecond="${obj.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="2" input="dayOfMonth" every="31" colorMain="${obj.colorMain}" colorSecond="${obj.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="3" input="month" every="12" colorMain="${obj.colorMain}" colorSecond="${obj.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="4" input="dayOfWeek" hasZero="true" every="6" colorMain="${obj.colorMain}" colorSecond="${obj.colorSecond}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
}
