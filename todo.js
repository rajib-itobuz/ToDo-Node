const fs = require("node:fs");
let todoArr = [];
var status = 1;

const checkIfExists = () => {
    fs.exists('db.json', (e) => {
        if (!e) {
            var dbFile = fs.createWriteStream("db.json");
            dbFile.end();
        }
    })

}


const writetoFile = () => {
    if (status === 1)
        fs.writeFile(
            "db.json",
            JSON.stringify({
                name: "Todo List App",
                arr: todoArr,
            }),
            (err) => {
                if (err) {
                    // console.log("Error", err);
                }
            }
        );
};

const readfromFile = () => {
    fs.readFile("db.json", (err, data) => {
        if (data) {
            if (data.toString() !== "") {
                var data = JSON.parse(data);
                todoArr = data.arr;
            }
        }
    });
};

const caseSituation = (choice, title, newtitle) => {
    switch (choice) {
        case 1:
            if (typeof title === "undefined" || title.trim() == "") {
                console.log("*** Invalid Input ***");
                status = 0;
            } else {
                let obj = {};

                obj.title = title;
                obj.date = new Date().toDateString();
                todoArr.push(obj);

                console.log("\n");
                console.log("--- New To-Do Added Successfully ---");
            }

            break;

        case 2:
            if (typeof title === "undefined" || title.trim() == "") {
                console.log("*** Invalid Input ***");
                status = 0;
            } else {
                const index = todoArr.findIndex((item) => item.title === title);

                console.log("\n");
                if (index >= 0) {
                    console.log("--- To-Do Deleted Successfully ---");
                    todoArr.splice(index, 1);
                } else {
                    console.log("*** ToDo Does not exist ***");
                    status = 0;
                };
            }

            break;

        case 3:
            if (
                typeof title === "undefined" ||
                typeof newtitle === "undefined" ||
                title.trim() == "" ||
                newtitle.trim() == ""
            ) {
                status = 0;
                console.log("*** Invalid Input ***");
            } else {
                console.log("\n");
                const itemIndex = todoArr.findIndex((item) => item.title === title);

                if (itemIndex >= 0) {
                    console.log("--- To-Do Modified Successfully ---");
                    todoArr[itemIndex].title = newtitle;
                } else {
                    console.log("*** ToDo Does not exist ***");
                    status = 0;
                }
            }
            break;
        case 4:
            console.log("--------------------------");
            console.log("Current Todo List\n\n", todoArr);
            console.log("--------------------------");
            break;
        default:
            console.log("--------------------------");
            console.log("*** Check Arguments ***");
            console.log("use node <filename> -h for help");
            console.log("--------------------------");
            break;
    }
};

const main = () => {
    var input = process.argv.splice(2);
    if (input[0] === "-h") {
        status = 0;
        console.log("--------------------------");
        console.log("Hello Welcome to To-do!!!");
        console.log("--------------------------");
        console.log("1. Add To-Do \n  Syntax: node <filename> 1 <title>");
        console.log("2. Delete To-Do \n  Syntax: node <filename> 2 <title>");
        console.log(
            "3. Modify To-Do \n  Syntax: node <filename> 3 <existing_title> <new_title>"
        );
        console.log("4. Show To-Do list \n  Syntax: node <filename> 4");
        console.log("Note : For space strings use quotation ");
    } else {
        var caseChoice = Number(input[0]);
        caseSituation(caseChoice, input[1], input[2]);
    }
};

checkIfExists();
readfromFile();
setTimeout(main, 100);
setTimeout(writetoFile, 200);
