export class Calendar {
    private selected_date;

    private months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    private days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    private selected_year = 0;
    private selected_month = 0;
    private selected_day = 0;

    private display_month = (new Date()).getMonth();
    private display_year = (new Date()).getFullYear();

    private current_month = (new Date()).getMonth();
    private current_year = (new Date()).getFullYear();
    private current_day = (new Date()).getDate();

    private control_prev;
    private control_next;
    private control_month;
    private control_days;

    private on_change;

    constructor(selected_date?: String) {
        if (!selected_date || selected_date.length <= 2) {
            this.selected_date = "";
        } else {
            var m = selected_date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            this.selected_year = parseInt(m[3]);
            this.selected_month = parseInt(m[2]) - 1;
            this.selected_day = parseInt(m[1]);
            this.display_year = this.selected_year;
            this.display_month = this.selected_month;
           this.selected_date = this.getSelectedAsString();
        }
        this.on_change = function () {
        };
    }

    getSelectedAsString() {
        return `${this.selected_day}/${this.selected_month + 1}/${this.selected_year}`;
    }

    getElement() {

        let self = this;

        let container = document.createElement('div');

        let controls = document.createElement('div');
        controls.className = "flex space-between";
        this.control_prev = document.createElement('button');
        this.control_prev.innerHTML = `<i class="fas fa-angle-left"></i> ${this.getMonthNameFromIndex(this.display_month - 1)}`;

        this.control_month = document.createElement('span');
        this.control_month.innerHTML = `<i class="far fa-calendar-alt"></i> ${this.getMonthNameFromIndex(this.display_month)} ${this.display_year}`;

        this.control_next = document.createElement('button');
        this.control_next.innerHTML = `${this.getMonthNameFromIndex(this.display_month + 1)} <i class="fas fa-angle-right"></i>`;

        this.control_days = document.createElement("div");
        this.control_days.className = "days calendar";

        let beginning_idx_of_this_month = this.getDayOfWeekIndexForDay(1, this.display_month, this.display_year);
        let calc_month = this.getCalculatedMonthYear(this.display_month - 1, this.display_year);
        let days_in_last_month = this.getDaysInMonth(calc_month.month, calc_month.year);
        let days_in_this_month = this.getDaysInMonth(this.display_month, this.display_year);

        let rolling_index = 0;

        for (let i = 0; i < this.days_of_week.length; i++) { // headers for weekdays
            let d = document.createElement('span');
            d.className = "legend";
            d.innerText = (this.days_of_week[i]);
            this.control_days.appendChild(d);
            rolling_index++;
        }

        for (let i = 0; i < beginning_idx_of_this_month; i++) { // last days of last month
            let day = ((days_in_last_month - beginning_idx_of_this_month) + i + 1);
            let d = document.createElement('span');
            let calced = this.getCalculatedMonthYear(this.display_month - 1, this.display_year);
            d.setAttribute("data-month", calced.month.toString());
            d.setAttribute("data-year", calced.year.toString());
            d.setAttribute("data-day", day.toString());
            d.className = 'last-month';
            if (rolling_index % 7 === 0 || rolling_index % 7 === 6) {
                d.className = d.className + " disabled";
            }
            if (rolling_index % 7 === 1) {
                d.className = d.className + " available";
            }
            if (day === this.selected_day && calced.year === this.selected_year && calced.month === this.selected_month) {
                d.className = d.className + " selected";
            }

            d.innerText = day.toString();
            this.control_days.appendChild(d);
            rolling_index++;
        }

        for (let i = 0; i < days_in_this_month; i++) { // full display month
            let d = document.createElement('span');
            let day: String | number = (i + 1);
            let calced = this.getCalculatedMonthYear(this.display_month, this.display_year);
            d.setAttribute("data-month", calced.month.toString());
            d.setAttribute("data-year", calced.year.toString());
            d.setAttribute("data-day", day.toString());

            if (this.current_month === this.display_month && this.current_year === this.display_year && day === this.current_day) {
                d.className = 'today';
            }
            if (rolling_index % 7 === 0 || rolling_index % 7 === 6) {
                d.className = d.className + " disabled";
            }
            if (rolling_index % 7 === 1) {
                d.className = d.className + " available";
            }
            if (day === this.selected_day && calced.year === this.selected_year && calced.month === this.selected_month) {
                d.className = d.className + " selected";
            }

            d.innerHTML = (day).toString();
            this.control_days.appendChild(d);
            rolling_index++;
        }

        for (let i = 0; i < 7 - ((beginning_idx_of_this_month + days_in_this_month) % 7); i++) { // first days of next month
            let d = document.createElement('span');
            let day = (i + 1);
            let calced = this.getCalculatedMonthYear(this.display_month + 1, this.display_year);
            d.setAttribute("data-month", calced.month.toString());
            d.setAttribute("data-year", calced.year.toString());
            d.setAttribute("data-day", day.toString());

            d.className = 'next-month';
            if (rolling_index % 7 === 0 || rolling_index % 7 === 6) {
                d.className = d.className + " disabled";
            }
            if (rolling_index % 7 === 1) {
                d.className = d.className + " available";
            }
            if (day === this.selected_day && calced.year === this.selected_year && calced.month === this.selected_month) {
                d.className = d.className + " selected";
            }

            d.innerText = day.toString();
            this.control_days.appendChild(d);
            rolling_index++;
        }

        controls.appendChild(this.control_prev);
        controls.appendChild(this.control_month);
        controls.appendChild(this.control_next);

        container.appendChild(controls);
        let key = document.createElement("div");
        key.className = "days";
        key.innerHTML = "<span class='available'>X</span><label>&nbsp;= Available</label>&nbsp;&nbsp;&nbsp;<span class='selected'>X</span><label>&nbsp;= Selected</label>";
        container.appendChild(key);

        //container.appendChild(headers)
        container.appendChild(this.control_days);

        // STYLINGS

        if ((this.display_year * 12) + this.display_month <= (this.current_year * 12) + this.current_month) {
            this.control_prev.disabled = true;
        }
        if ((this.display_year * 12) + (this.display_month) >= (this.current_year * 12) + (this.current_month + 4)) {
            this.control_next.disabled = true;
        }

        // EVENTS

        this.control_days.onclick = function (e) {
            let elem = <HTMLSpanElement>e.srcElement;

            if (elem.getAttribute("data-month") && elem.getAttribute("data-year") && elem.getAttribute("data-day")) {

                if (elem.className.indexOf("selected") !== -1) {
                    self.selected_date = "";
                    self.selected_year = 0;
                    self.selected_month = 0;
                    self.selected_day = 0;
                    self.on_change(self.selected_date);
                    return;
                }

                self.selected_year = parseInt(elem.getAttribute("data-year"));
                self.selected_month = parseInt(elem.getAttribute("data-month"));
                self.selected_day = parseInt(elem.getAttribute("data-day"));
                self.selected_date = self.getSelectedAsString();
                self.display_month = parseInt(elem.getAttribute("data-month"));
                self.display_year = parseInt(elem.getAttribute("data-year"));
                self.on_change(self.selected_date);
            }
        };

        this.control_prev.onclick = function () {
            if (self.display_month === 0) {
                self.display_year -= 1;
            }
            self.display_month = self.getMonthIndexFromIdx(self.display_month - 1);
            self.on_change(self.selected_date);
        };
        this.control_next.onclick = function () {
            if (self.display_month === (self.months.length - 1)) {
                self.display_year += 1;
            }
            self.display_month = self.getMonthIndexFromIdx(self.display_month + 1);
            self.on_change(self.selected_date);
        };

        return container;

    }

    getCalculatedMonthYear(mon, year) {
        if (mon < 0) {
            year -= 1;
        } else if (mon >= this.months.length) {
            year += 1;
        }
        mon = (mon + 12) % 12;
        return {month: mon, year: year};
    }

    getMonthIndexFromIdx(idx) {
        return (idx + this.months.length) % this.months.length;
    }

    getDayOfWeekIndexForDay(day, month, year) {
        return new Date(year, month, day, 1).getDay();
    }

    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    };

    getMonthNameFromIndex(idx) {
        return this.months[this.getMonthIndexFromIdx(idx)];
    }

    onChange(cb) {
        this.on_change = cb;
    }

}