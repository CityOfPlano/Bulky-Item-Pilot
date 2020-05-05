import {StringTemplate} from "../../lib/StringTemplate";
import CSRDailyLogView from "../view/CSRDailyLogView.html";
import CSRDailyLogRowView from "../view/CSRDailyLogRowView.html";
import {LambdaProvider} from "../../lib/LambdaProvider";
import {getTodayDate} from "../../lib/controller/Calendar";

export class CSRDailyLog {

    private state;

    constructor() {
        this.state = {today: getTodayDate()};
    }

    render(): string {
        return new StringTemplate(CSRDailyLogView).apply(this.state);
    }

    focus(): void {
        let self = this;
        let provider = new LambdaProvider();

        let msg = {route: "GetRequests", params:{filterDate: this.state.today, pickupStatus: 1}};

        provider.postPayload(msg, function (data) {
            console.log(data);
            self.renderRows(data);
        });

        document.getElementById('refresh').onclick = function () {
            self.state.today = (<HTMLInputElement>document.getElementById('daily_input_date')).value;
            let msg = {route: "GetRequests", params:{filterDate: self.state.today, pickupStatus: 1}};

            document.getElementById('daily').innerHTML = `<h2><i class="fas fa-spin fa-spinner"></i> Loading</h2>`;

            provider.postPayload(msg, function (data) {
                self.renderRows(data);
            });
        }
    }

    renderRows(data) {
        let rows = `<tr><td>Pickup ID</td><td>Pickup Date</td>
<td>Pickup Address</td>
<td>Customer Details</td>
<td>Bulky</td>
<td>Brush</td>
<td>Both</td>
</tr>`;

        data.db.forEach(function (row) {
            console.log(row);
            rows = rows + (new StringTemplate(CSRDailyLogRowView)).apply(
                Object.assign(
                    {
                        isBulky: (row.customerPickupTypeId === 0) ? '<i class="fas fa-fw fa-check"></i>' : '',
                        isBrush: (row.customerPickupTypeId === 1) ? '<i class="fas fa-fw fa-check"></i>' : '',
                        isBoth: (row.customerPickupTypeId === 2) ? '<i class="fas fa-fw fa-check"></i>' : ''
                    }
                    , row)
            );
        });

        let msg = ``;

        if (data.db.length === 0){
            msg = `<h3>No data available for supplied date.</h3>`;
        }

        document.getElementById('daily').innerHTML = `<table style="width:100%;">${rows}</table>${msg}`;
    }

    update() {
    }

}