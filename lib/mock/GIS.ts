export class GIS {
    orderResultsByGeo(a: Array<any>){
        return a.sort();
    }
}

function Example() {

    this.name = "";

    return {
        setName:function(name:string){
            this.name = name;
        },
        getName:function():string {
            return this.name;
        }
    }

}

let ex = Example();
ex.setName("This is my name");
console.log(ex.getName());