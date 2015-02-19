Utils = {};

Utils.getFormData = function(query){
    var out = {};
    var s_data = $(query).serializeArray();
    //transform into simple data/value object
    for(var i = 0; i<s_data.length; i++){
        var record = s_data[i];
        out[record.name] = record.value;
    }
    return out;
};