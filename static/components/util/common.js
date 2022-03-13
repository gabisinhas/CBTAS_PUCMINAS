export var util_tool = {
        /*
            This function wraps a text based on a width and replacer char
        */
        wrap_text: function (text, width=30, spaceReplacer="<br/>"){
                var re = new RegExp("([\\w\\s]{" + (width - 2) + ",}?\\w)\\s?\\b", "g");
                console.log(text);
                return text.replace(re,"$1"+spaceReplacer);
        },

        /*
            This function converts list json data to a csv file
        */
        json_to_csv: function(JSONData, ShowLabel, reportName) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = 'sep=,' + '\r\n';

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            var file = new File([CSV], reportName + ".csv", {type: "text/plain;charset=windows-1252"});
            saveAs(file);
        },

        /*
            This function removes an array item
        */
        removeArrayItem: function(array, item){
            for(var i in array){
                if(array[i]==item){
                    array.splice(i,1);
                    break;
                }
            }
        },

        /*
            This function removes a dictionary in an array
        */
        removeDictionaryInArray: function(array, key, value){
            for(var i in array){
                if(array[i][key]==value){
                    array.splice(i,1);
                    break;
                }
            }
        },

}