import {StringTemplate} from "../../lib/StringTemplate";
import CSRReportsView from "../view/CSRReportsView.html";
import CSRReportsRowView from "../view/CSRReportsRowView.html";
import {LambdaProvider} from "../../lib/LambdaProvider";

export class CSRReports {

    render(): string {
        return new StringTemplate(CSRReportsView).getContents();
    }

    focus(): void {
        let provider = new LambdaProvider();

        let msg  = {route:"GetRequests", params:{}};

        provider.postPayload(msg, function (data) {
            let rows=`<tr><td>Pickup ID</td>
<td>Pickup Date</td>
<td>Pickup Address</td>
<td>Customer Details</td>
<td>Driver Notes</td>
<td>Extra Charges</td>
</tr>`;

            data.db.forEach(function(row){
                rows = rows+(new StringTemplate(CSRReportsRowView)).apply(row);
            });

            document.getElementById('reports').innerHTML = `<table style="width:100%;">${rows}</table>`;
        });

        document.getElementById('drop_tables').onclick = function(){
            let msg  = {route:"DropTables"};

            provider.postPayload(msg, function (data) {
                document.getElementById('reports').innerHTML = JSON.stringify(data.db);
            });
        }
    }

    update() {
    }

}