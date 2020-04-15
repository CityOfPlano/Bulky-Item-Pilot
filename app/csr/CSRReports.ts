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

        let msg  = {route:"GetRequests"};

        provider.postPayload(msg, function (data) {
            let rows=`<tr><td>Pickup ID</td><td>Pickup Date</td><td>Pickup Address</td><td>Customer Details</td></tr>`;

            data.db.forEach(function(row){
                rows = rows+(new StringTemplate(CSRReportsRowView)).apply(row);
            });

            document.getElementById('reports').innerHTML = `<pre>${JSON.stringify(data.db)}</pre><table style="width:100%;">${rows}</table>`;
        });
    }

    update() {
    }

}