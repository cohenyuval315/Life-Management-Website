import type { Options } from '@toast-ui/calendar';

const template: Options['template'] = {

    milestone(event) {
      return `<span style="color: red;">${event.title}</span>`;
    },

    milestoneTitle() {
      return `<span style="color: blue;"></span>`;
    },

    task(event) {
      return `<span style="color: blue;">${event.title}</span>`;
    },

    allday(event) {
      return `<span style="color: blue;">${event.title}</span>`;
    },

    alldayTitle() {
      return `<span style="color: blue;"></span>`;
    },

    time(event) {
      return `<span style="color: blue;"></span>`;
    },

    goingDuration(event) {
      return `<span style="color: blue;"></span>`;
    },

    comingDuration(event) {
      return `<span style="color: blue;"></span>`;
    },

    monthMoreTitleDate(TemplateMoreTitleDate) {
      return `<span style="color: blue;"></span>`;
    },

    monthMoreClose() {
      return `<span style="color: blue;"></span>`;
    },

    monthGridHeader(TemplateMonthGrid) {
      return `<span style="color: blue;"></span>`;
    },

    monthGridHeaderExceed(number) {
      return `<span style="color: blue;"></span>`;
    },

    monthGridFooter(TemplateMonthGrid) {
      return `<span style="color: blue;"></span>`;
    },

    monthGridFooterExceed(number) {
      return `<span style="color: blue;"></span>`;
    },

    monthDayName(TemplateMonthDayName) {
      return `<span style="color: blue;"></span>`;
    },

    weekDayName(TemplateWeekDayName) {
      return `<span style="color: blue;"></span>`;
    },

    weekGridFooterExceed(number) {
      return `<span style="color: blue;"></span>`;
    },

    collapseBtnTitle() {
      return `<span style="color: blue;"></span>`;
    },

    timezoneDisplayLabel(TemplateTimezone) {
      return `<span style="color: blue;"></span>`;
    },

    timegridDisplayPrimaryTime(TemplateNow) {
      return `<span style="color: blue;"></span>`;
    },

    timegridDisplayTime(TemplateNow) {
      return `<span style="color: blue;"></span>`;
    },

    timegridNowIndicatorLabel(TemplateNow) {
      return `<span style="color: blue;"></span>`;
    },

    popupIsAllday() {
      return `<span style="color: blue;"></span>`;
    },

    popupStateFree() {
      return `<span style="color: blue;"></span>`;
    },

    popupStateBusy() {
      return `BUSY`;
    },

    titlePlaceholder() {
      return `<span style="color: blue;"></span>`;
    },

    locationPlaceholder() {
      return `<span style="color: blue;"></span>`;
    },

    startDatePlaceholder() {
      return `<span style="color: blue;"></span>`;
    },

    endDatePlaceholder() {
      return `<span style="color: blue;"></span>`;
    },

    popupSave() {
      return `<span style="color: blue;"></span>`;
    },

    popupUpdate() {
      return `<span style="color: blue;"></span>`;
    },

    popupEdit() {
      return `<span style="color: blue;"></span>`;
    },

    popupDelete() {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailTitle(event) {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailDate(event) {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailLocation(event) {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailAttendees(event) {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailState(event) {
      return `<span style="color: blue;"></span>`;
    },

    popupDetailRecurrenceRule(event) {
      return `<span style="color: blue;">${event.recurrenceRule}</span>`;
    },

    popupDetailBody(event) {
      return `<span style="color: blue;"></span>`;
    },

};

export default template