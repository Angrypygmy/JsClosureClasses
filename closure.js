
var Clos = function(obj){
    if(obj == null || typeof(obj) != "object"){return;}

    return function(act,v,v2){
        if(act == "get"){
            if(v != undefined){
                if(obj[v]){return obj[v]}else{return null;} // If has key, return value. Zero values return null.
            }
        } else if(act == "set"){
            if(v != undefined && v2 != undefined){
                if(!obj[v]){return null;} // Must already exist on obj.
                obj[v] = v2;
            }
        } else if(act == "extend"){
            if(v != undefined){ // v is new obj to extend to.
                for(i in v){obj[i] = v[i];}

                return Clos(obj); // Recursively, push it back thru as a new closure.
            } else{
                return null;
            }
        } else if(act == "new"){ // difference between new and extend is that with new, it doesnt take in new values to return a new closure. It just makes a copy and returns it as a closure.
            var self = {};

            for(i in obj){self[i] = obj[i];}

            return Clos(self); // Recursively, push it back thru as a new closure.
        }
    }
}

var b = Clos({
    x:10,
    y:20,
    w:30,
    h:40,
    add:function(a,b){
        return a+b;
    },
});

var c = b("extend",{
    xV:1,
    yV:1,
    acc:1,
    subtract:function(a,b){
        return a-b;
    }
});

var d = c("new");
d("set","xV",123);

console.log(c("get","xV"));
console.log(d("get","xV"));
